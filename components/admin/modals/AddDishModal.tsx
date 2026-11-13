"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { X, Plus, Utensils, Image as ImageIcon } from "lucide-react";
import { MenuItem } from "@/data/mockCustomerData";

interface AddDishModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddDish: (dish: MenuItem) => void;
}

export const AddDishModal: React.FC<AddDishModalProps> = ({
  isOpen,
  onClose,
  onAddDish,
}) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("burgers");
  const [price, setPrice] = useState(180);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80"
  );
  const [isVeg, setIsVeg] = useState(true);
  const [prepTimeMinutes, setPrepTimeMinutes] = useState(10);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newDish: MenuItem = {
      id: `dish-custom-${Date.now()}`,
      name: name.trim(),
      restaurantId: "corner-cafe",
      restaurantName: "The Corner Café",
      category,
      price: Number(price) || 150,
      description: description.trim() || "Freshly prepared campus specialty.",
      image: image.trim(),
      isVeg,
      prepTimeMinutes: Number(prepTimeMinutes) || 10,
      rating: 5.0,
      tags: ["Chef Special", "Freshly Added"],
    };

    onAddDish(newDish);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="w-full max-w-lg bg-white rounded-3xl border border-[#EDE4D8] shadow-2xl p-6 space-y-5"
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#F2ECE2]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#D66B43]/15 text-[#D66B43] flex items-center justify-center">
              <Utensils className="w-4 h-4" />
            </div>
            <h2 className="font-serif text-lg font-bold text-[#252522]">Add New Menu Item</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-[#8C877D] hover:text-[#252522]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-[#5C574F] block mb-1">Dish Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Saffron Dum Biryani Bowl"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#EDE5DA] text-xs text-[#252522] focus:outline-none focus:border-[#D66B43]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-[#5C574F] block mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#EDE5DA] text-xs text-[#252522] focus:outline-none focus:border-[#D66B43] bg-white"
              >
                <option value="burgers">Burgers</option>
                <option value="pizza">Pizza</option>
                <option value="indian">Lunch Bowls</option>
                <option value="sushi">Sushi & Asian</option>
                <option value="salads">Salads</option>
                <option value="drinks">Beverages</option>
                <option value="desserts">Desserts</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-[#5C574F] block mb-1">Price (₹)</label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#EDE5DA] text-xs text-[#252522] focus:outline-none focus:border-[#D66B43]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-[#5C574F] block mb-1">Prep Time (Mins)</label>
              <input
                type="number"
                value={prepTimeMinutes}
                onChange={(e) => setPrepTimeMinutes(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#EDE5DA] text-xs text-[#252522] focus:outline-none focus:border-[#D66B43]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#5C574F] block mb-1">Dietary</label>
              <div className="flex items-center gap-2 mt-1">
                <button
                  type="button"
                  onClick={() => setIsVeg(true)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-colors ${
                    isVeg
                      ? "bg-emerald-50 border-emerald-500 text-emerald-800"
                      : "bg-[#FAF8F5] border-[#EDE5DA] text-[#736E65]"
                  }`}
                >
                  Veg 🌱
                </button>
                <button
                  type="button"
                  onClick={() => setIsVeg(false)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-colors ${
                    !isVeg
                      ? "bg-rose-50 border-rose-500 text-rose-800"
                      : "bg-[#FAF8F5] border-[#EDE5DA] text-[#736E65]"
                  }`}
                >
                  Non-Veg 🍗
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-[#5C574F] block mb-1">Dish Image URL</label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#EDE5DA] text-xs text-[#252522] focus:outline-none focus:border-[#D66B43]"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#5C574F] block mb-1">Description</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Fresh ingredients, house secret sauce, brioche bun..."
              className="w-full px-3.5 py-2 rounded-xl border border-[#EDE5DA] text-xs text-[#252522] focus:outline-none focus:border-[#D66B43]"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-full border border-[#EDE5DA] text-xs font-semibold text-[#5C574F] hover:bg-[#FAF8F5]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D66B43] to-[#E87A48] text-white text-xs font-bold shadow-md hover:brightness-105"
            >
              Add to Live Menu
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
