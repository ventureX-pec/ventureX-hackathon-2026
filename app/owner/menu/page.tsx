"use client"

import React, { useState } from "react"
import { useDineFlow, MenuItem } from "@/context/DineFlowContext"
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Check,
  X,
  Sparkles,
  UtensilsCrossed,
  Clock,
  Flame,
  Leaf,
  Star,
} from "lucide-react"

export default function MenuManagementPage() {
  const {
    currentRestaurantMenuItems,
    currentRestaurant,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    toggleDishAvailability,
  } = useDineFlow()

  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Modal state
  const [dishModalOpen, setDishModalOpen] = useState(false)
  const [editingDish, setEditingDish] = useState<MenuItem | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    subtitle: "",
    category: "mains" as MenuItem["category"],
    description: "",
    price: 350,
    image: "",
    prepTimeMinutes: 15,
    isVeg: false,
    ingredients: "",
    calories: 450,
  })

  const categories = [
    { key: "all", label: "All Items" },
    { key: "specials", label: "Chef's Specials" },
    { key: "starters", label: "Starters & Small Plates" },
    { key: "mains", label: "Mains & Hearth" },
    { key: "desserts", label: "Desserts" },
    { key: "beverages", label: "Beverages" },
  ]

  const filteredItems = currentRestaurantMenuItems.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ingredients.some((ing) => ing.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const openAddModal = () => {
    setEditingDish(null)
    setFormData({
      name: "",
      subtitle: "",
      category: "mains",
      description: "",
      price: 350,
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=700&auto=format&fit=crop&q=80",
      prepTimeMinutes: 15,
      isVeg: false,
      ingredients: "Seasonal herbs, Olive oil, Sea salt",
      calories: 450,
    })
    setDishModalOpen(true)
  }

  const openEditModal = (dish: MenuItem) => {
    setEditingDish(dish)
    setFormData({
      name: dish.name,
      subtitle: dish.subtitle || "",
      category: dish.category,
      description: dish.description,
      price: dish.price,
      image: dish.image,
      prepTimeMinutes: dish.prepTimeMinutes,
      isVeg: dish.isVeg,
      ingredients: dish.ingredients.join(", "),
      calories: dish.calories || 450,
    })
    setDishModalOpen(true)
  }

  const handleSaveDish = (e: React.FormEvent) => {
    e.preventDefault()
    const ingArray = formData.ingredients
      .split(",")
      .map((i) => i.trim())
      .filter(Boolean)

    if (editingDish) {
      updateMenuItem(editingDish.id, {
        name: formData.name,
        subtitle: formData.subtitle,
        category: formData.category,
        description: formData.description,
        price: Number(formData.price),
        image: formData.image,
        prepTimeMinutes: Number(formData.prepTimeMinutes),
        isVeg: formData.isVeg,
        ingredients: ingArray,
        calories: Number(formData.calories),
      })
    } else {
      addMenuItem({
        restaurantId: currentRestaurant.id,
        name: formData.name,
        subtitle: formData.subtitle,
        category: formData.category,
        description: formData.description,
        price: Number(formData.price),
        image: formData.image,
        prepTimeMinutes: Number(formData.prepTimeMinutes),
        rating: 4.8,
        reviewCount: 1,
        isVeg: formData.isVeg,
        ingredients: ingArray,
        calories: Number(formData.calories),
        isAvailable: true,
      })
    }

    setDishModalOpen(false)
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl p-6 sm:p-8 border border-[#e7dfd5] shadow-xs">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f4ede4] text-[#c96342] text-xs font-semibold mb-2">
            <UtensilsCrossed className="w-3.5 h-3.5" />
            <span>Digital Menu Management</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1c1917]">
            Menu Catalog & Pricing
          </h1>
          <p className="text-xs text-[#78716c] mt-0.5">
            Configure dishes, prices, prep times, and immediate 86/availability toggles
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#c96342] hover:bg-[#a84d31] text-white text-xs font-semibold transition-all shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Dish</span>
        </button>
      </div>

      {/* Categories & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Category Pill Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => setSelectedCategory(c.key)}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === c.key
                  ? "bg-[#c96342] text-white shadow-2xs font-semibold"
                  : "bg-white text-[#78716c] border border-[#e7dfd5] hover:border-[#c96342]/40 hover:text-[#1c1917]"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#78716c]" />
          <input
            type="text"
            placeholder="Search menu items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 pr-3 py-2 rounded-full bg-white border border-[#e7dfd5] text-xs text-[#1c1917] placeholder:text-[#a8a29e] focus:outline-none focus:border-[#c96342] w-full sm:w-64 shadow-2xs"
          />
        </div>
      </div>

      {/* Menu Dishes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((dish) => (
          <div
            key={dish.id}
            className={`bg-white rounded-3xl border transition-all shadow-xs overflow-hidden flex flex-col justify-between ${
              !dish.isAvailable ? "opacity-60 border-rose-200" : "border-[#e7dfd5]"
            }`}
          >
            <div>
              {/* Dish Photo & Badges */}
              <div className="relative h-44 w-full bg-[#f4ede4] overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                      dish.isVeg
                        ? "bg-emerald-600 text-white"
                        : "bg-stone-800 text-stone-200"
                    }`}
                  >
                    {dish.isVeg ? "Veg" : "Non-Veg"}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/90 backdrop-blur-xs text-[#1c1917] capitalize">
                    {dish.category}
                  </span>
                </div>

                <div className="absolute top-3 right-3">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold shadow-xs ${
                      dish.isAvailable
                        ? "bg-emerald-500 text-white"
                        : "bg-rose-500 text-white"
                    }`}
                  >
                    {dish.isAvailable ? "Available" : "Sold Out (86'd)"}
                  </span>
                </div>
              </div>

              {/* Dish Info */}
              <div className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-serif text-base font-bold text-[#1c1917] leading-snug">
                      {dish.name}
                    </h3>
                    {dish.subtitle && (
                      <p className="text-xs text-[#c96342] font-medium">{dish.subtitle}</p>
                    )}
                  </div>
                  <span className="font-serif text-base font-bold text-[#1c1917]">
                    ₹{dish.price}
                  </span>
                </div>

                <p className="text-xs text-[#78716c] line-clamp-2">
                  {dish.description}
                </p>

                <div className="flex items-center gap-4 text-[11px] text-[#78716c]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#c96342]" />
                    {dish.prepTimeMinutes} mins
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    {dish.rating} ({dish.reviewCount})
                  </span>
                </div>

                {/* Ingredients Tags */}
                <div className="pt-2 flex flex-wrap gap-1">
                  {dish.ingredients.map((ing, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-[#faf7f2] border border-[#e7dfd5] text-[#57534e]"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="p-4 bg-[#faf7f2] border-t border-[#e7dfd5] flex items-center justify-between">
              {/* Availability Toggle */}
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-[#1c1917]">
                <input
                  type="checkbox"
                  checked={dish.isAvailable}
                  onChange={() => toggleDishAvailability(dish.id)}
                  className="rounded text-[#c96342] focus:ring-[#c96342] w-4 h-4 cursor-pointer"
                />
                <span>Active on Storefront</span>
              </label>

              {/* Action Buttons */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => openEditModal(dish)}
                  className="p-1.5 rounded-lg text-[#78716c] hover:bg-white hover:text-[#1c1917] transition-all"
                  title="Edit dish"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => deleteMenuItem(dish.id)}
                  className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-all"
                  title="Delete dish"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Dish Modal */}
      {dishModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setDishModalOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />
          <div className="relative w-full max-w-lg bg-white rounded-3xl border border-[#e7dfd5] p-6 sm:p-8 space-y-5 z-10 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#e7dfd5] pb-4">
              <h3 className="font-serif text-xl font-bold text-[#1c1917]">
                {editingDish ? "Edit Menu Dish" : "Add New Dish to Menu"}
              </h3>
              <button
                onClick={() => setDishModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#faf7f2] flex items-center justify-center text-[#78716c]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveDish} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#1c1917] mb-1">
                  Dish Title *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Char-Grilled Prime Ribeye"
                  className="w-full px-3 py-2 rounded-xl bg-[#faf7f2] border border-[#e7dfd5] text-[#1c1917] focus:outline-none focus:border-[#c96342]"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-[#1c1917] mb-1">
                  Subtitle / Cut Details
                </label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="e.g. Dry-Aged Prime Steak"
                  className="w-full px-3 py-2 rounded-xl bg-[#faf7f2] border border-[#e7dfd5] text-[#1c1917] focus:outline-none focus:border-[#c96342]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#1c1917] mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value as any })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[#faf7f2] border border-[#e7dfd5] text-[#1c1917] focus:outline-none focus:border-[#c96342]"
                  >
                    <option value="specials">Chef&apos;s Specials</option>
                    <option value="starters">Starters & Small Plates</option>
                    <option value="mains">Mains & Hearth</option>
                    <option value="desserts">Desserts</option>
                    <option value="beverages">Beverages</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#1c1917] mb-1">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-[#faf7f2] border border-[#e7dfd5] text-[#1c1917] focus:outline-none focus:border-[#c96342]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#1c1917] mb-1">
                    Prep Time (Minutes)
                  </label>
                  <input
                    type="number"
                    value={formData.prepTimeMinutes}
                    onChange={(e) =>
                      setFormData({ ...formData, prepTimeMinutes: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[#faf7f2] border border-[#e7dfd5] text-[#1c1917] focus:outline-none focus:border-[#c96342]"
                  />
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="isVegCheckbox"
                    checked={formData.isVeg}
                    onChange={(e) => setFormData({ ...formData, isVeg: e.target.checked })}
                    className="rounded text-[#c96342] focus:ring-[#c96342] w-4 h-4"
                  />
                  <label htmlFor="isVegCheckbox" className="font-semibold text-[#1c1917]">
                    Vegetarian / Plant-Based
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#1c1917] mb-1">
                  Ingredients (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.ingredients}
                  onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                  placeholder="Prime Ribeye, Truffle Butter, Confit Garlic"
                  className="w-full px-3 py-2 rounded-xl bg-[#faf7f2] border border-[#e7dfd5] text-[#1c1917] focus:outline-none focus:border-[#c96342]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#1c1917] mb-1">
                  Dish Photo Image URL
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-xl bg-[#faf7f2] border border-[#e7dfd5] text-[#1c1917] focus:outline-none focus:border-[#c96342]"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-[#1c1917] mb-1">
                  Menu Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the flavors, cut, and presentation..."
                  className="w-full px-3 py-2 rounded-xl bg-[#faf7f2] border border-[#e7dfd5] text-[#1c1917] focus:outline-none focus:border-[#c96342]"
                  required
                />
              </div>

              <div className="pt-3 border-t border-[#e7dfd5] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setDishModalOpen(false)}
                  className="px-4 py-2 rounded-full text-[#78716c] hover:bg-[#faf7f2]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-[#c96342] hover:bg-[#a84d31] text-white font-semibold shadow-xs"
                >
                  {editingDish ? "Save Changes" : "Publish Dish"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
