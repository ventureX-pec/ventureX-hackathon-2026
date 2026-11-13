"use client";

import React, { useState } from "react";
import {
  Store,
  Clock,
  Save,
  Check,
  MapPin,
  Phone,
  QrCode,
  Utensils,
  ShoppingBag,
} from "lucide-react";

export const SettingsView: React.FC = () => {
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({
    name: "The Corner Café & Kitchen",
    tagline: "Your Daily Fuel & Comfort Food • Zero Queues, Pure Flavor",
    address: "Main Food Court, Block A • Central Campus Commons",
    phone: "+91 98765 43210",
    upiId: "dineflow@campusbank",
    openingHours: "8:30 AM - 10:30 PM",
    dineInEnabled: true,
    takeawayEnabled: true,
    avgPrepTime: 10,
    shelfCount: 18,
    tablesCount: 14,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-md p-5 rounded-3xl border border-[#EDE4D8] shadow-xs">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#252522]">
          Kitchen Outlet Settings
        </h1>
        <p className="text-xs sm:text-sm text-[#736E65]">
          Manage store details, operating hours, token slots and student ordering modes
        </p>
      </div>

      {/* Settings Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Store Details */}
        <div className="bg-white/95 backdrop-blur-md p-6 rounded-3xl border border-[#EDE4D8] shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#F2ECE2] text-sm font-bold text-[#252522]">
            <Store className="w-4 h-4 text-[#D66B43]" />
            <span>Store Profile & Brand</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-[#5C574F] block mb-1">Store Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#EDE5DA] text-xs text-[#252522] focus:outline-none focus:border-[#D66B43]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#5C574F] block mb-1">Campus Location</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#EDE5DA] text-xs text-[#252522] focus:outline-none focus:border-[#D66B43]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs font-bold text-[#5C574F] block mb-1">Tagline</label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#EDE5DA] text-xs text-[#252522] focus:outline-none focus:border-[#D66B43]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#5C574F] block mb-1">Kitchen Support Phone</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#EDE5DA] text-xs text-[#252522] focus:outline-none focus:border-[#D66B43]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#5C574F] block mb-1">UPI ID for Direct Settlements</label>
              <input
                type="text"
                value={formData.upiId}
                onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#EDE5DA] text-xs text-[#252522] focus:outline-none focus:border-[#D66B43]"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Operational Times & Ordering Modes */}
        <div className="bg-white/95 backdrop-blur-md p-6 rounded-3xl border border-[#EDE4D8] shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#F2ECE2] text-sm font-bold text-[#252522]">
            <Clock className="w-4 h-4 text-[#D66B43]" />
            <span>Kitchen Operating Controls</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-[#5C574F] block mb-1">Operating Hours</label>
              <input
                type="text"
                value={formData.openingHours}
                onChange={(e) => setFormData({ ...formData, openingHours: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#EDE5DA] text-xs text-[#252522] focus:outline-none focus:border-[#D66B43]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#5C574F] block mb-1">Target Prep Time (Mins)</label>
              <input
                type="number"
                value={formData.avgPrepTime}
                onChange={(e) => setFormData({ ...formData, avgPrepTime: parseInt(e.target.value) || 10 })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#EDE5DA] text-xs text-[#252522] focus:outline-none focus:border-[#D66B43]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#5C574F] block mb-1">Express Shelf Slots</label>
              <input
                type="number"
                value={formData.shelfCount}
                onChange={(e) => setFormData({ ...formData, shelfCount: parseInt(e.target.value) || 18 })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#EDE5DA] text-xs text-[#252522] focus:outline-none focus:border-[#D66B43]"
              />
            </div>
          </div>

          {/* Toggle Switches */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-[#F2ECE2]">
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#EDE5DA]">
              <div className="flex items-center gap-2.5">
                <Utensils className="w-4 h-4 text-[#D66B43]" />
                <div>
                  <div className="text-xs font-bold text-[#252522]">Dine-In Orders</div>
                  <div className="text-[10px] text-[#736E65]">Allow table number selection</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, dineInEnabled: !formData.dineInEnabled })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  formData.dineInEnabled ? "bg-[#D66B43]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    formData.dineInEnabled ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#EDE5DA]">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-4 h-4 text-[#D66B43]" />
                <div>
                  <div className="text-xs font-bold text-[#252522]">Takeaway Orders</div>
                  <div className="text-[10px] text-[#736E65]">Enable Express Counter Shelf Pickup</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, takeawayEnabled: !formData.takeawayEnabled })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  formData.takeawayEnabled ? "bg-[#D66B43]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    formData.takeawayEnabled ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="px-6 py-3 rounded-full bg-gradient-to-r from-[#D66B43] to-[#E87A48] text-white text-xs sm:text-sm font-bold shadow-md hover:brightness-105 transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Kitchen Configurations</span>
          </button>

          {saved && (
            <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
              <Check className="w-3.5 h-3.5" />
              <span>Settings Saved Successfully!</span>
            </span>
          )}
        </div>
      </form>
    </div>
  );
};
