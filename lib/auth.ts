import { supabase, isSupabaseConfigured } from "./supabase"

export type UserRole = "customer" | "admin"

export interface UserProfile {
  id: string
  email: string
  full_name?: string
  role: UserRole
  phone?: string
  avatar_url?: string
  created_at?: string
}

export interface AuthResponse {
  success: boolean
  error?: string
  user?: {
    id: string
    email: string
    role: UserRole
    full_name?: string
    avatar_url?: string
  }
  redirect?: string
  isDemo?: boolean
}

/**
 * Derives a human-friendly display name from an email address or full name
 * Examples:
 *  - "prakhar@gmail.com" -> "Prakhar"
 *  - "prakhar.singh@gmail.com" -> "Prakhar Singh"
 *  - "alex.morgan@serveza.com" -> "Alex Morgan"
 */
export function formatDisplayName(email?: string, fullName?: string): string {
  if (fullName && fullName.trim().length > 0) {
    return fullName.trim()
  }
  if (!email || !email.includes("@")) {
    return "Guest Diner"
  }
  const prefix = email.split("@")[0]
  const words = prefix.split(/[._-]+/).filter(Boolean)
  if (words.length === 0) return "Guest Diner"
  return words
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ")
}

/**
 * Computes 1-2 character initials for display avatars
 */
export function getInitials(name?: string): string {
  if (!name || name.trim().length === 0) return "SZ"
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase()
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

/**
 * Persist user identity to localStorage for zero-latency hydration
 */
export function setStoredUserProfile(user: {
  id?: string
  email: string
  name?: string
  role: UserRole
  avatar?: string
}) {
  if (typeof window === "undefined") return
  try {
    const serialized = JSON.stringify(user)
    localStorage.setItem("serveza_user", serialized)
    if (user.role === "admin") {
      localStorage.setItem("serveza_admin_user", serialized)
    } else {
      localStorage.setItem("serveza_customer_user", serialized)
    }
  } catch (e) {
    // Ignore storage quota errors
  }
}

/**
 * Retrieve persisted user from localStorage
 */
export function getStoredUserProfile(expectedRole?: UserRole): {
  id?: string
  email: string
  name: string
  role: UserRole
  avatar?: string
} | null {
  if (typeof window === "undefined") return null
  try {
    const key = expectedRole === "admin" ? "serveza_admin_user" : "serveza_customer_user"
    const raw = localStorage.getItem(key) || localStorage.getItem("serveza_user")
    if (raw) {
      const parsed = JSON.parse(raw)
      if (parsed.email) {
        return {
          id: parsed.id,
          email: parsed.email,
          name: parsed.name || formatDisplayName(parsed.email, parsed.full_name),
          role: (parsed.role as UserRole) || expectedRole || "customer",
          avatar: parsed.avatar || parsed.avatar_url,
        }
      }
    }
  } catch (e) {}
  return null
}

/**
 * Sign in with email and password
 */
export async function signInUser(
  email: string,
  password: string,
  expectedRole: UserRole
): Promise<AuthResponse> {
  // If Supabase is configured, authenticate against real Supabase instance
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      })

      if (error) {
        return { success: false, error: error.message }
      }

      if (!data.user) {
        return { success: false, error: "No user returned from authentication." }
      }

      // Query user role and profile from public.profiles table
      let userRole: UserRole = expectedRole
      let fullName: string =
        data.user.user_metadata?.full_name ||
        data.user.user_metadata?.name ||
        formatDisplayName(data.user.email || email)
      let avatarUrl: string | undefined =
        data.user.user_metadata?.avatar_url || data.user.user_metadata?.picture

      try {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role, full_name, avatar_url")
          .eq("id", data.user.id)
          .single()

        if (profile?.role) {
          userRole = profile.role as UserRole
        } else if (data.user.user_metadata?.role) {
          userRole = data.user.user_metadata.role as UserRole
        }

        if (profile?.full_name) {
          fullName = profile.full_name
        }
        if (profile?.avatar_url) {
          avatarUrl = profile.avatar_url
        }
      } catch {
        // Fallback to expected role if table query encounters error
        userRole = (data.user.user_metadata?.role as UserRole) || expectedRole
      }

      return {
        success: true,
        user: {
          id: data.user.id,
          email: data.user.email || email,
          role: userRole,
          full_name: fullName,
          avatar_url: avatarUrl,
        },
        redirect: userRole === "admin" ? "/admin" : "/customer",
        isDemo: false,
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to connect to authentication server."
      return { success: false, error: message }
    }
  }

  // Fallback demo authentication when Supabase env vars are not set
  await new Promise((resolve) => setTimeout(resolve, 600))

  const cleanEmail = email.trim().toLowerCase()
  const isMatchAdmin = cleanEmail.includes("admin") || expectedRole === "admin"
  const determinedRole: UserRole = isMatchAdmin ? "admin" : "customer"
  const dynamicName = formatDisplayName(cleanEmail)

  return {
    success: true,
    user: {
      id: "demo-user-" + (isMatchAdmin ? "admin" : "customer"),
      email: cleanEmail,
      role: determinedRole,
      full_name: dynamicName,
    },
    redirect: determinedRole === "admin" ? "/admin" : "/customer",
    isDemo: true,
  }
}

/**
 * Sign up a new user with email, password, full name and role
 */
export async function signUpUser(
  email: string,
  password: string,
  fullName: string,
  role: UserRole
): Promise<AuthResponse> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: fullName.trim(),
            role,
          },
        },
      })

      if (error) {
        return { success: false, error: error.message }
      }

      return {
        success: true,
        user: data.user
          ? {
              id: data.user.id,
              email: data.user.email || email,
              role,
              full_name: fullName.trim() || formatDisplayName(email),
            }
          : undefined,
        redirect: role === "admin" ? "/admin" : "/customer",
        isDemo: false,
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to sign up user."
      return { success: false, error: message }
    }
  }

  // Fallback demo response
  await new Promise((resolve) => setTimeout(resolve, 600))
  const cleanEmail = email.trim()
  return {
    success: true,
    user: {
      id: "demo-new-user",
      email: cleanEmail,
      role,
      full_name: fullName.trim() || formatDisplayName(cleanEmail),
    },
    redirect: role === "admin" ? "/admin" : "/customer",
    isDemo: true,
  }
}

/**
 * Sign out current session
 */
export async function signOutUser(): Promise<void> {
  if (isSupabaseConfigured()) {
    try {
      await supabase.auth.signOut()
    } catch {
      // Ignored
    }
  }
}
