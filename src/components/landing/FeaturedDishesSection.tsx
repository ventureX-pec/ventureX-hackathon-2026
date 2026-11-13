"use client";

import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Sparkles, Utensils } from "lucide-react";

interface FeaturedDish {
  id: string;
  name: string;
  restaurant: string;
  category: string;
  badge?: string;
  price: string;
  description: string;
  image: string;
  colSpan: string;
  imageHeight: string;
}

const featuredDishes: FeaturedDish[] = [
  {
    id: "dish-1",
    name: "Truffle Melt Double Smash Burger",
    restaurant: "The Burger Club",
    category: "Gourmet Burgers",
    badge: "Campus Bestseller",
    price: "₹249",
    description:
      "Double seared patties layered with melted aged cheddar, caramelized balsamic onions, and house truffle aioli on toasted brioche.",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=80",
    colSpan: "lg:col-span-7",
    imageHeight: "h-64 sm:h-80 lg:h-96",
  },
  {
    id: "dish-2",
    name: "Artisanal Woodfired Margherita",
    restaurant: "Oven & Hearth",
    category: "Neapolitan Pizza",
    badge: "Chef's Special",
    price: "₹299",
    description:
      "Slow-fermented sourdough crust topped with San Marzano pomodoro, fresh torn fior di latte, and aromatic sweet basil.",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
    colSpan: "lg:col-span-5",
    imageHeight: "h-64 sm:h-80 lg:h-96",
  },
  {
    id: "dish-3",
    name: "Iced Hazelnut Cold Coffee",
    restaurant: "Campus Roasters",
    category: "Artisan Coffee",
    badge: "Quick Grab",
    price: "₹159",
    description:
      "Slow-steeped Arabica cold brew shaken with roasted hazelnut syrup and oat milk over crystal craft ice.",
    image:
      "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80",
    colSpan: "lg:col-span-4",
    imageHeight: "h-60 sm:h-72",
  },
  {
    id: "dish-4",
    name: "Royal Dum Biryani & Mint Raita",
    restaurant: "Nawaabi Kitchen",
    category: "Indian Specialties",
    badge: "Most Loved",
    price: "₹280",
    description:
      "Fragrant aged basmati layered with marinated cottage cheese, saffron, golden onions, and cooling herb raita.",
    image:
      "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=800&q=80",
    colSpan: "lg:col-span-4",
    imageHeight: "h-60 sm:h-72",
  },
  {
    id: "dish-5",
    name: "Warm Belgian Fudge Brownie",
    restaurant: "The Crumb Co.",
    category: "Bakehouse",
    badge: "Sweet Finish",
    price: "₹179",
    description:
      "Rich 70% dark Belgian cocoa fudge brownie, served warm with molten chocolate drizzle and toasted hazelnut crunch.",
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
    colSpan: "lg:col-span-4",
    imageHeight: "h-60 sm:h-72",
  },
];

export const FeaturedDishesSection = () => {
  return (
    <section
      id="featured"
      className="py-20 sm:py-28 bg-[#FAF8F3] border-b border-[#ECE7DE] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <span className="text-xs font-semibold tracking-widest uppercase text-[#D66B43]">
              FROM OUR PARTNER KITCHENS
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#252522] mt-3">
              Cravings Worth Coming Back For.
            </h2>
            <p className="mt-3.5 text-base sm:text-lg text-[#6E6D66] leading-relaxed max-w-xl mx-auto">
              Discover some of the most loved dishes from restaurants around you.
            </p>
          </motion.div>
        </div>

        {/* Asymmetrical Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {featuredDishes.map((dish, index) => {
            return (
              <motion.article
                key={dish.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
                className={`${dish.colSpan} group flex flex-col justify-between rounded-3xl bg-white border border-[#ECE7DE] shadow-xs hover:shadow-xl hover:border-[#D66B43]/40 transition-all duration-300 overflow-hidden`}
              >
                {/* Image Container with Cinematic Zoom & Reveal */}
                <div className={`relative w-full ${dish.imageHeight} overflow-hidden`}>
                  <img
                    src={dish.image}
                    alt={dish.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  
                  {/* Subtle Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#FAF8F3]/95 text-[#252522] backdrop-blur-xs shadow-xs">
                      {dish.category}
                    </span>
                    {dish.badge && (
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#D66B43] text-white shadow-xs">
                        {dish.badge}
                      </span>
                    )}
                  </div>

                  {/* Price Tag pinned to bottom right of image */}
                  <div className="absolute bottom-4 right-4 pointer-events-none">
                    <span className="text-sm font-extrabold px-3 py-1 rounded-xl bg-[#252522]/90 text-white backdrop-blur-xs shadow-xs">
                      {dish.price}
                    </span>
                  </div>
                </div>

                {/* Content Block */}
                <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 space-y-4">
                  <div className="space-y-1.5">
                    <p className="text-xs font-semibold text-[#D66B43] tracking-wide uppercase">
                      {dish.restaurant}
                    </p>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#252522] tracking-tight group-hover:text-[#D66B43] transition-colors duration-200">
                      {dish.name}
                    </h3>
                    <p className="text-sm text-[#6E6D66] leading-relaxed pt-1">
                      {dish.description}
                    </p>
                  </div>

                  {/* Card Action Line */}
                  <div className="pt-3 border-t border-[#F3EFE8] flex items-center justify-between">
                    <span className="text-xs text-[#6E6D66] font-medium">
                      Demo Price • Partner Kitchen
                    </span>
                    <a
                      href="#showcase"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#252522] group-hover:text-[#D66B43] group-hover:translate-x-1 transition-all duration-200"
                    >
                      <span>View in Showcase</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Section Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-14 sm:mt-16"
        >
          <a
            href="#showcase"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-[#FAF8F3] border border-[#ECE7DE] hover:border-[#D66B43] text-[#252522] text-sm font-bold shadow-xs hover:shadow-md transition-all duration-200 group"
          >
            <span>Explore All Dishes in 3D Showcase</span>
            <ArrowRight className="w-4 h-4 text-[#D66B43] group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

      </div>
    </section>
  );
};
