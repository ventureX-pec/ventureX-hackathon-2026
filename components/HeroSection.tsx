"use client"

import React from "react"
import DishOrbitCarousel, { type Dish } from "@/components/ui/dish-orbit-carousel"
import { useCart } from "@/context/CartContext"
import { MENU_ITEMS } from "@/data/menuData"
import { ArrowDown, UtensilsCrossed, Clock, Star, Flame } from "lucide-react"

// Featured dishes matching our artisanal restaurant menu
const FEATURED_HERO_DISHES: Dish[] = [
  {
    title: "Char-Grilled",
    subtitle: "Prime Ribeye",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=700&auto=format&fit=crop&q=80",
    eyebrow: "#1 Chef's Signature Dish",
    label: "Char-Grilled Ribeye",
    rating: 4.9,
    chef: "Chef Marcus Vance",
    kitchen: "The Corner Table Hearth",
    description: "Dry-aged prime ribeye seared over hickory embers with black truffle butter, confit garlic and rosemary sea salt.",
    likes: 428,
    ingredients: ["Prime Ribeye", "Truffle Butter", "Garlic Confit", "Fresh Rosemary", "Pink Sea Salt"],
    accent: "#c25e3e",
  },
  {
    title: "Mediterranean",
    subtitle: "Mezze & Feta Salad",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=700&auto=format&fit=crop&q=80",
    eyebrow: "#2 Garden Harvest Pick",
    label: "Mediterranean Salad",
    rating: 4.8,
    chef: "Chef Elena Gomez",
    kitchen: "Cold Larder & Garde Manger",
    description: "Crisp organic greens, Persian cucumbers, heirloom tomatoes, sheep's milk feta, Kalamata olives and cold-pressed extra virgin olive oil.",
    likes: 312,
    ingredients: ["Organic Greens", "Kalamata Olives", "Sheep's Feta", "Za'atar Croutons", "Cold-Pressed EVOO"],
    accent: "#2e7d32",
  },
  {
    title: "Pan-Seared",
    subtitle: "Wild Atlantic Salmon",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=700&auto=format&fit=crop&q=80",
    eyebrow: "#3 Seafood Atelier",
    label: "Pan-Seared Salmon",
    rating: 4.9,
    chef: "Chef Kenji Sato",
    kitchen: "Sauté & Poaching Station",
    description: "Crispy skin Atlantic salmon over slow-simmered lemon-herb arborio risotto with tender spring asparagus spears.",
    likes: 389,
    ingredients: ["Wild Salmon", "Arborio Rice", "Lemon Zest", "Baby Asparagus", "Dill Oil"],
    accent: "#d97706",
  },
  {
    title: "Artisanal",
    subtitle: "Avocado & Egg Tartine",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=700&auto=format&fit=crop&q=80",
    eyebrow: "#4 All-Day Breakfast Favorite",
    label: "Avocado Tartine",
    rating: 4.7,
    chef: "Chef Maya Patel",
    kitchen: "Bakery & Griddle",
    description: "Thick-cut country sourdough with crushed ripe Hass avocado, pasture-raised poached eggs, microgreens and chili flakes.",
    likes: 512,
    ingredients: ["Country Sourdough", "Hass Avocado", "Organic Farm Eggs", "Microgreens", "Aleppo Chili"],
    accent: "#b45309",
  },
]

export default function HeroSection() {
  const { addItem, setIsCartOpen } = useCart()

  const handleCarouselOrder = (dish: Dish, index: number) => {
    // Map the hero dish to our full menu item and add to cart
    const found = MENU_ITEMS.find(
      (m) =>
        m.name.toLowerCase().includes(dish.subtitle.toLowerCase()) ||
        dish.subtitle.toLowerCase().includes(m.name.toLowerCase())
    )
    if (found) {
      addItem(found, 1)
      setIsCartOpen(true)
    } else {
      // Fallback: scroll directly to menu
      const menuEl = document.querySelector("#menu")
      if (menuEl) menuEl.scrollIntoView({ behavior: "smooth" })
    }
  }

  const scrollToMenu = () => {
    const el = document.querySelector("#menu")
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="hero" className="relative pt-24 pb-12 bg-[#fbf9f5] overflow-hidden">
      {/* Top Hero Brand Header & Live Kitchen Indicators */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-6 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f3ede4] border border-[#e7dfd5] text-xs font-semibold text-[#78716c] mb-4">
          <span className="flex h-2 w-2 rounded-full bg-[#c25e3e] animate-pulse" />
          <span>Kitchen Active · Table QR Dine-In & Express Pickup</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-[#1c1917] max-w-4xl mx-auto leading-[1.15]">
          Good food. Honest ingredients.
          <br />
          <span className="italic font-light text-[#c25e3e]">Made fresh for your table.</span>
        </h1>

        <p className="mt-3 max-w-xl mx-auto text-sm sm:text-base text-[#57534e] leading-relaxed">
          Scroll through our featured seasonal creations or jump straight to the menu for instant, queue-free ordering.
        </p>

        {/* Clear Action CTAs */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={scrollToMenu}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#c25e3e] hover:bg-[#a84d31] text-white font-medium text-sm transition-all shadow-sm hover:shadow active:scale-95 cursor-pointer"
          >
            <UtensilsCrossed className="w-4 h-4" />
            <span>Explore Menu</span>
          </button>

          <button
            onClick={() => {
              scrollToMenu()
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#f3ede4] hover:bg-[#eae2d7] text-[#292524] border border-[#e7dfd5] font-medium text-sm transition-all shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer"
          >
            <Flame className="w-4 h-4 text-[#c25e3e]" />
            <span>Order Your Food</span>
          </button>
        </div>

        {/* Trust Badges Bar */}
        <div className="mt-8 pt-6 border-t border-[#e7dfd5]/60 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-xs font-medium text-[#78716c]">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#c25e3e]" />
            <span>8 – 14 Min Avg. Prep Time</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-[#d97706] fill-amber-500" />
            <span>4.9 / 5.0 (450+ Guest Ratings)</span>
          </div>
          <div className="flex items-center gap-2">
            <UtensilsCrossed className="w-4 h-4 text-[#c25e3e]" />
            <span>100% Fresh Scratch Cooking</span>
          </div>
        </div>
      </div>

      {/* The Preserved Dish Orbit Carousel */}
      <div className="relative w-full border-t border-b border-[#e7dfd5]">
        <DishOrbitCarousel
          dishes={FEATURED_HERO_DISHES}
          height="82vh"
          loop={true}
          onOrder={handleCarouselOrder}
          onPlay={(dish, index) => {
            console.log(`Playing video preview for ${dish.title} ${dish.subtitle}`)
          }}
        />
      </div>

      {/* Sub-hero Scroll Indicator */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between text-xs text-[#78716c]">
        <span className="hidden sm:inline">Scroll through the carousel or use arrow keys to navigate dishes</span>
        <button
          onClick={scrollToMenu}
          className="flex items-center gap-1.5 ml-auto text-[#c25e3e] font-semibold hover:underline"
        >
          <span>See Full Kitchen Menu Below</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </button>
      </div>
    </section>
  )
}
