"use client"

import DishOrbitCarousel, { type Dish } from "@/components/ui/dish-orbit-carousel"

const SAMPLE_DISHES: Dish[] = [
  {
    title: "Char grill",
    subtitle: "Ribeye Steak",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop&q=80",
    eyebrow: "#1 Most loved dish",
    rating: 4.9,
    chef: "Chef Marcus Vance",
    kitchen: "Corner Café Kitchen",
    description: "Dry-aged prime ribeye chargrilled over hickory wood with truffle butter and rosemary sea salt.",
    likes: 342,
    ingredients: ["Prime Ribeye", "Truffle Butter", "Garlic", "Rosemary", "Sea Salt"],
    accent: "#e05638",
  },
  {
    title: "Mediterranean",
    subtitle: "Garden Salad",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=80",
    eyebrow: "#2 Healthy favorite",
    rating: 4.8,
    chef: "Chef Elena Gomez",
    kitchen: "Fresh Harvest Bar",
    description: "Crisp organic greens tossed with Kalamata olives, sheep's milk feta, cherry tomatoes and cold-pressed olive oil.",
    likes: 289,
    ingredients: ["Arugula", "Kalamata Olives", "Feta Cheese", "Heirloom Tomatoes", "Extra Virgin Olive Oil"],
    accent: "#38a169",
  },
  {
    title: "Pan seared",
    subtitle: "Wild Salmon",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500&auto=format&fit=crop&q=80",
    eyebrow: "#3 Chef's signature",
    rating: 4.9,
    chef: "Chef Kenji Sato",
    kitchen: "Seafood Atelier",
    description: "Crispy skin Atlantic salmon fillet served over lemon-herb risotto with asparagus spears.",
    likes: 415,
    ingredients: ["Wild Salmon", "Arborio Rice", "Lemon Zest", "Asparagus", "Dill"],
    accent: "#dd6b20",
  },
  {
    title: "Artisan",
    subtitle: "Avocado Toast",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=500&auto=format&fit=crop&q=80",
    eyebrow: "#4 Campus breakfast hit",
    rating: 4.7,
    chef: "Chef Maya Patel",
    kitchen: "Corner Café All-Day",
    description: "Sourdough toast layered with crushed Hass avocado, poached organic farm egg, and chili flakes.",
    likes: 520,
    ingredients: ["Sourdough", "Hass Avocado", "Poached Egg", "Microgreens", "Red Pepper Flakes"],
    accent: "#d69e2e",
  },
]

export default function Demo() {
  return (
    <main className="w-full min-h-screen bg-background">
      <DishOrbitCarousel
        dishes={SAMPLE_DISHES}
        onOrder={(dish, index) => {
          console.log(`Ordered: ${dish.title} ${dish.subtitle}`)
        }}
        onPlay={(dish, index) => {
          console.log(`Play dish: ${dish.title}`)
        }}
      />
    </main>
  )
}
