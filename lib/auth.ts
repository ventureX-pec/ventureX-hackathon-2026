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
  }
  redirect?: string
  isDemo?: boolean
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

      // Query user role from public.profiles table
      let userRole: UserRole = expectedRole
      try {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", data.user.id)
          .single()

        if (profile?.role) {
          userRole = profile.role as UserRole
        } else if (data.user.user_metadata?.role) {
          userRole = data.user.user_metadata.role as UserRole
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

  return {
    success: true,
    user: {
      id: "demo-user-" + (isMatchAdmin ? "admin" : "customer"),
      email: cleanEmail,
      role: determinedRole,
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
  return {
    success: true,
    user: {
      id: "demo-new-user",
      email: email.trim(),
      role,
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
