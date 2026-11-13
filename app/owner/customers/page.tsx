"use client"

import React, { useState } from "react"
import { useDineFlow, CustomerProfile } from "@/context/DineFlowContext"
import {
  Users,
  Search,
  Star,
  Phone,
  Mail,
  Calendar,
  ShoppingBag,
  ArrowUpRight,
  Sparkles,
  X,
  Heart,
} from "lucide-react"

export default function CustomersDirectoryPage() {
  const { customers, currentRestaurantOrders } = useDineFlow()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerProfile | null>(null)

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getLoyaltyBadge = (ordersCount: number) => {
    if (ordersCount >= 10) {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
          ★ VIP Diner
        </span>
      )
    }
    if (ordersCount >= 5) {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-orange-100 text-[#c96342]">
          Regular Guest
        </span>
      )
    }
    return (
      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-stone-100 text-stone-600">
        New Diner
      </span>
    )
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl p-6 sm:p-8 border border-[#e7dfd5] shadow-xs">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f4ede4] text-[#c96342] text-xs font-semibold mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>Guest Relationship Management (CRM)</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1c1917]">
            Customer Directory
          </h1>
          <p className="text-xs text-[#78716c] mt-0.5">
            Identify repeat diners, lifetime spend, dietary preferences and dining frequencies
          </p>
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#78716c]" />
          <input
            type="text"
            placeholder="Search by name, phone, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 pr-3 py-2 rounded-full bg-[#faf7f2] border border-[#e7dfd5] text-xs text-[#1c1917] placeholder:text-[#a8a29e] focus:outline-none focus:border-[#c96342] w-full sm:w-64"
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-3xl border border-[#e7dfd5] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#e7dfd5] bg-[#faf7f2]/60 text-[11px] font-semibold uppercase tracking-wider text-[#78716c]">
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Loyalty Tier</th>
                <th className="py-3 px-4">Orders Placed</th>
                <th className="py-3 px-4">Total Spent</th>
                <th className="py-3 px-4">Last Visit</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e7dfd5]">
              {filteredCustomers.map((customer) => (
                <tr
                  key={customer.id}
                  className="hover:bg-[#faf7f2]/40 transition-colors cursor-pointer"
                  onClick={() => setSelectedCustomer(customer)}
                >
                  <td className="py-4 px-4">
                    <div className="font-bold text-[#1c1917]">{customer.name}</div>
                    <div className="text-[11px] text-[#78716c] line-clamp-1">
                      Fav: {customer.favoriteDishes.join(", ")}
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <div className="text-[#1c1917]">{customer.phone}</div>
                    <div className="text-[11px] text-[#78716c]">{customer.email}</div>
                  </td>

                  <td className="py-4 px-4">{getLoyaltyBadge(customer.totalOrders)}</td>

                  <td className="py-4 px-4 font-bold text-[#1c1917]">
                    {customer.totalOrders} orders
                  </td>

                  <td className="py-4 px-4 font-bold text-emerald-700">
                    ₹{customer.totalSpent.toLocaleString()}
                  </td>

                  <td className="py-4 px-4 text-[#78716c]">{customer.lastOrderDate}</td>

                  <td className="py-4 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => setSelectedCustomer(customer)}
                      className="px-3 py-1 rounded-full bg-[#faf7f2] hover:bg-[#f4ede4] text-[#1c1917] text-[11px] font-semibold border border-[#e7dfd5] transition-all"
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setSelectedCustomer(null)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />
          <div className="relative w-full max-w-md bg-white rounded-3xl border border-[#e7dfd5] p-6 space-y-5 z-10 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#e7dfd5] pb-3">
              <div>
                <span className="text-xs font-semibold text-[#c96342] uppercase tracking-wider">
                  Guest Dossier
                </span>
                <h3 className="font-serif text-xl font-bold text-[#1c1917]">
                  {selectedCustomer.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="w-8 h-8 rounded-full bg-[#faf7f2] flex items-center justify-center text-[#78716c]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-[#faf7f2] rounded-2xl border border-[#e7dfd5]">
                <span className="text-[#78716c]">Lifetime Spend</span>
                <div className="font-serif text-lg font-bold text-emerald-700 mt-1">
                  ₹{selectedCustomer.totalSpent.toLocaleString()}
                </div>
              </div>
              <div className="p-3 bg-[#faf7f2] rounded-2xl border border-[#e7dfd5]">
                <span className="text-[#78716c]">Total Orders</span>
                <div className="font-serif text-lg font-bold text-[#1c1917] mt-1">
                  {selectedCustomer.totalOrders} visits
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-[#57534e]">
                <Phone className="w-3.5 h-3.5 text-[#c96342]" />
                <span>{selectedCustomer.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-[#57534e]">
                <Mail className="w-3.5 h-3.5 text-[#c96342]" />
                <span>{selectedCustomer.email}</span>
              </div>
              <div className="flex items-center gap-2 text-[#57534e]">
                <Calendar className="w-3.5 h-3.5 text-[#c96342]" />
                <span>Last ordered on {selectedCustomer.lastOrderDate}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#e7dfd5] space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#78716c]">
                Signature Favorites
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedCustomer.favoriteDishes.map((dish, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-50 border border-orange-200 text-[#c96342] text-xs font-medium"
                  >
                    <Heart className="w-3 h-3 fill-orange-200" />
                    <span>{dish}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-5 py-2 rounded-full bg-[#1c1917] text-white text-xs font-semibold hover:bg-black"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
