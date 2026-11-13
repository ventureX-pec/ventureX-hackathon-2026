"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Do customers need to download a separate mobile app to order?",
      answer:
        "No. DineFlow operates entirely in standard mobile web browsers (Safari, Chrome, etc.). When a guest scans the QR standee at their table, the full interactive menu loads in less than two seconds without requiring app store downloads or complex account sign-ups.",
    },
    {
      question: "Can guests still pay cash or card at the physical counter?",
      answer:
        "Yes, absolutely. While guests can scan to pay instantly via direct UPI, they can also choose the 'Pay at Counter' option. The cashier terminal tracks the bill and marks the ticket settled whenever cash or card is tendered.",
    },
    {
      question: "What hardware is required to run DineFlow in our kitchen?",
      answer:
        "DineFlow is cloud-based and hardware-agnostic. The Kitchen Display System (KDS) runs smoothly on any affordable tablet (Android, iPad, or even a basic touch monitor) mounted on the wall or kitchen pass. No expensive proprietary POS hardware is needed.",
    },
    {
      question: "How does the platform handle peak-hour lunch pre-orders?",
      answer:
        "DineFlow allows nearby students and office workers to schedule takeaway orders ahead of time from their desks or hostel rooms. The order appears on the kitchen display tagged with the exact target pickup time, so food is freshly packed just as the customer walks in.",
    },
    {
      question: "Can we instantly mark dishes out-of-stock when an ingredient runs out?",
      answer:
        "Yes. Through the Owner Dashboard or Cashier POS, staff can toggle any menu item to 'Unavailable' (86'd) with a single tap. The dish is immediately disabled across every active digital menu in the restaurant, preventing customers from ordering sold-out items.",
    },
    {
      question: "How is DineFlow different from platforms like Zomato, Swiggy, or DoorDash?",
      answer:
        "Delivery aggregators charge high commission fees (often 25% to 30% per order) and control customer data. DineFlow is your own direct operating system with zero commission fees. You keep 100% of your order revenue, and payments go straight to your own UPI/bank account.",
    },
  ];

  return (
    <section id="faq" className="py-20 sm:py-28 bg-[#FAF8F3]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#D66B43]">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#252522] mt-3">
            Common Inquiries from Restaurant Owners
          </h2>
          <p className="mt-4 text-base text-[#6E6D66] leading-relaxed">
            Everything you need to know about setting up and operating DineFlow in your establishment.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="rounded-2xl border border-[#ECE7DE] bg-white shadow-soft overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="text-base font-semibold text-[#252522]">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-[#FAF8F3] border border-[#ECE7DE] flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 bg-[#FAF2EE] text-[#D66B43]" : "text-[#6E6D66]"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-sm text-[#6E6D66] leading-relaxed border-t border-[#F7F4EE] pt-4 animate-in fade-in duration-150">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
