"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  User,
  UtensilsCrossed,
  Sparkles,
} from "lucide-react"

// Curated signature dishes for the left-side food showcase
const SHOWCASE_SLIDES = [
  {
    id: "ribeye",
    dish: "Char-Grilled Prime Ribeye",
    category: "HEARTH-FIRED SPECIALTY",
    title: "Artisanal Kitchen Craft",
    description:
      "Dry-aged prime ribeye seared over hickory embers with black truffle butter, confit garlic, and fresh rosemary sea salt.",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&auto=format&fit=crop&q=80",
    badge: "Chef Marcus Vance",
  },
  {
    id: "mezze",
    dish: "Mediterranean Mezze Bowl",
    category: "FARM-TO-TABLE FRESH",
    title: "Organic Seasonal Harvest",
    description:
      "Crisp organic greens, heirloom tomatoes, sheep's milk feta, Kalamata olives, and cold-pressed extra virgin olive oil.",
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1200&auto=format&fit=crop&q=80",
    badge: "100% Verified Pure Veg",
  },
  {
    id: "salmon",
    dish: "Wild Atlantic Salmon",
    category: "SEAFOOD ATELIER",
    title: "Express Shelf Pickup",
    description:
      "Crispy skin Atlantic salmon over slow-simmered lemon-herb arborio risotto with tender spring asparagus spears.",
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1200&auto=format&fit=crop&q=80",
    badge: "Ready in 12 Mins",
  },
]

type RoleType = "customer" | "admin"

export default function LoginPage() {
  const [role, setRole] = useState<RoleType>("customer")
  const [activeSlide, setActiveSlide] = useState(0)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState<string | null>(null)

  // Auto-cycle showcase dishes every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % SHOWCASE_SLIDES.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  // Auto-fill demo credentials
  const fillDemoCredentials = (targetRole: RoleType) => {
    setRole(targetRole)
    if (targetRole === "customer") {
      setUsername("alex.morgan@serveza.com")
      setPassword("customer123")
    } else {
      setUsername("admin@serveza.com")
      setPassword("admin2026")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setLoginSuccess(
        role === "customer"
          ? "Welcome back, Alex! Redirecting to ordering experience..."
          : "Admin authenticated. Redirecting to Kitchen & Restaurant Manager..."
      )
    }, 1000)
  }

  const currentSlide = SHOWCASE_SLIDES[activeSlide]

  return (
    <div className="h-screen min-h-[580px] bg-[#faf7f2] text-[#1c1917] relative flex items-center justify-center p-3 sm:p-5 lg:p-6 overflow-hidden">
      {/* Back to Home Link */}
      <Link
        href="/"
        className="absolute top-4 left-4 sm:top-6 sm:left-6 z-30 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 hover:bg-white text-xs font-medium text-[#57534e] hover:text-[#1c1917] border border-[#e7dfd5] shadow-xs hover:shadow transition-all group"
      >
        <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
        <span>Back to Home</span>
      </Link>

      {/* Main Dual-Column Modal Card - Scaled for zero-scroll viewport fitting */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-[820px] max-h-[94vh] bg-white rounded-[24px] border border-[#e7dfd5] shadow-2xl shadow-[#1c1917]/8 overflow-hidden grid grid-cols-1 lg:grid-cols-2"
      >
        {/* ========================================================= */}
        {/* LEFT COLUMN: Food Items Showcase (Shifted to Left as instructed) */}
        {/* ========================================================= */}
        <div className="relative min-h-[260px] lg:min-h-0 bg-[#141210] overflow-hidden flex flex-col justify-between p-5 sm:p-7 text-white order-2 lg:order-1">
          {/* Animated Background Image Slide */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute inset-0 z-0"
            >
              <img
                src={currentSlide.image}
                alt={currentSlide.dish}
                className="w-full h-full object-cover"
              />
              {/* Rich warm gradient vignette overlay for editorial contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/45 to-black/25" />
            </motion.div>
          </AnimatePresence>

          {/* Top Header Badge */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-[10px] font-semibold text-[#fdfbf7] tracking-wide uppercase">
              <UtensilsCrossed className="w-3 h-3 text-[#e07a5f]" />
              <span>{currentSlide.category}</span>
            </div>
            <span className="text-[10px] font-medium text-white/80 bg-white/10 backdrop-blur-xs px-2 py-0.5 rounded-full border border-white/10">
              {currentSlide.badge}
            </span>
          </div>

          {/* Bottom Editorial Content & Pager */}
          <div className="relative z-10 space-y-2.5">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="space-y-1.5"
              >
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#e07a5f] block">
                  {currentSlide.dish}
                </span>
                <h2
                  className="text-xl sm:text-2xl font-serif font-normal text-white tracking-tight leading-snug"
                  style={{ fontFamily: 'Georgia, "Times New Roman", Times, serif' }}
                >
                  {currentSlide.title}
                </h2>
                <p className="text-xs text-white/80 leading-relaxed max-w-xs font-light line-clamp-2">
                  {currentSlide.description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Pagination Indicators matching reference layout */}
            <div className="pt-1 flex items-center gap-2">
              {SHOWCASE_SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => setActiveSlide(idx)}
                  aria-label={`View ${slide.dish}`}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeSlide === idx
                      ? "w-7 bg-[#c96342]"
                      : "w-2 bg-white/35 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: Sign In Form Box */}
        {/* ========================================================= */}
        <div className="p-5 sm:p-7 lg:p-8 flex flex-col justify-between order-1 lg:order-2 bg-white">
          <div>
            {/* Brand Header */}
            <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-[#e7dfd5]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#c96342] text-white flex items-center justify-center font-serif font-bold text-sm shadow-xs">
                  SZ
                </div>
                <div>
                  <span className="font-serif text-base font-medium text-[#1c1917] tracking-tight block leading-tight">
                    ServeZa
                  </span>
                  <span className="text-[9px] tracking-widest uppercase font-medium text-[#78716c] block">
                    Digital Ordering Platform
                  </span>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#f4ede4] border border-[#e7dfd5] text-[10px] font-semibold text-[#57534e]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Kitchen Online</span>
              </div>
            </div>

            {/* Role Switcher Tabs (Customer vs Admin) */}
            <div className="mb-3.5">
              <div className="grid grid-cols-2 p-1 bg-[#f4ede4] rounded-xl border border-[#e7dfd5]">
                <button
                  type="button"
                  onClick={() => setRole("customer")}
                  className={`flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    role === "customer"
                      ? "bg-white text-[#1c1917] shadow-xs font-semibold"
                      : "text-[#57534e] hover:text-[#1c1917]"
                  }`}
                >
                  <User className="w-3.5 h-3.5 text-[#c96342]" />
                  <span>Customer</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole("admin")}
                  className={`flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    role === "admin"
                      ? "bg-white text-[#1c1917] shadow-xs font-semibold"
                      : "text-[#57534e] hover:text-[#1c1917]"
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#c96342]" />
                  <span>Restaurant Admin</span>
                </button>
              </div>
            </div>

            {/* Greeting & Headline */}
            <div className="mb-3.5">
              <h1
                className="text-xl sm:text-2xl font-serif font-bold text-[#1c1917] tracking-tight leading-tight"
                style={{ fontFamily: 'Georgia, "Times New Roman", Times, serif' }}
              >
                {role === "customer" ? "Customer Login" : "Staff & Admin Login"}
              </h1>
              <p className="mt-1 text-xs text-[#57534e] leading-snug">
                {role === "customer"
                  ? "Enter your credentials to pre-order and reserve your table."
                  : "Enter your staff credentials to manage orders, live KDS, and menus."}
              </p>
            </div>

            {/* Success Feedback Banner */}
            {loginSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-3 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{loginSuccess}</span>
              </motion.div>
            )}

            {/* Sign In Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Username / Email Field */}
              <div>
                <label className="block text-[11px] font-medium text-[#44403c] mb-1">
                  {role === "customer" ? "Username or Email" : "Staff ID or Admin Email"}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#a8a29e]">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={
                      role === "customer"
                        ? "alex.morgan@serveza.com"
                        : "admin@serveza.com"
                    }
                    className="w-full pl-9 pr-3.5 py-2 bg-[#fbf9f6] border border-[#e7dfd5] rounded-xl text-xs text-[#1c1917] placeholder-[#a8a29e] focus:outline-none focus:border-[#c96342] focus:ring-1 focus:ring-[#c96342] transition-colors"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-[11px] font-medium text-[#44403c] mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#a8a29e]">
                    <Lock className="w-3.5 h-3.5" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-9 pr-10 py-2 bg-[#fbf9f6] border border-[#e7dfd5] rounded-xl text-xs text-[#1c1917] placeholder-[#a8a29e] focus:outline-none focus:border-[#c96342] focus:ring-1 focus:ring-[#c96342] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#78716c] hover:text-[#1c1917] cursor-pointer"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Utilities Row: Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-[11px] pt-0.5">
                <label className="flex items-center gap-1.5 cursor-pointer select-none text-[#57534e]">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-3.5 h-3.5 rounded text-[#c96342] focus:ring-[#c96342] border-[#e7dfd5] accent-[#c96342]"
                  />
                  <span>Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => alert("Password reset link sent to your email!")}
                  className="font-medium text-[#c96342] hover:text-[#a84d31] transition-colors cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Submit Button (Terracotta styled per brand) */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-1.5 py-2.5 px-4 rounded-xl bg-[#c96342] hover:bg-[#a84d31] text-white text-xs sm:text-sm font-semibold transition-all shadow-md shadow-[#c96342]/20 active:scale-[0.99] flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-70"
              >
                {isLoading ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>
                      {role === "customer" ? "Sign In as Customer" : "Sign In as Admin"}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>

            {/* Alternative Divider */}
            <div className="relative my-3.5 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#e7dfd5]" />
              </div>
              <span className="relative px-2.5 bg-white text-[10px] uppercase tracking-wider text-[#a8a29e]">
                or continue with
              </span>
            </div>

            {/* Quick 1-Tap Login Option (Google / 1-Tap Demo) */}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => fillDemoCredentials(role)}
                className="w-full py-2 px-2.5 rounded-xl border border-[#e7dfd5] hover:border-[#c96342]/50 bg-white hover:bg-[#faf7f2] text-xs font-medium text-[#44403c] flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Google</span>
              </button>

              <button
                type="button"
                onClick={() => fillDemoCredentials(role)}
                className="w-full py-2 px-2.5 rounded-xl border border-[#e7dfd5] hover:border-[#c96342]/50 bg-white hover:bg-[#faf7f2] text-xs font-medium text-[#44403c] flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
              >
                <Sparkles className="w-3 h-3 text-[#c96342]" />
                <span>1-Tap Demo</span>
              </button>
            </div>
          </div>

          {/* Bottom Demo Quick-Fill Bar */}
          <div className="pt-3 mt-3 border-t border-[#e7dfd5] flex items-center justify-between text-[11px] text-[#78716c]">
            <span>Fast Hackathon Demo:</span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => fillDemoCredentials("customer")}
                className="px-2 py-0.5 rounded-md bg-[#f4ede4] hover:bg-[#eae2d7] text-[#1c1917] font-medium transition-colors cursor-pointer text-[10px]"
              >
                Customer Fill
              </button>
              <button
                type="button"
                onClick={() => fillDemoCredentials("admin")}
                className="px-2 py-0.5 rounded-md bg-[#f4ede4] hover:bg-[#eae2d7] text-[#1c1917] font-medium transition-colors cursor-pointer text-[10px]"
              >
                Admin Fill
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
