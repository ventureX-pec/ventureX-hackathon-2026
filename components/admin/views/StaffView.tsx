"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import {
  Users,
  Plus,
  Phone,
  Shield,
  ChefHat,
  Clock,
  Sparkles,
} from "lucide-react";
import { AdminStaffMember } from "@/data/mockAdminData";

interface StaffViewProps {
  staffList: AdminStaffMember[];
  onOpenAddStaffModal: () => void;
}

export const StaffView: React.FC<StaffViewProps> = ({
  staffList,
  onOpenAddStaffModal,
}) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white/95 backdrop-blur-md p-5 rounded-3xl border border-[#EDE4D8] shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#252522]">
              Kitchen Team & Staff
            </h1>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#D66B43]/10 text-[#D66B43]">
              {staffList.length} Active Crew Members
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#736E65]">
            Shift schedules, station assignments and kitchen staff access roles
          </p>
        </div>

        <button
          onClick={onOpenAddStaffModal}
          className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#D66B43] to-[#E87A48] text-white text-xs sm:text-sm font-bold shadow-md hover:brightness-105 transition-all flex items-center justify-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Staff Member</span>
        </button>
      </div>

      {/* Staff Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {staffList.map((member) => (
          <motion.div
            key={member.id}
            layout
            className="bg-white/95 backdrop-blur-md rounded-3xl border border-[#EDE4D8] p-5 shadow-xs flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    member.status === "On Shift"
                      ? "bg-emerald-100 text-emerald-800"
                      : member.status === "Break"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-[#F2ECE2] text-[#736E65]"
                  }`}
                >
                  ● {member.status}
                </span>

                <span className="text-[10px] font-semibold text-[#8C877D] bg-[#FAF8F5] px-2 py-0.5 rounded-md border border-[#EDE5DA]">
                  {member.shift.split(" ")[0]}
                </span>
              </div>

              {/* Avatar & Name */}
              <div className="text-center pt-2">
                <div className="relative w-16 h-16 rounded-full overflow-hidden mx-auto border-2 border-[#D66B43]/30 shadow-xs mb-3">
                  <Image src={member.avatar} alt={member.name} fill className="object-cover" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#252522]">{member.name}</h3>
                <p className="text-xs font-semibold text-[#D66B43]">{member.role}</p>
              </div>

              {/* Station Assignment */}
              <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#EDE5DA] text-xs space-y-1">
                <span className="text-[10px] text-[#8C877D] uppercase font-bold block">
                  Station Assigned
                </span>
                <span className="font-semibold text-[#252522] block">
                  {member.assignedStation}
                </span>
              </div>
            </div>

            {/* Contact */}
            <div className="pt-3 border-t border-[#F2ECE2] flex items-center justify-between text-xs text-[#736E65]">
              <span className="flex items-center gap-1 font-mono">{member.phone}</span>
              <a
                href={`tel:${member.phone}`}
                className="p-1.5 rounded-lg bg-[#FAF8F5] hover:text-[#D66B43] transition-colors"
                title="Call member"
              >
                <Phone className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
