"use client"

import React, { useState } from "react"
import { useDineFlow, Ingredient } from "@/context/DineFlowContext"
import {
  Boxes,
  Plus,
  Search,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Link as LinkIcon,
  Sparkles,
  ArrowRight,
  X,
} from "lucide-react"

export default function InventoryManagementPage() {
  const {
    currentRestaurantIngredients,
    currentRestaurantMenuItems,
    currentRestaurant,
    updateIngredientStock,
    toggleIngredientAvailability,
    addIngredient,
  } = useDineFlow()

  const [searchQuery, setSearchQuery] = useState("")
  const [filterMode, setFilterMode] = useState<"all" | "low" | "out">("all")
  const [addModalOpen, setAddModalOpen] = useState(false)

  // Form state
  const [name, setName] = useState("")
  const [stock, setStock] = useState(10)
  const [unit, setUnit] = useState("kg")
  const [threshold, setThreshold] = useState(3)
  const [selectedDishes, setSelectedDishes] = useState<string[]>([])

  const filteredIngredients = currentRestaurantIngredients.filter((ing) => {
    const matchesSearch = ing.name.toLowerCase().includes(searchQuery.toLowerCase())
    const isLow = ing.currentStock <= ing.lowStockThreshold && ing.isAvailable
    const isOut = !ing.isAvailable || ing.currentStock <= 0

    if (filterMode === "low") return matchesSearch && isLow
    if (filterMode === "out") return matchesSearch && isOut
    return matchesSearch
  })

  const handleAddIngredient = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    addIngredient({
      restaurantId: currentRestaurant.id,
      name: name.trim(),
      currentStock: Number(stock),
      unit: unit.trim(),
      lowStockThreshold: Number(threshold),
      isAvailable: Number(stock) > 0,
      affectedDishIds: selectedDishes,
    })

    setName("")
    setSelectedDishes([])
    setAddModalOpen(false)
  }

  const toggleDishSelect = (dishId: string) => {
    setSelectedDishes((prev) =>
      prev.includes(dishId) ? prev.filter((id) => id !== dishId) : [...prev, dishId]
    )
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl p-6 sm:p-8 border border-[#e7dfd5] shadow-xs">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f4ede4] text-[#c96342] text-xs font-semibold mb-2">
            <Boxes className="w-3.5 h-3.5" />
            <span>Smart Inventory & Automated 86 System</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1c1917]">
            Ingredients & Stock Tracking
          </h1>
          <p className="text-xs text-[#78716c] mt-0.5">
            Marking an ingredient out of stock automatically disables its linked menu dishes on the customer portal
          </p>
        </div>

        <button
          onClick={() => setAddModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#c96342] hover:bg-[#a84d31] text-white text-xs font-semibold transition-all shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Track New Ingredient</span>
        </button>
      </div>

      {/* Automated Dependency Innovation Banner */}
      <div className="p-4 bg-orange-50 border border-orange-200 rounded-3xl flex items-start sm:items-center justify-between gap-4 text-xs text-orange-950 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-orange-200 flex items-center justify-center shrink-0">
            <LinkIcon className="w-4 h-4 text-[#c96342]" />
          </div>
          <div>
            <span className="font-bold">Zero-Disappointment Guarantee:</span> When an ingredient (e.g. Truffle Butter) hits 0, DineFlow immediately 86&apos;s all connected dishes so customers cannot order unavailable food.
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center bg-[#faf7f2] p-1 rounded-full border border-[#e7dfd5] text-xs">
          <button
            onClick={() => setFilterMode("all")}
            className={`px-3 py-1 rounded-full font-medium transition-all ${
              filterMode === "all" ? "bg-[#c96342] text-white" : "text-[#78716c]"
            }`}
          >
            All ({currentRestaurantIngredients.length})
          </button>
          <button
            onClick={() => setFilterMode("low")}
            className={`px-3 py-1 rounded-full font-medium transition-all ${
              filterMode === "low" ? "bg-[#c96342] text-white" : "text-[#78716c]"
            }`}
          >
            Low Stock Warnings
          </button>
          <button
            onClick={() => setFilterMode("out")}
            className={`px-3 py-1 rounded-full font-medium transition-all ${
              filterMode === "out" ? "bg-[#c96342] text-white" : "text-[#78716c]"
            }`}
          >
            Out of Stock / 86&apos;d
          </button>
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#78716c]" />
          <input
            type="text"
            placeholder="Search ingredient by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 pr-3 py-2 rounded-full bg-white border border-[#e7dfd5] text-xs text-[#1c1917] placeholder:text-[#a8a29e] focus:outline-none focus:border-[#c96342] w-full sm:w-64"
          />
        </div>
      </div>

      {/* Ingredients Table */}
      <div className="bg-white rounded-3xl border border-[#e7dfd5] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#e7dfd5] bg-[#faf7f2]/60 text-[11px] font-semibold uppercase tracking-wider text-[#78716c]">
                <th className="py-3 px-4">Ingredient</th>
                <th className="py-3 px-4">Current Stock</th>
                <th className="py-3 px-4">Threshold</th>
                <th className="py-3 px-4">Stock Status</th>
                <th className="py-3 px-4">Affected Dishes</th>
                <th className="py-3 px-4">Quick Stock Adjust</th>
                <th className="py-3 px-4 text-right">Availability Toggle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e7dfd5]">
              {filteredIngredients.map((item) => {
                const affectedDishes = currentRestaurantMenuItems.filter((d) =>
                  item.affectedDishIds.includes(d.id)
                )
                const isLow = item.currentStock <= item.lowStockThreshold
                const isOut = !item.isAvailable || item.currentStock <= 0

                return (
                  <tr key={item.id} className="hover:bg-[#faf7f2]/40 transition-colors">
                    <td className="py-4 px-4 font-semibold text-[#1c1917]">
                      {item.name}
                    </td>

                    <td className="py-4 px-4">
                      <span className="font-mono font-bold text-sm text-[#1c1917]">
                        {item.currentStock} {item.unit}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-[#78716c]">
                      {item.lowStockThreshold} {item.unit}
                    </td>

                    <td className="py-4 px-4">
                      {isOut ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-100 text-rose-700">
                          <XCircle className="w-3 h-3" />
                          <span>Out of Stock (86)</span>
                        </span>
                      ) : isLow ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800">
                          <AlertTriangle className="w-3 h-3" />
                          <span>Low Stock Warning</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>In Stock</span>
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-4">
                      {affectedDishes.length > 0 ? (
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {affectedDishes.map((d) => (
                            <span
                              key={d.id}
                              className={`text-[10px] px-2 py-0.5 rounded-md border ${
                                !item.isAvailable
                                  ? "bg-rose-50 border-rose-200 text-rose-700 line-through"
                                  : "bg-[#faf7f2] border-[#e7dfd5] text-[#57534e]"
                              }`}
                            >
                              {d.name}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-[11px] text-[#a8a29e] italic">No direct links</span>
                      )}
                    </td>

                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() =>
                            updateIngredientStock(item.id, Math.max(0, item.currentStock - 1))
                          }
                          className="w-7 h-7 rounded-lg bg-[#faf7f2] hover:bg-[#f4ede4] border border-[#e7dfd5] font-bold text-[#1c1917] flex items-center justify-center transition-all"
                        >
                          -1
                        </button>
                        <button
                          onClick={() =>
                            updateIngredientStock(item.id, item.currentStock + 5)
                          }
                          className="px-2.5 h-7 rounded-lg bg-[#faf7f2] hover:bg-[#f4ede4] border border-[#e7dfd5] font-semibold text-[#1c1917] flex items-center justify-center transition-all text-[11px]"
                        >
                          +5 {item.unit}
                        </button>
                      </div>
                    </td>

                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => toggleIngredientAvailability(item.id)}
                        className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all ${
                          item.isAvailable
                            ? "bg-stone-100 hover:bg-rose-100 text-stone-700 hover:text-rose-700"
                            : "bg-emerald-600 hover:bg-emerald-700 text-white"
                        }`}
                      >
                        {item.isAvailable ? "Mark 86 / Out" : "Restock & Re-enable"}
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Ingredient Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setAddModalOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />
          <div className="relative w-full max-w-md bg-white rounded-3xl border border-[#e7dfd5] p-6 space-y-5 z-10 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#e7dfd5] pb-3">
              <h3 className="font-serif text-xl font-bold text-[#1c1917]">
                Track New Ingredient
              </h3>
              <button
                onClick={() => setAddModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#faf7f2] flex items-center justify-center text-[#78716c]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddIngredient} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#1c1917] mb-1">
                  Ingredient Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Fresh Truffles, Burrata Cheese"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#faf7f2] border border-[#e7dfd5] text-[#1c1917] focus:outline-none focus:border-[#c96342]"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-semibold text-[#1c1917] mb-1">
                    Initial Stock
                  </label>
                  <input
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[#faf7f2] border border-[#e7dfd5] text-[#1c1917] focus:outline-none focus:border-[#c96342]"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#1c1917] mb-1">
                    Unit
                  </label>
                  <input
                    type="text"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    placeholder="kg, bottles, cuts"
                    className="w-full px-3 py-2 rounded-xl bg-[#faf7f2] border border-[#e7dfd5] text-[#1c1917] focus:outline-none focus:border-[#c96342]"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#1c1917] mb-1">
                    Alert Threshold
                  </label>
                  <input
                    type="number"
                    value={threshold}
                    onChange={(e) => setThreshold(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[#faf7f2] border border-[#e7dfd5] text-[#1c1917] focus:outline-none focus:border-[#c96342]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#1c1917] mb-1">
                  Connect Dishes (Auto-disable when stock depletes)
                </label>
                <div className="max-h-36 overflow-y-auto space-y-1.5 p-2 bg-[#faf7f2] rounded-xl border border-[#e7dfd5]">
                  {currentRestaurantMenuItems.map((dish) => {
                    const isChecked = selectedDishes.includes(dish.id)
                    return (
                      <div
                        key={dish.id}
                        onClick={() => toggleDishSelect(dish.id)}
                        className={`p-2 rounded-lg cursor-pointer flex items-center justify-between transition-all ${
                          isChecked
                            ? "bg-[#c96342] text-white font-semibold"
                            : "hover:bg-white text-[#1c1917]"
                        }`}
                      >
                        <span>{dish.name}</span>
                        <span className="text-[10px]">{dish.category}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="px-4 py-2 rounded-full text-[#78716c] hover:bg-[#faf7f2]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#c96342] hover:bg-[#a84d31] text-white font-semibold shadow-xs"
                >
                  Add Ingredient
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
