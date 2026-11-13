"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { X, Users, UserPlus } from "lucide-react";
import { AdminStaffMember } from "@/data/mockAdminData";

interface AddStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddStaff: (staff: AdminStaffMember) => void;
}

export const AddStaffModal: React.FC<AddStaffModalProps> = ({
  isOpen,
  onClose,
  onAddStaff,
}) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState<AdminStaffMember["role"]>("Sous Chef");
  const [shift, setShift] = useState<AdminStaffMember["shift"]>("Evening (4 PM - 11 PM)");
  const [phone, setPhone] = useState("");
  const [station, setStation] = useState("Woodfired Stone Oven");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newStaff: AdminStaffMember = {
      id: `staff-${Date.now()}`,
      name: name.trim(),
      role,
      shift,
      status: "On Shift",
      phone: phone.trim() || "+91 98765 00000",
      assignedStation: station.trim() || "Main Counter",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
    };

    onAddStaff(newStaff);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="w-full max-w-md bg-white rounded-3xl border border-[#EDE4D8] shadow-2xl p-6 space-y-5"
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#F2ECE2]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#D66B43]/15 text-[#D66B43] flex items-center justify-center">
              <UserPlus className="w-4 h-4" />
            </div>
            <h2 className="font-serif text-lg font-bold text-[#252522]">Add Crew Member</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-[#8C877D] hover:text-[#252522]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-[#5C574F] block mb-1">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Vikram Malhotra"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#EDE5DA] text-xs text-[#252522] focus:outline-none focus:border-[#D66B43]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-[#5C574F] block mb-1">Kitchen Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as AdminStaffMember["role"])}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#EDE5DA] text-xs text-[#252522] focus:outline-none focus:border-[#D66B43] bg-white"
              >
                <option value="Kitchen Head">Kitchen Head</option>
                <option value="Sous Chef">Sous Chef</option>
                <option value="Counter Lead">Counter Lead</option>
                <option value="Order Expediter">Order Expediter</option>
                <option value="Cashier">Cashier</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-[#5C574F] block mb-1">Shift</label>
              <select
                value={shift}
                onChange={(e) => setShift(e.target.value as AdminStaffMember["shift"])}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#EDE5DA] text-xs text-[#252522] focus:outline-none focus:border-[#D66B43] bg-white"
              >
                <option value="Morning (8 AM - 4 PM)">Morning Shift</option>
                <option value="Evening (4 PM - 11 PM)">Evening Shift</option>
                <option value="Full Day">Full Day</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-[#5C574F] block mb-1">Assigned Station</label>
            <input
              type="text"
              value={station}
              onChange={(e) => setStation(e.target.value)}
              placeholder="e.g. Grill & Patty Line / Dum Pot Station"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#EDE5DA] text-xs text-[#252522] focus:outline-none focus:border-[#D66B43]"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#5C574F] block mb-1">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 00000"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#EDE5DA] text-xs text-[#252522] focus:outline-none focus:border-[#D66B43]"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-full border border-[#EDE5DA] text-xs font-semibold text-[#5C574F] hover:bg-[#FAF8F5]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D66B43] to-[#E87A48] text-white text-xs font-bold shadow-md hover:brightness-105"
            >
              Add Crew Member
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
