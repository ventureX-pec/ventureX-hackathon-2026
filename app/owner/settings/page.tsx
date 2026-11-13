"use client"

import React, { useState } from "react"
import { useDineFlow } from "@/context/DineFlowContext"
import {
  Settings,
  Bell,
  Clock,
  Shield,
  Users,
  Check,
  Save,
  Volume2,
  ChefHat,
  Sliders,
  Sparkles,
} from "lucide-react"

export default function OperationsSettingsPage() {
  const { currentRestaurant, toggleRestaurantOpenStatus } = useDineFlow()

  const [autoAccept, setAutoAccept] = useState(false)
  const [soundAlerts, setSoundAlerts] = useState(true)
  const [bufferTime, setBufferTime] = useState(5)
  const [taxRate, setTaxRate] = useState(5)
  const [saved, setSaved] = useState(false)

  const staffMembers = [
    { name: "Marcus Vance", role: "Head Chef & Hearth Master", station: "Wood-Fired Grill & Hearth" },
    { name: "Elena Gomez", role: "Chef de Partie", station: "Cold Larder & Garde Manger" },
    { name: "Kenji Sato", role: "Sous Chef", station: "Sauté & Poaching Station" },
    { name: "Maya Patel", role: "Pastry Chef", station: "Bakery & Hearth Confections" },
  ]

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl p-6 sm:p-8 border border-[#e7dfd5] shadow-xs">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f4ede4] text-[#c96342] text-xs font-semibold mb-2">
            <Settings className="w-3.5 h-3.5" />
            <span>Operations & System Parameters</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1c1917]">
            Restaurant Operations & Staff
          </h1>
          <p className="text-xs text-[#78716c] mt-0.5">
            Configure automated ticketing, alert sounds, station assignments, and tax parameters
          </p>
        </div>

        {saved && (
          <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200">
            <Check className="w-4 h-4" />
            Settings saved successfully!
          </span>
        )}
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-xs">
        {/* Card 1: Kitchen & Order Flow Settings */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e7dfd5] shadow-xs space-y-6">
          <div className="flex items-center gap-2 border-b border-[#e7dfd5] pb-4">
            <ChefHat className="w-5 h-5 text-[#c96342]" />
            <h3 className="font-serif text-lg font-bold text-[#1c1917]">
              Kitchen & Ticket Automation
            </h3>
          </div>

          {/* Service Status Toggle */}
          <div className="flex items-center justify-between p-4 bg-[#faf7f2] rounded-2xl border border-[#e7dfd5]">
            <div>
              <div className="font-bold text-[#1c1917]">Service Active Status</div>
              <div className="text-[11px] text-[#78716c]">
                Controls whether the customer storefront accepts new dine-in & pickup orders
              </div>
            </div>
            <button
              type="button"
              onClick={() => toggleRestaurantOpenStatus()}
              className={`px-4 py-1.5 rounded-full font-bold text-xs transition-all ${
                currentRestaurant.status === "open"
                  ? "bg-emerald-600 text-white"
                  : "bg-rose-600 text-white"
              }`}
            >
              {currentRestaurant.status === "open" ? "Kitchen Open" : "Closed"}
            </button>
          </div>

          {/* Auto Accept */}
          <div className="flex items-center justify-between">
            <div>
              <div className="font-bold text-[#1c1917]">Auto-Accept Customer Tickets</div>
              <div className="text-[11px] text-[#78716c]">
                Send incoming orders directly to KDS without manual chef confirmation
              </div>
            </div>
            <input
              type="checkbox"
              checked={autoAccept}
              onChange={(e) => setAutoAccept(e.target.checked)}
              className="w-4 h-4 rounded text-[#c96342] focus:ring-[#c96342] cursor-pointer"
            />
          </div>

          {/* Sound alerts */}
          <div className="flex items-center justify-between">
            <div>
              <div className="font-bold text-[#1c1917]">Audible Kitchen Chime</div>
              <div className="text-[11px] text-[#78716c]">
                Ring alert speaker on new order arrival
              </div>
            </div>
            <input
              type="checkbox"
              checked={soundAlerts}
              onChange={(e) => setSoundAlerts(e.target.checked)}
              className="w-4 h-4 rounded text-[#c96342] focus:ring-[#c96342] cursor-pointer"
            />
          </div>

          {/* Buffer time */}
          <div className="space-y-1.5">
            <div className="flex justify-between font-bold text-[#1c1917]">
              <span>Rush Prep Time Buffer:</span>
              <span>+{bufferTime} mins</span>
            </div>
            <p className="text-[11px] text-[#78716c]">
              Extra buffer added to customer estimated pickup times during peak service hours
            </p>
            <input
              type="range"
              min={0}
              max={20}
              step={5}
              value={bufferTime}
              onChange={(e) => setBufferTime(Number(e.target.value))}
              className="w-full accent-[#c96342] cursor-pointer"
            />
          </div>

          {/* Tax rate */}
          <div className="space-y-1.5">
            <div className="flex justify-between font-bold text-[#1c1917]">
              <span>Local GST / Sales Tax Rate:</span>
              <span>{taxRate}%</span>
            </div>
            <input
              type="number"
              min={0}
              max={28}
              value={taxRate}
              onChange={(e) => setTaxRate(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl bg-[#faf7f2] border border-[#e7dfd5] text-[#1c1917] focus:outline-none focus:border-[#c96342]"
            />
          </div>
        </div>

        {/* Card 2: Staff & Kitchen Station Assignments */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e7dfd5] shadow-xs space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-[#e7dfd5] pb-4">
              <Users className="w-5 h-5 text-[#c96342]" />
              <h3 className="font-serif text-lg font-bold text-[#1c1917]">
                Kitchen Stations & Active Roster
              </h3>
            </div>

            <p className="text-xs text-[#78716c]">
              Station chiefs responsible for ticket completion on the Smart Kitchen KDS
            </p>

            <div className="space-y-3">
              {staffMembers.map((staff, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-[#faf7f2] rounded-2xl border border-[#e7dfd5] flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-[#1c1917]">{staff.name}</div>
                    <div className="text-[11px] text-[#c96342] font-medium">
                      {staff.role}
                    </div>
                  </div>
                  <span className="text-[10px] px-2.5 py-1 rounded-full bg-white border border-[#e7dfd5] text-[#57534e]">
                    {staff.station}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-[#e7dfd5] flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1c1917] hover:bg-black text-white font-semibold transition-all shadow-xs"
            >
              <Save className="w-3.5 h-3.5 text-[#c96342]" />
              <span>Save System Settings</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
