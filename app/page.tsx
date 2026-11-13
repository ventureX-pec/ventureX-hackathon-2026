"use client"

import React, { useState, useMemo } from "react"
import Link from "next/link"
import CustomerNavbar from "@/components/customer/CustomerNavbar"
import CustomerDiscoveryHero from "@/components/customer/CustomerDiscoveryHero"
import CustomerRestaurantCard from "@/components/customer/CustomerRestaurantCard"
import CustomerCartDrawer from "@/components/customer/CustomerCartDrawer"
import Footer from "@/components/Footer"
import { useDineFlow } from "@/context/DineFlowContext"
import {
  Sparkles,
  Flame,
  ArrowRight,
  ShieldCheck,
  Zap,
  Clock,
  QrCode,
  LayoutDashboard,
} from "lucide-react"

export default function DiscoveryHome() {
  const { restaurants } = useDineFlow()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("All Metro Districts")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Filter restaurants based on search, location, category
  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((r) => {
      const matchesSearch =
        !searchQuery ||
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory =
        selectedCategory === "all" ||
        r.cuisine.toLowerCase().includes(selectedCategory.toLowerCase())

      return matchesSearch && matchesCategory
    })
  }, [restaurants, searchQuery, selectedCategory])

  const featuredRestaurant = filteredRestaurants[0] || restaurants[0]
  const otherRestaurants = filteredRestaurants.slice(1)

  return (
    <div className="min-h-screen bg-[#faf7f2] flex flex-col">
      {/* Top Navigation */}
      <CustomerNavbar />

      {/* Hero Section */}
      <CustomerDiscoveryHero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Featured Restaurant Spotlight */}
        {featuredRestaurant && (
          <section className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-[#c96342] uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>SPOTLIGHT RESTAURANT OF THE WEEK</span>
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1c1917] tracking-tight mt-1">
                  Featured Artisan Kitchen
                </h2>
              </div>
              <Link
                href={`/r/${featuredRestaurant.slug}`}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-[#c96342] hover:text-[#a84d31] transition-colors"
              >
                <span>View Full Storefront</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <CustomerRestaurantCard restaurant={featuredRestaurant} featured={true} />
          </section>
        )}

        {/* Popular Near You Grid */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-[#78716c] uppercase tracking-wider">
                EXPLORE INDEPENDENT SPOTS
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1c1917] tracking-tight mt-1">
                Popular Kitchens Near You
              </h2>
            </div>
            <span className="text-xs text-[#78716c]">
              Showing {filteredRestaurants.length} restaurant{filteredRestaurants.length !== 1 ? "s" : ""}
            </span>
          </div>

          {filteredRestaurants.length === 0 ? (
            <div className="py-16 text-center bg-white rounded-3xl border border-[#e7dfd5] p-8 space-y-3">
              <Flame className="w-10 h-10 text-[#a8a29e] mx-auto" />
              <h3 className="font-serif text-lg font-bold text-[#1c1917]">
                No restaurants found matching &quot;{searchQuery}&quot;
              </h3>
              <p className="text-xs text-[#78716c] max-w-sm mx-auto">
                Try searching for general cuisines like &quot;Hearth&quot;, &quot;Indian&quot;, or clear your filter.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("all")
                }}
                className="px-4 py-2 rounded-full bg-[#c96342] text-white text-xs font-medium"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredRestaurants.map((restaurant) => (
                <CustomerRestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>
          )}
        </section>

        {/* Why DineFlow Highlights Section */}
        <section className="rounded-3xl bg-[#f4ede4] border border-[#e7dfd5] p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#c96342]">
              THE DINEFLOW PROMISE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1c1917] tracking-tight mt-1.5">
              Empowering Independent Restaurants. Rewarding Honest Food.
            </h2>
            <p className="text-xs sm:text-sm text-[#57534e] mt-3 leading-relaxed font-light">
              We replace 30% aggregator commission fees with direct digital ordering, dynamic kitchen preparation timelines, and QR table-side hospitality.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[#e7dfd5]">
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-xl bg-white text-[#c96342] flex items-center justify-center shadow-2xs">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-base font-semibold text-[#1c1917]">
                Zero Markup
              </h3>
              <p className="text-xs text-[#57534e] leading-relaxed">
                Pay the authentic dining-room price without hidden delivery inflation.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-9 h-9 rounded-xl bg-white text-[#c96342] flex items-center justify-center shadow-2xs">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-base font-semibold text-[#1c1917]">
                Smart Kitchen Slots
              </h3>
              <p className="text-xs text-[#57534e] leading-relaxed">
                Estimated pickup times calculate real kitchen workload so food is never sitting lukewarm.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-9 h-9 rounded-xl bg-white text-[#c96342] flex items-center justify-center shadow-2xs">
                <QrCode className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-base font-semibold text-[#1c1917]">
                Direct Table QR
              </h3>
              <p className="text-xs text-[#57534e] leading-relaxed">
                Order and pay from your seat without waiting 15 minutes for paper receipts.
              </p>
            </div>
          </div>
        </section>

        {/* Dual Portal Switcher Banner */}
        <section className="bg-[#1c1917] rounded-3xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-medium text-[#e07a5f]">
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>JUDGE & INVESTOR DEMO MODE</span>
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight">
              Explore the Restaurant Owner Dashboard
            </h3>
            <p className="text-xs sm:text-sm text-[#a8a29e] max-w-xl">
              Experience the dual interface: Live Orders Kanban board, Smart Kitchen workload simulator, inventory with dish linking, and revenue analytics.
            </p>
          </div>
          <Link
            href="/owner"
            className="flex-shrink-0 px-6 py-3.5 rounded-full bg-[#c96342] hover:bg-[#a84d31] text-white text-xs sm:text-sm font-semibold transition-all shadow-sm hover:shadow active:scale-95 flex items-center gap-2"
          >
            <span>Launch Owner Portal</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Shopping Cart Drawer */}
      <CustomerCartDrawer />
    </div>
  )
}
