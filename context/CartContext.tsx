"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { MenuItem } from "@/data/menuData"

export interface CartItem {
  item: MenuItem
  quantity: number
  instructions?: string
}

export interface PlacedOrder {
  orderId: string
  items: CartItem[]
  diningOption: "dine-in" | "takeaway"
  tableNumber?: string
  pickupTime?: string
  subtotal: number
  tax: number
  total: number
  placedAt: Date
  estimatedMinutes: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: MenuItem, quantity?: number) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, delta: number) => void
  clearCart: () => void
  getItemQuantity: (itemId: string) => number
  totalItems: number
  subtotal: number
  tax: number
  totalPrice: number
  isCartOpen: boolean
  setIsCartOpen: (open: boolean) => void
  diningOption: "dine-in" | "takeaway"
  setDiningOption: (opt: "dine-in" | "takeaway") => void
  tableNumber: string
  setTableNumber: (table: string) => void
  pickupTime: string
  setPickupTime: (time: string) => void
  placedOrder: PlacedOrder | null
  placeOrder: () => PlacedOrder
  resetOrder: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [diningOption, setDiningOption] = useState<"dine-in" | "takeaway">("dine-in")
  const [tableNumber, setTableNumber] = useState("Table 4")
  const [pickupTime, setPickupTime] = useState("In 15 Mins (Fastest)")
  const [placedOrder, setPlacedOrder] = useState<PlacedOrder | null>(null)

  const addItem = (item: MenuItem, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((ci) => ci.item.id === item.id)
      if (existing) {
        return prev.map((ci) =>
          ci.item.id === item.id ? { ...ci, quantity: ci.quantity + quantity } : ci
        )
      }
      return [...prev, { item, quantity }]
    })
  }

  const removeItem = (itemId: string) => {
    setItems((prev) => prev.filter((ci) => ci.item.id !== itemId))
  }

  const updateQuantity = (itemId: string, delta: number) => {
    setItems((prev) => {
      return prev
        .map((ci) => {
          if (ci.item.id === itemId) {
            const newQty = ci.quantity + delta
            return newQty > 0 ? { ...ci, quantity: newQty } : null
          }
          return ci
        })
        .filter(Boolean) as CartItem[]
    })
  }

  const clearCart = () => {
    setItems([])
  }

  const getItemQuantity = (itemId: string): number => {
    const found = items.find((ci) => ci.item.id === itemId)
    return found ? found.quantity : 0
  }

  const totalItems = items.reduce((sum, ci) => sum + ci.quantity, 0)
  const subtotal = items.reduce((sum, ci) => sum + ci.item.price * ci.quantity, 0)
  const tax = Math.round(subtotal * 0.05)
  const totalPrice = subtotal + tax

  const placeOrder = (): PlacedOrder => {
    const randomNum = Math.floor(100 + Math.random() * 900)
    const orderNumber = diningOption === "dine-in" 
      ? `T${tableNumber.replace(/[^0-9]/g, "") || "4"}-${randomNum}`
      : `EXPRESS-${randomNum}`

    const newOrder: PlacedOrder = {
      orderId: orderNumber,
      items: [...items],
      diningOption,
      tableNumber: diningOption === "dine-in" ? tableNumber : undefined,
      pickupTime: diningOption === "takeaway" ? pickupTime : undefined,
      subtotal,
      tax,
      total: totalPrice,
      placedAt: new Date(),
      estimatedMinutes: diningOption === "takeaway" ? 15 : 12,
    }

    setPlacedOrder(newOrder)
    setItems([])
    return newOrder
  }

  const resetOrder = () => {
    setPlacedOrder(null)
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getItemQuantity,
        totalItems,
        subtotal,
        tax,
        totalPrice,
        isCartOpen,
        setIsCartOpen,
        diningOption,
        setDiningOption,
        tableNumber,
        setTableNumber,
        pickupTime,
        setPickupTime,
        placedOrder,
        placeOrder,
        resetOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
