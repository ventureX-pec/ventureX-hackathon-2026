"use client"

import React, { useState, useMemo, Suspense } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import CustomerNavbar from "@/components/customer/CustomerNavbar"
import CustomerCartDrawer from "@/components/customer/CustomerCartDrawer"
import DishDetailModal from "@/components/customer/DishDetailModal"
import DishOrbitCarousel, { Dish } from "@/components/ui/dish-orbit-carousel"
import ReservationModal from "@/components/ReservationModal"
import Footer from "@/components/Footer"
import { useDineFlow, MenuItem } from "@/context/DineFlowContext"
import {
  Star,
  Clock,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Search,
  Plus,
  ShoppingBag,
  Sparkles,
  Heart,
  QrCode,
  Share2,
  UtensilsCrossed,
  AlertCircle,
  X,
} from "lucide-react"

// Featured dishes matching our orbit carousel
const HERO_ORBIT_DISHES: Dish[] = [
  {
    title: "Char-Grilled",
    subtitle: "Prime Ribeye",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=700&auto=format&fit=crop&q=80",
    eyebrow: "#1 Chef's Signature Dish",
    label: "Prime Ribeye",
    rating: 4.9,
    chef: "Chef Marcus Vance",
    kitchen: "The Corner Table Hearth",
    description: "Dry-aged prime ribeye seared over hickory embers with black truffle butter, confit garlic and rosemary sea salt.",
    likes: 428,
    ingredients: ["Prime Ribeye", "Truffle Butter", "Garlic Confit", "Fresh Rosemary"],
    accent: "#c96342",
  },
  {
    title: "Mediterranean",
    subtitle: "Mezze & Feta Salad",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=700&auto=format&fit=crop&q=80",
    eyebrow: "#2 Garden Harvest Pick",
    label: "Mezze Salad",
    rating: 4.8,
    chef: "Chef Elena Gomez",
    kitchen: "Cold Larder & Garde Manger",
    description: "Crisp organic greens, Persian cucumbers, heirloom tomatoes, sheep's milk feta, Kalamata olives and cold-pressed extra virgin olive oil.",
    likes: 312,
    ingredients: ["Organic Greens", "Kalamata Olives", "Sheep's Milk Feta", "Cold-Pressed EVOO"],
    accent: "#d97706",
  },
  {
    title: "Pan-Seared",
    subtitle: "Wild Atlantic Salmon",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=700&auto=format&fit=crop&q=80",
    eyebrow: "#3 Seafood Atelier",
    label: "Wild Salmon",
    rating: 4.9,
    chef: "Chef Kenji Sato",
    kitchen: "Sauté & Poaching Station",
    description: "Crispy skin Atlantic salmon over slow-simmered lemon-herb arborio risotto with tender spring asparagus spears.",
    likes: 389,
    ingredients: ["Atlantic Wild Salmon", "Arborio Rice", "Fresh Asparagus", "Dill Herb Oil"],
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
    ingredients: ["Country Sourdough", "Hass Avocado", "Pasture Eggs", "Microgreens"],
    accent: "#b45309",
  },
]

function RestaurantStorefrontContent() {
  const params = useParams()
  const slug = (params?.slug as string) || "the-corner-table"

  const {
    restaurants,
    menuItems,
    addToCart,
    favouriteRestaurantIds,
    toggleFavouriteRestaurant,
    setCurrentRestaurantId,
  } = useDineFlow()

  // Match restaurant by slug
  const restaurant = useMemo(() => {
    const found = restaurants.find((r) => r.slug === slug || r.id === slug)
    return found || restaurants[0]
  }, [restaurants, slug])

  // Sync current restaurant into context for ordering
  React.useEffect(() => {
    if (restaurant) {
      setCurrentRestaurantId(restaurant.id)
    }
  }, [restaurant, setCurrentRestaurantId])

  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [dishSearch, setDishSearch] = useState("")
  const [selectedDishModal, setSelectedDishModal] = useState<MenuItem | null>(null)
  const [reservationModalOpen, setReservationModalOpen] = useState(false)
  const [qrModalOpen, setQrModalOpen] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)

  // Dishes for this restaurant
  const restaurantDishes = useMemo(() => {
    return menuItems.filter((m) => m.restaurantId === restaurant.id)
  }, [menuItems, restaurant.id])

  // Filtered dishes
  const filteredDishes = useMemo(() => {
    return restaurantDishes.filter((dish) => {
      const matchesCategory =
        activeCategory === "all" || dish.category === activeCategory
      const matchesSearch =
        !dishSearch ||
        dish.name.toLowerCase().includes(dishSearch.toLowerCase()) ||
        dish.description.toLowerCase().includes(dishSearch.toLowerCase()) ||
        dish.ingredients.some((i) => i.toLowerCase().includes(dishSearch.toLowerCase()))

      return matchesCategory && matchesSearch
    })
  }, [restaurantDishes, activeCategory, dishSearch])

  const categories = [
    { id: "all", label: "All Items" },
    { id: "specials", label: "Chef's Specials" },
    { id: "mains", label: "Main Course" },
    { id: "starters", label: "Starters & Greens" },
    { id: "desserts", label: "Artisanal Desserts" },
    { id: "beverages", label: "House Beverages" },
  ]

  const isFav = favouriteRestaurantIds.includes(restaurant.id)

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href)
      setCopiedLink(true)
      setTimeout(() => setCopiedLink(false), 2000)
    }
  }

  const scrollToMenu = () => {
    const el = document.getElementById("restaurant-menu")
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-[#faf7f2] flex flex-col">
      {/* Top Customer Navigation */}
      <CustomerNavbar />

      {/* Hero Section:
          If the restaurant is "the-corner-table", REUSE the beautiful DishOrbitCarousel!
          If it's another restaurant, show an elegant high-res cover banner.
      */}
      {restaurant.slug === "the-corner-table" ? (
        <section className="relative w-full bg-[#0f0e0d]">
          <DishOrbitCarousel
            dishes={HERO_ORBIT_DISHES}
            onReserveClick={() => setReservationModalOpen(true)}
          />
        </section>
      ) : (
        <section className="relative h-80 sm:h-96 w-full bg-[#1c1917] overflow-hidden">
          <img
            src={restaurant.coverImage}
            alt={restaurant.name}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1c1917] via-black/40 to-black/20" />
          <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-12 z-10 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#e07a5f]">
              {restaurant.cuisine}
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
              {restaurant.name}
            </h1>
            <p className="text-sm text-[#d6cbbe] max-w-xl font-light">
              {restaurant.description}
            </p>
          </div>
        </section>
      )}

      {/* Floating / Sticky Restaurant Info Card Bar */}
      <section className="relative -mt-6 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-white rounded-3xl border border-[#e7dfd5] p-6 sm:p-8 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#c96342] text-white flex items-center justify-center font-serif text-2xl font-bold shadow-xs flex-shrink-0">
              {restaurant.logo}
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="font-serif text-2xl font-bold text-[#1c1917]">
                  {restaurant.name}
                </h2>
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#2e7d32]/10 text-[#2e7d32] text-xs font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2e7d32] animate-pulse" />
                  <span>{restaurant.status === "open" ? "Kitchen Open" : "Closed"}</span>
                </div>
              </div>
              <p className="text-xs text-[#78716c] mt-1 flex items-center gap-3 flex-wrap">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#c96342]" />
                  {restaurant.address}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#c96342]" />
                  {restaurant.hours}
                </span>
              </p>
            </div>
          </div>

          {/* Quick Metrics & Actions */}
          <div className="flex items-center gap-3 flex-wrap pt-4 lg:pt-0 border-t lg:border-t-0 border-[#e7dfd5]">
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#f4ede4] text-xs font-bold text-[#1c1917]">
              <Star className="w-3.5 h-3.5 fill-[#d97706] text-[#d97706]" />
              <span>{restaurant.rating}</span>
              <span className="text-[10px] text-[#78716c] font-normal">
                ({restaurant.reviewCount}+ reviews)
              </span>
            </div>

            <button
              onClick={() => toggleFavouriteRestaurant(restaurant.id)}
              className={`p-2.5 rounded-xl border text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                isFav
                  ? "bg-[#c96342] border-[#c96342] text-white"
                  : "bg-white border-[#e7dfd5] text-[#57534e] hover:bg-[#f4ede4]"
              }`}
              title="Save to favourites"
            >
              <Heart className={`w-4 h-4 ${isFav ? "fill-current" : ""}`} />
              <span className="hidden sm:inline">{isFav ? "Saved" : "Save"}</span>
            </button>

            <button
              onClick={() => setQrModalOpen(true)}
              className="p-2.5 rounded-xl bg-white border border-[#e7dfd5] text-[#57534e] hover:bg-[#f4ede4] text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5"
              title="Table QR Code"
            >
              <QrCode className="w-4 h-4 text-[#c96342]" />
              <span className="hidden sm:inline">Table QR</span>
            </button>

            <button
              onClick={handleShare}
              className="p-2.5 rounded-xl bg-white border border-[#e7dfd5] text-[#57534e] hover:bg-[#f4ede4] text-xs font-medium transition-all cursor-pointer"
              title="Share restaurant"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={() => setReservationModalOpen(true)}
              className="px-5 py-2.5 rounded-full bg-[#1c1917] hover:bg-[#c96342] text-white text-xs font-semibold transition-all shadow-xs"
            >
              Reserve Table
            </button>
          </div>
        </div>
      </section>

      {/* Main Menu Ordering Area */}
      <main id="restaurant-menu" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full space-y-8">
        {/* Header & Category Filter Controls */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-[#c96342] uppercase tracking-wider">
                SCRATCH COOKING MENU
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#1c1917] tracking-tight mt-1">
                Explore & Order Dishes
              </h2>
            </div>

            {/* Dish Search Bar */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a8a29e]" />
              <input
                type="text"
                value={dishSearch}
                onChange={(e) => setDishSearch(e.target.value)}
                placeholder="Search dishes or ingredients..."
                className="w-full pl-9 pr-3.5 py-2 rounded-full bg-white border border-[#e7dfd5] text-xs text-[#1c1917] placeholder-[#a8a29e] focus:outline-none focus:border-[#c96342]"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-[#c96342] text-white shadow-xs"
                    : "bg-white border border-[#e7dfd5] text-[#57534e] hover:bg-[#f4ede4] hover:text-[#1c1917]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dishes Grid */}
        {filteredDishes.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-3xl border border-[#e7dfd5] p-8 space-y-3">
            <UtensilsCrossed className="w-10 h-10 text-[#a8a29e] mx-auto" />
            <h3 className="font-serif text-lg font-bold text-[#1c1917]">
              No dishes found
            </h3>
            <p className="text-xs text-[#78716c] max-w-sm mx-auto">
              No menu items match your search &quot;{dishSearch}&quot; in this category.
            </p>
            <button
              onClick={() => {
                setActiveCategory("all")
                setDishSearch("")
              }}
              className="px-4 py-2 rounded-full bg-[#c96342] text-white text-xs font-medium"
            >
              Reset Category Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredDishes.map((dish) => {
              const isAvailable = dish.isAvailable
              return (
                <div
                  key={dish.id}
                  onClick={() => setSelectedDishModal(dish)}
                  className={`group bg-white rounded-3xl border border-[#e7dfd5] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                    !isAvailable ? "opacity-75 bg-[#fcfbfa]" : ""
                  }`}
                >
                  <div>
                    {/* Food Photo */}
                    <div className="relative h-48 w-full bg-[#f4ede4] overflow-hidden">
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                      {/* Veg / Non-Veg Indicator */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5">
                        <span
                          className={`w-2.5 h-2.5 rounded-full border border-white shadow-xs ${
                            dish.isVeg ? "bg-[#2e7d32]" : "bg-red-600"
                          }`}
                          title={dish.isVeg ? "Vegetarian" : "Non-Vegetarian"}
                        />
                        {dish.isChefSpecial && (
                          <span className="px-2 py-0.5 rounded-full bg-[#c96342] text-white text-[9.5px] font-bold shadow-xs">
                            Chef Special
                          </span>
                        )}
                      </div>

                      {/* Prep time badge */}
                      <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-white text-[10.5px] font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#e07a5f]" />
                        <span>{dish.prepTimeMinutes} mins</span>
                      </div>

                      {/* Unavailable Banner */}
                      {!isAvailable && (
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-2xs flex items-center justify-center p-4">
                          <span className="px-3 py-1.5 rounded-full bg-rose-600 text-white text-xs font-bold shadow-sm">
                            Sold Out Tonight
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Dish Text Content */}
                    <div className="p-5 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-serif text-base sm:text-lg font-bold text-[#1c1917] group-hover:text-[#c96342] transition-colors line-clamp-1">
                          {dish.name}
                        </h3>
                        <span className="text-sm font-bold text-[#1c1917] flex-shrink-0">
                          ₹{dish.price}
                        </span>
                      </div>

                      {dish.subtitle && (
                        <p className="text-xs text-[#c96342] font-medium line-clamp-1">
                          {dish.subtitle}
                        </p>
                      )}

                      <p className="text-xs text-[#57534e] line-clamp-2 leading-relaxed">
                        {dish.description}
                      </p>
                    </div>
                  </div>

                  {/* Add to Order Button */}
                  <div className="px-5 pb-5 pt-2">
                    {isAvailable ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          addToCart(dish, 1)
                        }}
                        className="w-full py-2.5 rounded-full bg-[#f4ede4] hover:bg-[#c96342] text-[#1c1917] hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-2xs group-hover:bg-[#c96342] group-hover:text-white cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add to Order</span>
                      </button>
                    ) : (
                      <button
                        disabled
                        className="w-full py-2.5 rounded-full bg-[#e7dfd5] text-[#78716c] text-xs font-medium cursor-not-allowed"
                      >
                        Temporarily Unavailable
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Restaurant Contact & Hours Details Block */}
        <section className="mt-16 bg-white rounded-3xl border border-[#e7dfd5] p-8 sm:p-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-serif text-lg font-bold text-[#1c1917] mb-2">
              About the Kitchen
            </h4>
            <p className="text-xs text-[#57534e] leading-relaxed">
              {restaurant.description}
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span className="text-xs font-semibold text-[#1c1917]">Cuisine Focus:</span>
              <span className="text-xs text-[#c96342] font-medium">{restaurant.cuisine}</span>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-lg font-bold text-[#1c1917] mb-2">
              Service Hours
            </h4>
            <ul className="space-y-1.5 text-xs text-[#57534e]">
              <li className="flex items-center justify-between">
                <span>Daily Service</span>
                <span className="font-semibold text-[#1c1917]">{restaurant.hours}</span>
              </li>
              <li className="text-[11px] text-[#78716c] pt-1">
                Kitchen fires last order 30 mins prior to close.
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-bold text-[#1c1917] mb-2">
              Contact & Inquiries
            </h4>
            <ul className="space-y-2 text-xs text-[#57534e]">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#c96342]" />
                <span>{restaurant.phone}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#c96342]" />
                <span>{restaurant.email}</span>
              </li>
              <li className="pt-2">
                <button
                  onClick={() => setReservationModalOpen(true)}
                  className="px-4 py-2 rounded-full bg-[#f4ede4] hover:bg-[#c96342] text-[#1c1917] hover:text-white text-xs font-semibold transition-all"
                >
                  Reserve Table for Tonight
                </button>
              </li>
            </ul>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer onOpenReservation={() => setReservationModalOpen(true)} />

      {/* Modals & Drawers */}
      <CustomerCartDrawer />

      <DishDetailModal
        dish={selectedDishModal}
        onClose={() => setSelectedDishModal(null)}
      />

      <ReservationModal
        isOpen={reservationModalOpen}
        onClose={() => setReservationModalOpen(false)}
      />

      {/* Table QR Code Modal */}
      {qrModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setQrModalOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />
          <div className="relative w-full max-w-sm bg-white rounded-3xl border border-[#e7dfd5] p-6 text-center space-y-4 z-10 shadow-2xl">
            <button
              onClick={() => setQrModalOpen(false)}
              className="absolute top-4 right-4 w-7 h-7 rounded-full bg-[#f4ede4] flex items-center justify-center text-[#57534e]"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="w-12 h-12 rounded-2xl bg-[#c96342] text-white flex items-center justify-center mx-auto shadow-xs">
              <QrCode className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-[#1c1917]">
                Scan to Order Table-Side
              </h3>
              <p className="text-xs text-[#78716c] mt-1">
                Customers scan this stand on table {restaurant.name} to browse & order without staff delay.
              </p>
            </div>
            <div className="p-4 bg-[#faf7f2] rounded-2xl border border-[#e7dfd5] inline-block">
              <img
                src={restaurant.qrCodeUrl}
                alt={`${restaurant.name} QR Code`}
                className="w-44 h-44 mx-auto rounded-lg"
              />
            </div>
            <div className="text-[11px] text-[#78716c]">
              URL: <span className="font-mono text-[#c96342]">https://dineflow.app/r/{restaurant.slug}</span>
            </div>
          </div>
        </div>
      )}

      {/* Copied Link Toast */}
      {copiedLink && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2 rounded-full bg-[#1c1917] text-white text-xs font-medium shadow-lg animate-in fade-in slide-in-from-bottom duration-200">
          Link copied to clipboard!
        </div>
      )}
    </div>
  )
}

export default function RestaurantStorefrontPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#faf7f2] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#c96342] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <RestaurantStorefrontContent />
    </Suspense>
  )
}
