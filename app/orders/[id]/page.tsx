"use client"

import React, { useMemo, Suspense } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import CustomerNavbar from "@/components/customer/CustomerNavbar"
import CustomerCartDrawer from "@/components/customer/CustomerCartDrawer"
import Footer from "@/components/Footer"
import { useDineFlow } from "@/context/DineFlowContext"
import {
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Flame,
  ArrowLeft,
  ShoppingBag,
  Sparkles,
  ChefHat,
  PackageCheck,
  CheckCheck,
} from "lucide-react"

function OrderTrackingContent() {
  const params = useParams()
  const orderId = params?.id as string
  const router = useRouter()

  const { orders, updateOrderStatus } = useDineFlow()

  const order = useMemo(() => {
    return orders.find((o) => o.id === orderId) || orders[0]
  }, [orders, orderId])

  if (!order) {
    return (
      <div className="min-h-screen bg-[#faf7f2] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-serif text-2xl font-bold text-[#1c1917]">Order Not Found</h2>
        <Link href="/orders" className="mt-4 px-5 py-2.5 rounded-full bg-[#c96342] text-white text-xs font-semibold">
          Return to Orders
        </Link>
      </div>
    )
  }

  // 5 Step tracker definition
  const steps = [
    { key: "new", label: "Ticket Received", sublabel: "Order logged into kitchen queue", icon: <Clock className="w-4 h-4" /> },
    { key: "confirmed", label: "Brigade Confirmed", sublabel: "Ingredients pulled & ticket fired", icon: <Sparkles className="w-4 h-4" /> },
    { key: "preparing", label: "Firing on Hearth", sublabel: "Cooking in progress", icon: <Flame className="w-4 h-4" /> },
    { key: "ready", label: "Ready at Pass", sublabel: "Plated & packaged for pickup", icon: <PackageCheck className="w-4 h-4" /> },
    { key: "completed", label: "Completed", sublabel: "Enjoy your culinary meal", icon: <CheckCheck className="w-4 h-4" /> },
  ]

  const getStepIndex = (status: string) => {
    switch (status) {
      case "new":
        return 0
      case "preparing":
        return 2
      case "ready":
        return 3
      case "completed":
        return 4
      default:
        return 0
    }
  }

  const currentStepIdx = getStepIndex(order.status)

  return (
    <div className="min-h-screen bg-[#faf7f2] flex flex-col">
      <CustomerNavbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8">
        {/* Back Link */}
        <Link
          href="/orders"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#57534e] hover:text-[#1c1917] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Orders</span>
        </Link>

        {/* Live Status Hero Card */}
        <div className="bg-white rounded-3xl border border-[#e7dfd5] p-6 sm:p-10 shadow-xs relative overflow-hidden space-y-8">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#c96342]/8 blur-3xl pointer-events-none" />

          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#e7dfd5]/80">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2e7d32] animate-pulse" />
                <span className="text-xs uppercase tracking-wider font-bold text-[#c96342]">
                  LIVE KITCHEN DISPATCH
                </span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1c1917] mt-1">
                Order #{order.orderNumber}
              </h1>
              <p className="text-xs text-[#78716c] mt-0.5">
                {order.restaurantName} • Placed today at {order.orderTime}
              </p>
            </div>

            <div className="bg-[#f4ede4] px-4 py-2.5 rounded-2xl text-right">
              <span className="text-[10.5px] uppercase tracking-wider font-semibold text-[#78716c] block">
                Target Pickup Time
              </span>
              <span className="font-serif text-lg font-bold text-[#c96342]">
                {order.pickupSlot || order.promisedTime}
              </span>
            </div>
          </div>

          {/* 5-Step Visual Progress Tracker */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-[#78716c]">
              Preparation Progress
            </h3>

            <div className="relative">
              {/* Connected Track */}
              <div className="hidden md:block absolute top-1/2 -translate-y-1/2 left-6 right-6 h-1 bg-[#f4ede4] rounded-full z-0">
                <div
                  className="h-full bg-[#c96342] transition-all duration-500 rounded-full"
                  style={{
                    width: `${Math.min(100, (currentStepIdx / (steps.length - 1)) * 100)}%`,
                  }}
                />
              </div>

              {/* Steps row */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10">
                {steps.map((step, idx) => {
                  const isDone = idx <= currentStepIdx
                  const isCurrent = idx === currentStepIdx
                  return (
                    <div
                      key={step.key}
                      className={`p-3.5 rounded-2xl border transition-all text-left md:text-center flex md:flex-col items-center gap-3 ${
                        isCurrent
                          ? "bg-[#c96342] text-white border-[#c96342] shadow-xs"
                          : isDone
                          ? "bg-white border-[#e7dfd5] text-[#1c1917]"
                          : "bg-white/60 border-dashed border-[#e7dfd5] text-[#a8a29e]"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          isCurrent
                            ? "bg-white text-[#c96342]"
                            : isDone
                            ? "bg-[#2e7d32]/10 text-[#2e7d32]"
                            : "bg-[#f4ede4] text-[#a8a29e]"
                        }`}
                      >
                        {isDone && !isCurrent ? <CheckCircle2 className="w-4 h-4" /> : step.icon}
                      </div>

                      <div className="min-w-0">
                        <div className="text-xs font-bold leading-tight truncate">
                          {step.label}
                        </div>
                        <div
                          className={`text-[10px] mt-0.5 line-clamp-1 ${
                            isCurrent ? "text-white/80" : "text-[#78716c]"
                          }`}
                        >
                          {step.sublabel}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Real-time Demo State Advance Switcher */}
          <div className="p-4 rounded-2xl bg-[#faf7f2] border border-[#e7dfd5] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <ChefHat className="w-4 h-4 text-[#c96342]" />
              <span className="text-[#57534e]">
                Demo Simulator: Change status as Restaurant Staff:
              </span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                onClick={() => updateOrderStatus(order.id, "preparing")}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  order.status === "preparing"
                    ? "bg-[#c96342] text-white"
                    : "bg-white border border-[#e7dfd5] text-[#57534e] hover:bg-[#f4ede4]"
                }`}
              >
                Start Cooking
              </button>
              <button
                onClick={() => updateOrderStatus(order.id, "ready")}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  order.status === "ready"
                    ? "bg-[#2e7d32] text-white"
                    : "bg-white border border-[#e7dfd5] text-[#57534e] hover:bg-[#f4ede4]"
                }`}
              >
                Mark Ready
              </button>
              <button
                onClick={() => updateOrderStatus(order.id, "completed")}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  order.status === "completed"
                    ? "bg-[#1c1917] text-white"
                    : "bg-white border border-[#e7dfd5] text-[#57534e] hover:bg-[#f4ede4]"
                }`}
              >
                Mark Collected
              </button>
            </div>
          </div>

          {/* Ticket Items Breakdown */}
          <div className="space-y-4 pt-4 border-t border-[#e7dfd5]/80">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-[#78716c]">
              Ticket Items Breakdown
            </h3>
            <div className="space-y-2.5">
              {order.items.map((ci, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-2xl bg-[#faf7f2] border border-[#e7dfd5]/70 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-md bg-white border border-[#e7dfd5] flex items-center justify-center font-bold text-[#1c1917]">
                      {ci.quantity}
                    </span>
                    <div>
                      <span className="font-semibold text-[#1c1917] block">
                        {ci.item.name}
                      </span>
                      {ci.instructions && (
                        <span className="text-[11px] text-[#c96342] italic">
                          Special note: {ci.instructions}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="font-semibold text-[#1c1917]">
                    ₹{ci.item.price * ci.quantity}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-between items-center text-xs text-[#78716c]">
              <span>Order Total (Includes packaging & taxes):</span>
              <span className="font-bold text-base text-[#1c1917]">₹{order.total}</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <CustomerCartDrawer />
    </div>
  )
}

export default function OrderTrackingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#faf7f2] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#c96342] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <OrderTrackingContent />
    </Suspense>
  )
}
