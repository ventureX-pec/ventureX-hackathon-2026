"use client"

import React from "react"
import Link from "next/link"
import CustomerNavbar from "@/components/customer/CustomerNavbar"
import CustomerRestaurantCard from "@/components/customer/CustomerRestaurantCard"
import CustomerCartDrawer from "@/components/customer/CustomerCartDrawer"
import Footer from "@/components/Footer"
import { useDineFlow } from "@/context/DineFlowContext"
import { Heart, Plus, ShoppingBag, ArrowRight } from "lucide-react"

export default function FavouritesPage() {
  const {
    restaurants,
    menuItems,
    favouriteRestaurantIds,
    favouriteDishIds,
    addToCart,
  } = useDineFlow()

  const favRestaurants = restaurants.filter((r) =>
    favouriteRestaurantIds.includes(r.id)
  )

  const favDishes = menuItems.filter((d) =>
    favouriteDishIds.includes(d.id)
  )

  return (
    <div className="min-h-screen bg-[#faf7f2] flex flex-col">
      <CustomerNavbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-12">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#c96342]">
            CURATED PICKS
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1c1917] tracking-tight mt-1">
            Your Favourites
          </h1>
          <p className="text-xs sm:text-sm text-[#57534e] mt-1 font-light">
            Quick access to your most-loved neighborhood restaurants and dishes.
          </p>
        </div>

        {/* Favorite Restaurants */}
        <section className="space-y-5">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1c1917]">
            Saved Restaurants ({favRestaurants.length})
          </h2>

          {favRestaurants.length === 0 ? (
            <div className="py-12 text-center bg-white rounded-3xl border border-[#e7dfd5] p-6 space-y-2">
              <Heart className="w-8 h-8 text-[#a8a29e] mx-auto" />
              <p className="text-xs text-[#78716c]">No saved restaurants yet.</p>
              <Link href="/" className="inline-block text-xs text-[#c96342] font-semibold">
                Explore restaurants &rarr;
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favRestaurants.map((restaurant) => (
                <CustomerRestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>
          )}
        </section>

        {/* Favorite Dishes */}
        <section className="space-y-5">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1c1917]">
            Saved Signature Dishes ({favDishes.length})
          </h2>

          {favDishes.length === 0 ? (
            <div className="py-12 text-center bg-white rounded-3xl border border-[#e7dfd5] p-6 space-y-2">
              <Heart className="w-8 h-8 text-[#a8a29e] mx-auto" />
              <p className="text-xs text-[#78716c]">No saved dishes yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {favDishes.map((dish) => (
                <div
                  key={dish.id}
                  className="bg-white rounded-3xl border border-[#e7dfd5] p-5 shadow-xs flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-16 h-16 rounded-2xl object-cover flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="font-serif text-sm font-bold text-[#1c1917] truncate">
                        {dish.name}
                      </h4>
                      <span className="text-xs text-[#c96342] font-semibold block mt-0.5">
                        ₹{dish.price}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => addToCart(dish, 1)}
                    className="p-2.5 rounded-full bg-[#f4ede4] hover:bg-[#c96342] text-[#1c1917] hover:text-white transition-all flex-shrink-0"
                    title="Add to cart"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
      <CustomerCartDrawer />
    </div>
  )
}
