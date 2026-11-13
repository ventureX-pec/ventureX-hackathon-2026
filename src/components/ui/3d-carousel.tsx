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

// Curated high-resolution Unsplash food & restaurant stock images
const foodImages = [
  "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80", // Paneer Bowl
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80", // Burger
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80", // Pizza
  "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80", // Cold Coffee
  "https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=600&q=80", // Loaded Fries
  "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=600&q=80", // BBQ Chicken Bowl
  "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80", // Wrap
  "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80", // Hakka Noodles
  "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=600&q=80", // Momos
  "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80", // Brownie Sundae
]

const duration = 0.15
const transition = { duration, ease: [0.32, 0.72, 0, 1] as const, filter: "blur(4px)" }
const transitionOverlay = { duration: 0.5, ease: [0.32, 0.72, 0, 1] as const }

const Carousel = memo(
  ({
    handleClick,
    controls,
    cards,
    isCarouselActive,
    scrollRotation,
  }: {
    handleClick: (imgUrl: string, index: number) => void
    controls: any
    cards: string[]
    isCarouselActive: boolean
    scrollRotation: any
  }) => {
    const isScreenSizeSm = useMediaQuery("(max-width: 640px)")
    const cylinderWidth = isScreenSizeSm ? 1300 : 2200
    const faceCount = cards.length
    const faceWidth = cylinderWidth / faceCount
    const radius = cylinderWidth / (2 * Math.PI)
    
    // Drag rotation offset
    const dragOffset = useMotionValue(0)

    // Combined rotation: scroll progress + user drag
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
          perspective: "1200px",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        <motion.div
          drag={isCarouselActive ? "x" : false}
          className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
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
          {cards.map((imgUrl, i) => (
            <motion.div
              key={`key-${imgUrl}-${i}`}
              className="absolute flex h-full origin-center items-center justify-center rounded-3xl bg-white p-2.5 shadow-card border border-[#ECE7DE] hover:border-[#D66B43]/50 transition-colors"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${
                  i * (360 / faceCount)
                }deg) translateZ(${radius}px)`,
              }}
              onClick={() => handleClick(imgUrl, i)}
            >
              <motion.img
                src={imgUrl}
                alt={`Culinary plate ${i + 1}`}
                layoutId={`img-${imgUrl}`}
                className="pointer-events-none w-full rounded-2xl object-cover aspect-square shadow-xs"
                initial={{ filter: "blur(4px)" }}
                layout="position"
                animate={{ filter: "blur(0px)" }}
                transition={transition}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    )
  }
)

Carousel.displayName = "Carousel"

function ThreeDPhotoCarousel({
  images,
  scrollContainerRef,
}: {
  images?: string[]
  scrollContainerRef?: React.RefObject<HTMLDivElement | null>
}) {
  const [activeImg, setActiveImg] = useState<string | null>(null)
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
    stiffness: 120,
    mass: 0.1,
  })

  // Maps scroll progress across 0 -> 1 into -70deg to +120deg rotation
  const scrollRotation = useTransform(smoothScroll, [0, 1], [-60, 130])

  const cards = useMemo(
    () => (images && images.length > 0 ? images : foodImages),
    [images]
  )

  const handleClick = (imgUrl: string) => {
    setActiveImg(imgUrl)
    setIsCarouselActive(false)
    controls.stop()
  }

  const handleClose = () => {
    setActiveImg(null)
    setIsCarouselActive(true)
  }

  return (
    <div ref={internalRef} className="relative w-full overflow-hidden select-none">
      {/* Lightbox Overlay */}
      <AnimatePresence mode="sync">
        {activeImg && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            layoutId={`img-container-${activeImg}`}
            layout="position"
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 sm:p-10 cursor-pointer"
            style={{ willChange: "opacity" }}
            transition={transitionOverlay}
          >
            <motion.img
              layoutId={`img-${activeImg}`}
              src={activeImg}
              className="max-w-[92vw] max-h-[82vh] rounded-3xl shadow-2xl object-contain border border-white/20"
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.15,
                duration: 0.4,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              style={{
                willChange: "transform",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edge Gradient Blends to make the cylinder look infinite across the full screen */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-36 bg-gradient-to-r from-[#FAF8F3] via-[#FAF8F3]/70 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-36 bg-gradient-to-l from-[#FAF8F3] via-[#FAF8F3]/70 to-transparent z-10" />

      {/* Full-width 3D viewport */}
      <div className="relative h-[480px] sm:h-[580px] w-full overflow-hidden flex items-center justify-center">
        <Carousel
          handleClick={handleClick}
          controls={controls}
          cards={cards}
          isCarouselActive={isCarouselActive}
          scrollRotation={scrollRotation}
        />
      </div>
    </div>
  )
}

export { ThreeDPhotoCarousel }
