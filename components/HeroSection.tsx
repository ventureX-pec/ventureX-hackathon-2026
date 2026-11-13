"use client"

import React from "react"
import DishOrbitCarousel, { type Dish } from "@/components/ui/dish-orbit-carousel"
import { useCart } from "@/context/CartContext"
import { MENU_ITEMS } from "@/data/menuData"

// Featured artisanal dishes for the hero orbit carousel
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
    accent: "#c96342",
  },
  {
    title: "Mediterranean",
    subtitle: "Mezze & Feta Salad",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=700&auto=format&fit=crop&q=80",
    eyebrow: "#2 Garden Harvest Pick",
    label: "Mediterranean Salad",
    rating: 4.8,
    chef: "Chef Elena Gomez",
    kitchen: "Cold Larder & Garde Manger",
    description: "Crisp organic greens, Persian cucumbers, heirloom tomatoes, sheep's milk feta, Kalamata olives and cold-pressed extra virgin olive oil.",
    likes: 312,
    ingredients: ["Organic Greens", "Kalamata Olives", "Sheep's Feta", "Za'atar Croutons", "Cold-Pressed EVOO"],
    accent: "#d97706",
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
    accent: "#e07a5f",
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

  const handleCarouselOrder = (dish: Dish) => {
    const found = MENU_ITEMS.find(
      (m) =>
        m.name.toLowerCase().includes(dish.subtitle.toLowerCase()) ||
        dish.subtitle.toLowerCase().includes(m.name.toLowerCase())
    )
    if (found) {
      addItem(found, 1)
      setIsCartOpen(true)
    } else {
      const menuEl = document.querySelector("#menu")
      if (menuEl) menuEl.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleExploreMenu = () => {
    const el = document.querySelector("#menu")
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  const handleOrderFood = () => {
    const el = document.querySelector("#menu")
    if (el) el.scrollIntoView({ behavior: "smooth" })
    setIsCartOpen(true)
  }

  return (
    <section id="hero" className="relative w-full bg-[#0f0e0d]">
      <DishOrbitCarousel
        dishes={FEATURED_HERO_DISHES}
        onOrder={handleCarouselOrder}
        onExploreMenu={handleExploreMenu}
        onOrderFood={handleOrderFood}
      />
    </section>
  )
}
