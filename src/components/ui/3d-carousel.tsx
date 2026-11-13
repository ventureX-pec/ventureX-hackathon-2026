"use client"

import { memo, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import {
  AnimatePresence,
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
  useScroll,
  useSpring,
} from "motion/react"
import { Clock, ArrowRight, X, Sparkles } from "lucide-react"

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect

type UseMediaQueryOptions = {
  defaultValue?: boolean
  initializeWithValue?: boolean
}

const IS_SERVER = typeof window === "undefined"

export function useMediaQuery(
  query: string,
  {
    defaultValue = false,
    initializeWithValue = true,
  }: UseMediaQueryOptions = {}
): boolean {
  const getMatches = (query: string): boolean => {
    if (IS_SERVER) {
      return defaultValue
    }
    return window.matchMedia(query).matches
  }

  const [matches, setMatches] = useState<boolean>(() => {
    if (initializeWithValue) {
      return getMatches(query)
    }
    return defaultValue
  })

  const handleChange = () => {
    setMatches(getMatches(query))
  }

  useIsomorphicLayoutEffect(() => {
    const matchMedia = window.matchMedia(query)
    handleChange()

    matchMedia.addEventListener("change", handleChange)

    return () => {
      matchMedia.removeEventListener("change", handleChange)
    }
  }, [query])

  return matches
}

export interface CulinaryDish {
  id: string
  name: string
  restaurant: string
  category: string
  prepTime: string
  price: string
  tag: string
  image: string
  description: string
}

// 8 verified high-resolution restaurant dish photos in the warm DineFlow aesthetic
export const curatedDishes: CulinaryDish[] = [
  {
    id: "dish-1",
    name: "Double Truffle Smash Burger",
    restaurant: "The Burger Club",
    category: "Gourmet Burgers",
    prepTime: "8 mins",
    price: "₹249",
    tag: "Best Seller",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    description: "Double smash patty, melted aged cheddar, caramelized shallots, and house truffle aioli on toasted brioche.",
  },
  {
    id: "dish-2",
    name: "Woodfired Margherita Pizza",
    restaurant: "Oven & Hearth",
    category: "Neapolitan Pizza",
    prepTime: "12 mins",
    price: "₹299",
    tag: "Chef Special",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
    description: "Slow-fermented sourdough crust, San Marzano tomato pomodoro, fresh fior di latte, and torn sweet basil.",
  },
  {
    id: "dish-3",
    name: "Iced Hazelnut Cold Coffee",
    restaurant: "Campus Roasters",
    category: "Artisan Coffee",
    prepTime: "3 mins",
    price: "₹159",
    tag: "Quick Grab",
    image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80",
    description: "Slow-steeped Arabica cold brew blended with hazelnut syrup and creamy oat milk over crystal clear craft ice.",
  },
  {
    id: "dish-4",
    name: "Royal Dum Biryani & Raita",
    restaurant: "Nawaabi Kitchen",
    category: "Indian Specialties",
    prepTime: "10 mins",
    price: "₹280",
    tag: "Top Rated",
    image: "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=800&q=80",
    description: "Fragrant long-grain aged basmati layered with marinated cottage cheese, saffron, fried onions, and cooling mint raita.",
  },
  {
    id: "dish-5",
    name: "Loaded Peri-Peri Truffle Fries",
    restaurant: "Fry Lab",
    category: "Sides & Bites",
    prepTime: "6 mins",
    price: "₹149",
    tag: "Crispy & Hot",
    image: "https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=800&q=80",
    description: "Double-cooked crispy golden wedges dusted in hot peri-peri spice and drizzled with smoked jalapeno queso.",
  },
  {
    id: "dish-6",
    name: "Warm Belgian Fudge Brownie",
    restaurant: "The Crumb Co.",
    category: "Bakehouse",
    prepTime: "4 mins",
    price: "₹179",
    tag: "Decadent",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
    description: "Rich 70% dark Belgian cocoa fudge brownie, served warm with molten chocolate drizzle and crushed hazelnut crumble.",
  },
  {
    id: "dish-7",
    name: "Smoked BBQ Paneer Wrap",
    restaurant: "Roll & Bowl",
    category: "Wraps & Rolls",
    prepTime: "7 mins",
    price: "₹189",
    tag: "Grab & Go",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80",
    description: "Charred tandoori paneer cubes wrapped in whole-wheat paratha with mint coriander chutney and crunchy peppers.",
  },
  {
    id: "dish-8",
    name: "Wok-Tossed Hakka Noodles",
    restaurant: "Wok Nation",
    category: "Asian Street",
    prepTime: "9 mins",
    price: "₹199",
    tag: "Spicy & Fresh",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80",
    description: "Hand-pulled egg-free noodles wok-tossed on high flame with scallions, bell peppers, garlic, and dark soy.",
  },
]

const duration = 0.2
const transition = { duration, ease: [0.32, 0.72, 0, 1] as const }

const Carousel = memo(
  ({
    handleClick,
    controls,
    dishes,
    isCarouselActive,
    scrollRotation,
  }: {
    handleClick: (dish: CulinaryDish, index: number) => void
    controls: any
    dishes: CulinaryDish[]
    isCarouselActive: boolean
    scrollRotation: any
  }) => {
    const isScreenSizeSm = useMediaQuery("(max-width: 640px)")
    const isScreenSizeMd = useMediaQuery("(max-width: 1024px)")

    // Generous, large card dimensions to properly fill screen space
    const faceWidth = isScreenSizeSm ? 270 : isScreenSizeMd ? 330 : 370
    const cardHeight = isScreenSizeSm ? 380 : isScreenSizeMd ? 450 : 500

    const faceCount = dishes.length
    const cylinderWidth = faceWidth * faceCount
    const radius = cylinderWidth / (2 * Math.PI)

    // User drag offset
    const dragOffset = useMotionValue(0)

    // Combined rotation: scroll progress + interactive drag
    const totalRotation = useTransform(
      [scrollRotation, dragOffset],
      ([scroll, drag]: any[]) => (scroll || 0) + (drag || 0)
    )

    const transform = useTransform(
      totalRotation,
      (value) => `rotate3d(0, 1, 0, ${value}deg)`
    )

    return (
      <div
        className="flex h-full items-center justify-center w-full"
        style={{
          perspective: "1400px",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        <motion.div
          drag={isCarouselActive ? "x" : false}
          className="relative flex h-full origin-center cursor-grab justify-center items-center active:cursor-grabbing"
          style={{
            transform,
            rotateY: totalRotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          onDrag={(_, info) =>
            isCarouselActive &&
            dragOffset.set(dragOffset.get() + info.offset.x * 0.05)
          }
          onDragEnd={(_, info) =>
            isCarouselActive &&
            controls.start({
              rotateY: totalRotation.get() + info.velocity.x * 0.05,
              transition: {
                type: "spring",
                stiffness: 100,
                damping: 30,
                mass: 0.1,
              },
            })
          }
          animate={controls}
        >
          {dishes.map((dish, i) => (
            <motion.div
              key={dish.id}
              className="absolute origin-center rounded-3xl overflow-hidden cursor-pointer shadow-[0_20px_50px_rgba(37,37,34,0.16)] border border-[#ECE7DE] hover:border-[#D66B43] hover:shadow-[0_28px_65px_rgba(214,107,67,0.3)] transition-all duration-300 group"
              style={{
                width: `${faceWidth}px`,
                height: `${cardHeight}px`,
                transform: `rotateY(${
                  i * (360 / faceCount)
                }deg) translateZ(${radius}px)`,
              }}
              onClick={() => handleClick(dish, i)}
            >
              {/* Photo fills 100% of the card - NO white border or empty white pillar */}
              <motion.img
                src={dish.image}
                alt={dish.name}
                className="pointer-events-none w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                initial={{ filter: "blur(4px)" }}
                animate={{ filter: "blur(0px)" }}
                transition={transition}
              />

              {/* Editorial DineFlow overlay integrated directly with the dish */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none flex flex-col justify-between p-5 sm:p-6">
                {/* Top Badges */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#FAF8F3]/95 text-[#252522] backdrop-blur-md shadow-xs">
                    {dish.tag}
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#D66B43] text-white shadow-xs flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {dish.prepTime}
                  </span>
                </div>

                {/* Bottom Details */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs text-white/80 font-medium">
                    <span>{dish.restaurant}</span>
                    <span>•</span>
                    <span className="text-white/60">{dish.category}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight">
                    {dish.name}
                  </h3>

                  <div className="flex items-center justify-between pt-2.5 border-t border-white/20">
                    <span className="text-lg font-black text-white">{dish.price}</span>
                    <span className="text-xs font-semibold text-white/90 group-hover:text-[#D66B43] group-hover:translate-x-1 transition-all flex items-center gap-1">
                      Order Ahead
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    )
  }
)

Carousel.displayName = "Carousel"

function ThreeDPhotoCarousel({
  dishes = curatedDishes,
  scrollContainerRef,
}: {
  dishes?: CulinaryDish[]
  scrollContainerRef?: React.RefObject<HTMLDivElement | null>
}) {
  const [activeDish, setActiveDish] = useState<CulinaryDish | null>(null)
  const [isCarouselActive, setIsCarouselActive] = useState(true)
  const controls = useAnimation()
  const internalRef = useRef<HTMLDivElement>(null)
  const targetRef = scrollContainerRef || internalRef

  // Synchronize cylinder rotation with page scroll!
  const { scrollYProgress } = useScroll({
    target: targetRef as React.RefObject<HTMLDivElement>,
    offset: ["start end", "end start"],
  })

  // Smooth spring physics for scroll rotation
  const smoothScroll = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 90,
    mass: 0.1,
  })

  // Maps scroll progress across 0 -> 1 into -50deg to +130deg rotation
  const scrollRotation = useTransform(smoothScroll, [0, 1], [-50, 130])

  const handleClick = (dish: CulinaryDish) => {
    setActiveDish(dish)
    setIsCarouselActive(false)
    controls.stop()
  }

  const handleClose = () => {
    setActiveDish(null)
    setIsCarouselActive(true)
  }

  return (
    <div ref={internalRef} className="relative w-full overflow-hidden select-none">
      {/* Lightbox Modal on Dish Tap */}
      <AnimatePresence mode="sync">
        {activeDish && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/65 backdrop-blur-md flex items-center justify-center z-50 p-4 sm:p-8 cursor-pointer"
            transition={{ duration: 0.25 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: "spring", damping: 26, stiffness: 260 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-[#FAF8F3] rounded-3xl overflow-hidden shadow-2xl border border-[#ECE7DE] cursor-default"
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md transition-colors"
                aria-label="Close dish preview"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Image */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                <img
                  src={activeDish.image}
                  alt={activeDish.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-[#FAF8F3]/95 text-[#252522] backdrop-blur-md shadow-xs">
                    {activeDish.tag}
                  </span>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-[#D66B43] uppercase tracking-wider">
                      {activeDish.category}
                    </span>
                    <p className="text-sm text-[#6E6D66] font-medium">{activeDish.restaurant}</p>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EBF1ED] text-[#5F7A65] text-xs font-bold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{activeDish.prepTime} Prep</span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-[#252522] tracking-tight">
                  {activeDish.name}
                </h3>

                <p className="text-sm text-[#6E6D66] leading-relaxed">
                  {activeDish.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-[#ECE7DE]">
                  <div>
                    <span className="text-xs text-[#6E6D66] block">Express Campus Price</span>
                    <span className="text-2xl font-extrabold text-[#252522]">
                      {activeDish.price}
                    </span>
                  </div>
                  <a
                    href="#cta"
                    onClick={handleClose}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#D66B43] text-white text-sm font-semibold hover:bg-[#C25B34] transition-colors shadow-xs"
                  >
                    <span>Order Ahead</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edge Gradient Blends to seamlessly merge the cylinder into the ivory background */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-48 bg-gradient-to-r from-[#FAF8F3] via-[#FAF8F3]/80 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-48 bg-gradient-to-l from-[#FAF8F3] via-[#FAF8F3]/80 to-transparent z-10" />

      {/* Full-width 3D viewport with generous height for large cards */}
      <div className="relative h-[520px] sm:h-[620px] w-full overflow-hidden flex items-center justify-center">
        <Carousel
          handleClick={handleClick}
          controls={controls}
          dishes={dishes}
          isCarouselActive={isCarouselActive}
          scrollRotation={scrollRotation}
        />
      </div>
    </div>
  )
}

export { ThreeDPhotoCarousel }
