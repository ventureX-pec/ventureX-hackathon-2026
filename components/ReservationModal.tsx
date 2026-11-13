"use client"

import React, { useState, useEffect } from "react"
import { X, Calendar, Clock, Users, CheckCircle2, Sparkles } from "lucide-react"

interface ReservationModalProps {
  isOpen: boolean
  onClose: () => void
}

const TIME_SLOTS = [
  "5:30 PM",
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
  "8:00 PM",
  "8:30 PM",
  "9:00 PM",
]

export default function ReservationModal({ isOpen, onClose }: ReservationModalProps) {
  const [guests, setGuests] = useState(2)
  const [time, setTime] = useState("7:00 PM")
  const [date, setDate] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [notes, setNotes] = useState("")
  const [confirmed, setConfirmed] = useState(false)

  useEffect(() => {
    // Set default date to tomorrow
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const formatted = tomorrow.toISOString().split("T")[0]
    setDate(formatted)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) {
      document.body.style.overflow = "hidden"
      window.addEventListener("keydown", handleKeyDown)
    }
    return () => {
      document.body.style.overflow = "auto"
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !phone.trim()) return
    setConfirmed(true)
  }

  const handleReset = () => {
    setConfirmed(false)
    setName("")
    setPhone("")
    setNotes("")
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      {/* Modal Surface */}
      <div className="relative w-full max-w-lg bg-[#faf7f2] rounded-3xl border border-[#e7dfd5] shadow-2xl p-6 sm:p-8 overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Subtle decorative glow */}
        <div className="absolute -top-20 -right-20 w-52 h-52 rounded-full bg-[#c96342]/10 blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#f4ede4] text-[#57534e] hover:text-[#1c1917] hover:bg-[#e7dfd5] flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {confirmed ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#2e7d32]/10 text-[#2e7d32] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-medium text-[#1c1917]">
              Table Reserved!
            </h3>
            <p className="text-sm text-[#57534e] max-w-xs mx-auto leading-relaxed">
              We look forward to welcoming you, <span className="font-medium text-[#1c1917]">{name}</span>. A confirmation has been sent for <span className="font-medium text-[#1c1917]">{guests} guests</span> on <span className="font-medium text-[#1c1917]">{date}</span> at <span className="font-medium text-[#1c1917]">{time}</span>.
            </p>
            <div className="pt-4">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-full bg-[#c96342] hover:bg-[#a84d31] text-white text-xs font-medium transition-all shadow-xs"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#f4ede4] text-[10px] font-semibold text-[#c96342] uppercase tracking-wider mb-2">
                <Sparkles className="w-3 h-3" />
                <span>The Corner Table Hearth</span>
              </div>
              <h3 className="font-serif text-2xl font-medium text-[#1c1917]">
                Reserve Your Table
              </h3>
              <p className="text-xs text-[#57534e] mt-1">
                Select your preferred seating time and party size.
              </p>
            </div>

            {/* Date & Guests Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-[#57534e] uppercase tracking-wider mb-1.5">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#c96342]" /> Date
                  </span>
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#e7dfd5] text-xs text-[#1c1917] focus:outline-none focus:border-[#c96342]"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#57534e] uppercase tracking-wider mb-1.5">
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3 text-[#c96342]" /> Guests
                  </span>
                </label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 6].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setGuests(num)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        guests === num
                          ? "bg-[#c96342] text-white shadow-xs"
                          : "bg-white border border-[#e7dfd5] text-[#57534e] hover:bg-[#f4ede4]"
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Time Slot Selector */}
            <div>
              <label className="block text-[11px] font-medium text-[#57534e] uppercase tracking-wider mb-1.5">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#c96342]" /> Seating Time
                </span>
              </label>
              <div className="grid grid-cols-4 gap-2">
                {TIME_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setTime(slot)}
                    className={`py-2 rounded-xl text-xs font-medium transition-colors ${
                      time === slot
                        ? "bg-[#1c1917] text-white"
                        : "bg-white border border-[#e7dfd5] text-[#57534e] hover:bg-[#f4ede4]"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-[11px] font-medium text-[#57534e] uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Eleanor Vance"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#e7dfd5] text-xs text-[#1c1917] placeholder-[#a8a29e] focus:outline-none focus:border-[#c96342]"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#57534e] uppercase tracking-wider mb-1">
                  Phone / Email *
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 019-2834"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#e7dfd5] text-xs text-[#1c1917] placeholder-[#a8a29e] focus:outline-none focus:border-[#c96342]"
                  required
                />
              </div>
            </div>

            {/* Dietary or Special Requests */}
            <div>
              <label className="block text-[11px] font-medium text-[#57534e] uppercase tracking-wider mb-1">
                Special Requests (Optional)
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Allergies, anniversary, patio seating..."
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#e7dfd5] text-xs text-[#1c1917] placeholder-[#a8a29e] focus:outline-none focus:border-[#c96342]"
              />
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-full bg-[#c96342] hover:bg-[#a84d31] text-white text-xs sm:text-sm font-medium transition-all shadow-xs hover:shadow active:scale-[0.99] cursor-pointer"
              >
                Confirm Table Reservation
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
