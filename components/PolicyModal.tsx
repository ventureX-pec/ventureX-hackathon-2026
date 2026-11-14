"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import {
  X,
  ShieldCheck,
  FileText,
  AlertTriangle,
  ExternalLink,
  HeartHandshake,
  PhoneCall,
  CheckCircle2,
} from "lucide-react";

export type PolicyType = "privacy" | "terms" | "allergens";

interface PolicyModalProps {
  isOpen: boolean;
  activePolicy: PolicyType;
  onClose: () => void;
  onSelectPolicy: (policy: PolicyType) => void;
}

export default function PolicyModal({
  isOpen,
  activePolicy,
  onClose,
  onSelectPolicy,
}: PolicyModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#0f0e0d]/70 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl border border-[#E7DFD5] shadow-2xl overflow-hidden flex flex-col z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Header Bar */}
        <div className="px-6 py-5 bg-[#FAF7F2] border-b border-[#E7DFD5] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="ServeZa Logo"
              className="w-9 h-9 object-contain"
            />
            <div>
              <h2 className="font-serif font-bold text-lg text-[#1c1917] leading-tight">
                Serve<span className="text-[#c96342]">Za</span> – Kitchen &amp; Hearth
              </h2>
              <p className="text-[11px] text-[#78716C] tracking-wide">
                FSSAI Lic. No.: 11224333000521 • Bengaluru, Karnataka, India
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={
                activePolicy === "privacy"
                  ? "/privacy"
                  : activePolicy === "terms"
                  ? "/terms"
                  : "/allergen-guide"
              }
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[#57534E] hover:text-[#c96342] hover:bg-[#F4EDE4] border border-[#E7DFD5] transition-colors"
            >
              <span>Full Page</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white border border-[#E7DFD5] hover:bg-[#F4EDE4] text-[#57534E] hover:text-[#1c1917] flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="px-6 py-3 bg-[#F4EDE4]/60 border-b border-[#E7DFD5] flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0">
          <button
            onClick={() => onSelectPolicy("privacy")}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
              activePolicy === "privacy"
                ? "bg-[#c96342] text-white shadow-xs"
                : "bg-white border border-[#E7DFD5] text-[#57534E] hover:text-[#1c1917]"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Privacy Policy</span>
          </button>

          <button
            onClick={() => onSelectPolicy("terms")}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
              activePolicy === "terms"
                ? "bg-[#c96342] text-white shadow-xs"
                : "bg-white border border-[#E7DFD5] text-[#57534E] hover:text-[#1c1917]"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Terms of Service</span>
          </button>

          <button
            onClick={() => onSelectPolicy("allergens")}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
              activePolicy === "allergens"
                ? "bg-[#c96342] text-white shadow-xs"
                : "bg-white border border-[#E7DFD5] text-[#57534E] hover:text-[#1c1917]"
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Allergen &amp; Dietary Guide</span>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 text-sm text-[#252522] leading-relaxed">
          {activePolicy === "privacy" && <PrivacyPolicyContent />}
          {activePolicy === "terms" && <TermsOfServiceContent />}
          {activePolicy === "allergens" && <AllergenGuideContent />}
        </div>

        {/* Footer Bar */}
        <div className="px-6 py-4 bg-[#FAF7F2] border-t border-[#E7DFD5] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#78716C] shrink-0">
          <span>Last updated: November 14, 2026 • Governed by the Laws of India</span>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-[#1c1917] hover:bg-[#332f2b] text-white font-medium text-xs transition-colors cursor-pointer"
          >
            Close Policy
          </button>
        </div>
      </div>
    </div>
  );
}

function PrivacyPolicyContent() {
  return (
    <div className="space-y-6">
      <div className="bg-[#FAF7F2] border border-[#E7DFD5] rounded-2xl p-5">
        <h3 className="font-serif text-base font-bold text-[#1c1917] mb-1">
          The Short Version
        </h3>
        <p className="text-xs sm:text-sm text-[#57534E]">
          At ServeZa – Kitchen &amp; Hearth, we collect only the personal information we need to reserve your table, cook your pickup orders, and send our Seasonal Notes newsletter if requested. We never sell your personal data. We comply fully with India’s Digital Personal Data Protection Act, 2023.
        </p>
      </div>

      <div className="space-y-2">
        <h4 className="font-serif text-lg font-bold text-[#1c1917]">
          1. Business Context &amp; Legal Entity
        </h4>
        <p className="text-xs sm:text-sm text-[#57534E]">
          ServeZa is operated by <strong>ServeZa Hospitality Private Limited</strong>, having its registered office at <strong>Plot No. 42, 100 Feet Road, Indiranagar</strong>, Bengaluru, Karnataka, India. Contact email: <strong>concierge@serveza.in</strong>, Phone: <strong>+91 (80) 4123-7890</strong>. Licensed under FSSAI License No.: <strong>11224333000521</strong> and GSTIN: <strong>29AAGCS1234F1Z8</strong>.
        </p>
      </div>

      <div className="space-y-2">
        <h4 className="font-serif text-lg font-bold text-[#1c1917]">
          2. Personal Data We Collect &amp; Why
        </h4>
        <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-[#57534E]">
          <li><strong>Reservations &amp; Private Events:</strong> Full name, phone number, email address, date, time, party size, and special dining requests.</li>
          <li><strong>Online Ordering &amp; Pickup Queue:</strong> Contact details, order history, and token receipts to manage hearth preparation and counter collection.</li>
          <li><strong>Dietary &amp; Allergy Notes:</strong> Voluntary dietary requirements entered during booking to inform our kitchen staff.</li>
          <li><strong>Account Sign-In:</strong> Credentials for registered customer accounts. (Our kitchen/staff portals are strictly internal and non-public).</li>
          <li><strong>Payment Confirmation:</strong> Transaction reference IDs and status from <strong>Razorpay</strong>. <em>We never store credit/debit card numbers or CVVs.</em></li>
          <li><strong>Device Analytics:</strong> IP address, browser type, and essential cookies for security and site navigation.</li>
        </ul>
      </div>

      <div className="space-y-2">
        <h4 className="font-serif text-lg font-bold text-[#1c1917]">
          3. Lawful Basis, Consent &amp; Newsletter
        </h4>
        <p className="text-xs sm:text-sm text-[#57534E]">
          Processing is based on your explicit consent and our contractual commitment to serve your meals. Our <strong>Seasonal Notes</strong> email updates include a guaranteed one-click unsubscribe (&quot;Zero spam&quot;).
        </p>
      </div>

      <div className="space-y-2">
        <h4 className="font-serif text-lg font-bold text-[#1c1917]">
          4. Data Sharing &amp; Third Parties
        </h4>
        <p className="text-xs sm:text-sm text-[#57534E]">
          We share data only with authorized processors: <strong>Razorpay</strong>, <strong>Resend</strong>, and <strong>Vercel Cloud Infrastructure & Google Analytics</strong>, or with Indian statutory authorities when required by law.
        </p>
      </div>

      <div className="space-y-2">
        <h4 className="font-serif text-lg font-bold text-[#1c1917]">
          5. Rights Under DPDP Act, 2023 &amp; Grievance Redressal
        </h4>
        <p className="text-xs sm:text-sm text-[#57534E]">
          You have rights to access, correction, erasure, withdrawal of consent, and nomination. Individuals under 18 require parental consent.
        </p>
        <div className="bg-[#FAF7F2] border border-[#E7DFD5] rounded-xl p-4 text-xs text-[#57534E] space-y-1 mt-2">
          <p className="font-bold text-[#1c1917]">Grievance Officer:</p>
          <p>Rohan Mehta, Head of Guest Relations & Compliance</p>
          <p>Email: concierge@serveza.in • Phone: +91 (80) 4123-7890 • Address: Plot No. 42, 100 Feet Road, Indiranagar, Bengaluru, Karnataka</p>
        </div>
      </div>

      <p className="text-[11px] text-[#78716C] italic pt-3 border-t border-[#E7DFD5]">
        * Content drafted for Indian legal compliance. Should be reviewed by a qualified Indian legal practitioner before final publication.
      </p>
    </div>
  );
}

function TermsOfServiceContent() {
  return (
    <div className="space-y-6">
      <div className="bg-[#FAF7F2] border border-[#E7DFD5] rounded-2xl p-5">
        <h3 className="font-serif text-base font-bold text-[#1c1917] mb-1">
          The Short Version
        </h3>
        <p className="text-xs sm:text-sm text-[#57534E]">
          Welcome to ServeZa. By booking a table or ordering pickup food, you agree to these dining terms. We hold tables for a 15-minute window, process prices in Indian Rupees (₹), and ask for mutual courtesy. Indian law and the courts of Bengaluru govern all services.
        </p>
      </div>

      <div className="space-y-2">
        <h4 className="font-serif text-lg font-bold text-[#1c1917]">
          1. Table Reservations &amp; Grace Period
        </h4>
        <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-[#57534E]">
          <li>Reservations are confirmed via automated electronic receipt (SMS/Email).</li>
          <li>We hold reserved tables for <strong>15 minutes</strong> after your scheduled booking time before releasing the table to waiting diners.</li>
          <li>Cancellations should be made at least 2 hours in advance.</li>
          <li>Group events over 8 guests or private gatherings may require an advance deposit of <strong>₹500 per guest</strong>.</li>
        </ul>
      </div>

      <div className="space-y-2">
        <h4 className="font-serif text-lg font-bold text-[#1c1917]">
          2. Online Ordering &amp; Pickup Queue
        </h4>
        <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-[#57534E]">
          <li>Dishes are prepared live to order. Orders cannot be cancelled or altered once kitchen preparation starts.</li>
          <li>Please collect pickup orders within 20–30 minutes of readiness alert to maintain optimal temperature and food quality.</li>
          <li>If an ingredient is out of stock, we offer an alternative or issue an immediate refund via Razorpay within 5–7 business days.</li>
        </ul>
      </div>

      <div className="space-y-2">
        <h4 className="font-serif text-lg font-bold text-[#1c1917]">
          3. Currency, Pricing &amp; Payments
        </h4>
        <p className="text-xs sm:text-sm text-[#57534E]">
          All menu prices are stated in <strong>Indian Rupees (₹)</strong> and are inclusive of applicable Goods and Services Tax (GST). Payments are processed via Razorpay. No mandatory service charges are levied on pickup orders.
        </p>
      </div>

      <div className="space-y-2">
        <h4 className="font-serif text-lg font-bold text-[#1c1917]">
          4. Intellectual Property &amp; Governing Law
        </h4>
        <p className="text-xs sm:text-sm text-[#57534E]">
          All recipes, branding, and photography are the intellectual property of ServeZa Hospitality Private Limited. These Terms are governed by the laws of India, with exclusive jurisdiction in the courts of <strong>Bengaluru, Karnataka, India</strong>.
        </p>
      </div>

      <p className="text-[11px] text-[#78716C] italic pt-3 border-t border-[#E7DFD5]">
        * Content drafted for Indian legal compliance. Should be reviewed by a qualified Indian legal practitioner before final publication.
      </p>
    </div>
  );
}

function AllergenGuideContent() {
  const allergens = [
    { name: "Gluten / Cereals", categories: "Burgers, Pizza, Lunch Bowls, Asian", dishes: "Brioche buns, pizza dough, extruded pasta, tempura" },
    { name: "Milk / Dairy", categories: "Burgers, Pizza, Lunch Bowls, Salads, Drinks", dishes: "Melted cheddar/Swiss, smoked burrata, cream sauces, milkshakes" },
    { name: "Eggs", categories: "Burgers, Asian, Salads", dishes: "Brioche egg-wash, house aiolis, fresh egg noodles" },
    { name: "Peanuts", categories: "Lunch Bowls, Asian, Salads", dishes: "Crushed peanut toppers, satay sauces, tempering oils" },
    { name: "Tree Nuts", categories: "Lunch Bowls, Salads, Beverages", dishes: "Pistachio pesto, cashew curry gravies, dessert toppings" },
    { name: "Soybeans / Soy", categories: "Burgers, Asian, Lunch Bowls", dishes: "Soy reductions, edamame, teriyaki, tofu bowls" },
    { name: "Fish", categories: "Asian, Salads", dishes: "Fresh salmon/tuna sushi, dashi broth, Caesar dressings" },
    { name: "Shellfish / Crustaceans", categories: "Asian, Lunch Bowls", dishes: "Prawn tempura rolls, crab salads, seafood broths" },
    { name: "Sesame", categories: "Burgers, Asian, Salads", dishes: "Toasted sesame bun toppings, sesame oil, maki rolls" },
    { name: "Mustard", categories: "Burgers, Salads, Lunch Bowls", dishes: "Mustard aioli, burger relishes, traditional tempering oils" },
    { name: "Sulphites", categories: "Burgers, Pizza, Beverages", dishes: "Wine & balsamic reductions, pickled gherkins/jalapeños" },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-[#FAF7F2] border border-[#E7DFD5] rounded-2xl p-5">
        <h3 className="font-serif text-base font-bold text-[#1c1917] mb-1">
          The Short Version
        </h3>
        <p className="text-xs sm:text-sm text-[#57534E]">
          Our live open kitchen handles wheat, dairy, eggs, nuts, and seafood using shared cookware and grills. <strong>We cannot guarantee a 100% allergen-free environment.</strong> Please communicate all allergies before ordering.
        </p>
      </div>

      <div className="space-y-2">
        <h4 className="font-serif text-lg font-bold text-[#1c1917]">
          1. FSSAI Veg / Non-Veg Labelling
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E7DFD5] flex items-center gap-3 text-xs">
            <div className="w-4 h-4 rounded-xs border-2 border-emerald-600 flex items-center justify-center shrink-0">
              <div className="w-2 h-2 rounded-full bg-emerald-600" />
            </div>
            <div>
              <strong className="text-emerald-800">Green Dot (Vegetarian):</strong> Plant-based &amp; dairy ingredients only.
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E7DFD5] flex items-center gap-3 text-xs">
            <div className="w-4 h-4 rounded-xs border-2 border-rose-600 flex items-center justify-center shrink-0">
              <div className="w-2 h-2 rounded-full bg-rose-600" />
            </div>
            <div>
              <strong className="text-rose-800">Red Dot (Non-Vegetarian):</strong> Contains meat, poultry, seafood, or eggs.
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="font-serif text-lg font-bold text-[#1c1917]">
          2. Common Food Allergens Matrix
        </h4>
        <div className="overflow-x-auto rounded-xl border border-[#E7DFD5]">
          <table className="w-full text-left text-xs text-[#57534E] divide-y divide-[#E7DFD5]">
            <thead className="bg-[#FAF7F2] text-[#1c1917] font-bold font-serif">
              <tr>
                <th className="py-2.5 px-3">Allergen</th>
                <th className="py-2.5 px-3">Categories</th>
                <th className="py-2.5 px-3">Typical Dishes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7DFD5] bg-white">
              {allergens.map((item) => (
                <tr key={item.name}>
                  <td className="py-2.5 px-3 font-semibold text-[#1c1917]">{item.name}</td>
                  <td className="py-2.5 px-3">{item.categories}</td>
                  <td className="py-2.5 px-3 text-[#78716C]">{item.dishes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="font-serif text-lg font-bold text-[#1c1917]">
          3. How to Inform Us &amp; Severe Allergies
        </h4>
        <p className="text-xs sm:text-sm text-[#57534E]">
          Note your requirements during online reservation or checkout instructions. If you have an anaphylactic allergy, speak directly with the Duty Chef or Restaurant Manager and ensure you carry your prescribed auto-injector / medication.
        </p>
      </div>

      <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-900 space-y-1">
        <p className="font-bold flex items-center gap-1.5">
          <PhoneCall className="w-3.5 h-3.5 text-rose-600" />
          <span>Emergency Medical Support:</span>
        </p>
        <p>In case of severe allergic reaction, alert our staff immediately and call emergency services (dial 112 / 108 in India).</p>
      </div>

      <p className="text-[11px] text-[#78716C] italic pt-3 border-t border-[#E7DFD5]">
        * Last reviewed: November 14, 2026 by ServeZa Culinary &amp; Food Safety Team. Should be reviewed by a qualified Indian legal practitioner before final publication.
      </p>
    </div>
  );
}
