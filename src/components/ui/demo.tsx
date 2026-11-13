"use client"

import React from "react"
import { ThreeDPhotoCarousel } from "@/components/ui/3d-carousel"

export function ThreeDPhotoCarouselDemo() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <div className="min-h-[500px] flex flex-col justify-center border border-dashed border-[#ECE7DE] rounded-3xl bg-white/50 backdrop-blur-xs p-4 sm:p-6 shadow-soft">
        <div className="text-center mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#D66B43] bg-[#FAF2EE] px-3 py-1 rounded-full">
            Interactive Culinary Showcase
          </span>
          <p className="text-xs text-[#6E6D66] mt-2">
            Drag horizontally to rotate • Click any dish to expand
          </p>
        </div>
        <ThreeDPhotoCarousel />
      </div>
    </div>
  )
}
