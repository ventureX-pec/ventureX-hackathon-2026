"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useDineFlow } from "@/context/DineFlowContext"
import {
  Store,
  QrCode,
  Download,
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  MapPin,
  Clock,
  Phone,
  Mail,
  Camera,
  Save,
} from "lucide-react"

export default function StorefrontManagementPage() {
  const { currentRestaurant, updateRestaurantProfile } = useDineFlow()

  const [name, setName] = useState(currentRestaurant.name)
  const [tagline, setTagline] = useState(currentRestaurant.tagline)
  const [description, setDescription] = useState(currentRestaurant.description)
  const [cuisine, setCuisine] = useState(currentRestaurant.cuisine)
  const [address, setAddress] = useState(currentRestaurant.address)
  const [phone, setPhone] = useState(currentRestaurant.phone)
  const [email, setEmail] = useState(currentRestaurant.email)
  const [hours, setHours] = useState(currentRestaurant.hours)
  const [coverImage, setCoverImage] = useState(currentRestaurant.coverImage)

  // QR Generator state
  const [selectedTable, setSelectedTable] = useState("4")
  const [copied, setCopied] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const publicUrl = `https://dineflow.app/r/${currentRestaurant.slug}?table=${selectedTable}`

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    updateRestaurantProfile({
      name,
      tagline,
      description,
      cuisine,
      address,
      phone,
      email,
      hours,
      coverImage,
    })
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 2500)
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl p-6 sm:p-8 border border-[#e7dfd5] shadow-xs">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f4ede4] text-[#c96342] text-xs font-semibold mb-2">
            <Store className="w-3.5 h-3.5" />
            <span>Storefront & Table QR Configuration</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1c1917]">
            Digital Storefront & Table QR
          </h1>
          <p className="text-xs text-[#78716c] mt-0.5">
            Manage your public restaurant identity and generate branded QR stands for table-side ordering
          </p>
        </div>

        <Link
          href={`/r/${currentRestaurant.slug}`}
          target="_blank"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#c96342] hover:bg-[#a84d31] text-white text-xs font-semibold transition-all shadow-xs"
        >
          <span>Open Public Storefront</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Restaurant Profile Form */}
        <div className="lg:col-span-2 space-y-6">
          <form
            onSubmit={handleSaveProfile}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e7dfd5] shadow-xs space-y-5 text-xs"
          >
            <div className="flex items-center justify-between border-b border-[#e7dfd5] pb-4">
              <h2 className="font-serif text-lg font-bold text-[#1c1917]">
                Restaurant Identity Details
              </h2>
              {saveSuccess && (
                <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  Saved successfully!
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-[#1c1917] mb-1">
                  Restaurant Legal / Brand Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#faf7f2] border border-[#e7dfd5] text-[#1c1917] focus:outline-none focus:border-[#c96342]"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-[#1c1917] mb-1">
                  Tagline / Concept *
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#faf7f2] border border-[#e7dfd5] text-[#1c1917] focus:outline-none focus:border-[#c96342]"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-[#1c1917] mb-1">
                  Cuisine Classification
                </label>
                <input
                  type="text"
                  value={cuisine}
                  onChange={(e) => setCuisine(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#faf7f2] border border-[#e7dfd5] text-[#1c1917] focus:outline-none focus:border-[#c96342]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#1c1917] mb-1">
                  Public Phone Number
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#faf7f2] border border-[#e7dfd5] text-[#1c1917] focus:outline-none focus:border-[#c96342]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-[#1c1917] mb-1">
                  Contact Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#faf7f2] border border-[#e7dfd5] text-[#1c1917] focus:outline-none focus:border-[#c96342]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#1c1917] mb-1">
                  Operating Hours
                </label>
                <input
                  type="text"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#faf7f2] border border-[#e7dfd5] text-[#1c1917] focus:outline-none focus:border-[#c96342]"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-[#1c1917] mb-1">
                Physical Dining Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#faf7f2] border border-[#e7dfd5] text-[#1c1917] focus:outline-none focus:border-[#c96342]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#1c1917] mb-1">
                Storefront Cover Hero Image URL
              </label>
              <input
                type="url"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#faf7f2] border border-[#e7dfd5] text-[#1c1917] focus:outline-none focus:border-[#c96342]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#1c1917] mb-1">
                Restaurant Description & Story
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#faf7f2] border border-[#e7dfd5] text-[#1c1917] focus:outline-none focus:border-[#c96342]"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1c1917] hover:bg-black text-white font-semibold transition-all shadow-xs"
              >
                <Save className="w-3.5 h-3.5 text-[#c96342]" />
                <span>Save Storefront Settings</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Col: Live Smart QR Generator Card */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e7dfd5] shadow-xs space-y-6">
            <div className="flex items-center gap-2">
              <QrCode className="w-5 h-5 text-[#c96342]" />
              <h3 className="font-serif text-lg font-bold text-[#1c1917]">
                Smart Table QR Generator
              </h3>
            </div>

            <p className="text-xs text-[#78716c]">
              Each table stand has a unique QR code encoded with its table number so tickets arrive with exact seating info.
            </p>

            {/* Table Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-[#1c1917]">
                Target Table Stand
              </label>
              <div className="flex items-center gap-2">
                {["1", "2", "3", "4", "5", "Patio-1"].map((tbl) => (
                  <button
                    key={tbl}
                    type="button"
                    onClick={() => setSelectedTable(tbl)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      selectedTable === tbl
                        ? "bg-[#c96342] text-white shadow-2xs"
                        : "bg-[#faf7f2] border border-[#e7dfd5] text-[#78716c] hover:text-[#1c1917]"
                    }`}
                  >
                    T-{tbl}
                  </button>
                ))}
              </div>
            </div>

            {/* Printable Tent Card Mockup */}
            <div className="p-6 bg-[#faf7f2] rounded-3xl border-2 border-dashed border-[#e7dfd5] text-center space-y-3">
              <div className="font-serif text-sm font-bold text-[#1c1917]">
                {name}
              </div>
              <div className="text-[10px] uppercase font-bold tracking-widest text-[#c96342]">
                Table Stand {selectedTable}
              </div>

              <div className="w-40 h-40 bg-white p-2 rounded-2xl border border-[#e7dfd5] mx-auto shadow-xs">
                <img
                  src={currentRestaurant.qrCodeUrl}
                  alt="QR Code"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>

              <div className="text-[11px] text-[#78716c] font-medium">
                Scan to browse menu & order directly from table
              </div>
            </div>

            {/* Copy & Print buttons */}
            <div className="space-y-2">
              <button
                onClick={handleCopyLink}
                className="w-full py-2.5 rounded-full bg-[#faf7f2] hover:bg-[#f4ede4] text-[#1c1917] text-xs font-semibold border border-[#e7dfd5] flex items-center justify-center gap-2 transition-all"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Table Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#78716c]" />
                    <span>Copy Table Ordering Link</span>
                  </>
                )}
              </button>

              <button
                onClick={() => window.print()}
                className="w-full py-2.5 rounded-full bg-[#c96342] hover:bg-[#a84d31] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Print Table Stand Signs</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
