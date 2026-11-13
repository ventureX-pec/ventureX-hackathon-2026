"use client"

import React, { useState } from "react"
import Link from "next/link"
import CustomerNavbar from "@/components/customer/CustomerNavbar"
import CustomerCartDrawer from "@/components/customer/CustomerCartDrawer"
import Footer from "@/components/Footer"
import { useDineFlow } from "@/context/DineFlowContext"
import {
  User,
  Phone,
  Mail,
  MapPin,
  Clock,
  Heart,
  ShieldCheck,
  LayoutDashboard,
  Check,
} from "lucide-react"

export default function CustomerProfilePage() {
  const { orders, favouriteRestaurantIds, favouriteDishIds } = useDineFlow()

  const [name, setName] = useState("Eleanor Vance")
  const [phone, setPhone] = useState("+1 (555) 019-2834")
  const [email, setEmail] = useState("eleanor.vance@example.com")
  const [address, setAddress] = useState("Apt 4B, 192 Heritage Promenade, Metro")
  const [isVegetarian, setIsVegetarian] = useState(false)
  const [isGlutenFree, setIsGlutenFree] = useState(true)
  const [savedSuccess, setSavedSuccess] = useState(false)

  const totalSpent = orders.reduce((sum, o) => sum + o.total, 0)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 2500)
  }

  return (
    <div className="min-h-screen bg-[#faf7f2] flex flex-col">
      <CustomerNavbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#c96342]">
            ACCOUNT SETTINGS
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1c1917] tracking-tight mt-1">
            Customer Profile
          </h1>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-3xl border border-[#e7dfd5] p-5 shadow-xs">
            <span className="text-xs text-[#78716c] font-medium block">Total Orders Placed</span>
            <span className="font-serif text-2xl font-bold text-[#1c1917] mt-1 block">
              {orders.length}
            </span>
          </div>
          <div className="bg-white rounded-3xl border border-[#e7dfd5] p-5 shadow-xs">
            <span className="text-xs text-[#78716c] font-medium block">Total Platform Spend</span>
            <span className="font-serif text-2xl font-bold text-[#c96342] mt-1 block">
              ₹{totalSpent}
            </span>
          </div>
          <div className="bg-white rounded-3xl border border-[#e7dfd5] p-5 shadow-xs">
            <span className="text-xs text-[#78716c] font-medium block">Saved Favourites</span>
            <span className="font-serif text-2xl font-bold text-[#1c1917] mt-1 block">
              {favouriteRestaurantIds.length + favouriteDishIds.length}
            </span>
          </div>
        </div>

        {/* Profile Form */}
        <div className="bg-white rounded-3xl border border-[#e7dfd5] p-6 sm:p-8 shadow-xs space-y-6">
          <h2 className="font-serif text-xl font-bold text-[#1c1917]">
            Personal & Delivery Details
          </h2>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#57534e] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#faf7f2] border border-[#e7dfd5] text-xs text-[#1c1917] focus:outline-none focus:border-[#c96342]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#57534e] mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#faf7f2] border border-[#e7dfd5] text-xs text-[#1c1917] focus:outline-none focus:border-[#c96342]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#57534e] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#faf7f2] border border-[#e7dfd5] text-xs text-[#1c1917] focus:outline-none focus:border-[#c96342]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#57534e] mb-1">
                  Default Pickup / Table Note
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#faf7f2] border border-[#e7dfd5] text-xs text-[#1c1917] focus:outline-none focus:border-[#c96342]"
                />
              </div>
            </div>

            {/* Dietary Preferences */}
            <div className="pt-2">
              <span className="block text-xs font-semibold text-[#1c1917] uppercase tracking-wider mb-2">
                Dietary Flags for Kitchen Brigades
              </span>
              <div className="flex items-center gap-4 flex-wrap">
                <label className="flex items-center gap-2 text-xs text-[#57534e] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isVegetarian}
                    onChange={(e) => setIsVegetarian(e.target.checked)}
                    className="accent-[#c96342] w-4 h-4 rounded"
                  />
                  <span>Vegetarian Only</span>
                </label>

                <label className="flex items-center gap-2 text-xs text-[#57534e] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isGlutenFree}
                    onChange={(e) => setIsGlutenFree(e.target.checked)}
                    className="accent-[#c96342] w-4 h-4 rounded"
                  />
                  <span>Gluten-Sensitive / Celiac Alert</span>
                </label>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-[#c96342] hover:bg-[#a84d31] text-white text-xs font-semibold transition-all shadow-xs"
              >
                {savedSuccess ? "Saved Successfully!" : "Save Profile Changes"}
              </button>

              <Link
                href="/owner"
                className="inline-flex items-center gap-1.5 text-xs text-[#78716c] hover:text-[#c96342]"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Switch to Owner Portal</span>
              </Link>
            </div>
          </form>
        </div>
      </main>

      <Footer />
      <CustomerCartDrawer />
    </div>
  )
}
