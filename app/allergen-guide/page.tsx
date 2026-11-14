import React from "react";
import LegalPageLayout from "@/components/LegalPageLayout";
import { AlertCircle, HeartHandshake, ShieldAlert, PhoneCall } from "lucide-react";

export const metadata = {
  title: "Allergen Guide | ServeZa – Kitchen & Hearth",
  description:
    "Comprehensive Food Allergen and Dietary Safety Guide for ServeZa – Kitchen & Hearth, complying with FSSAI regulations.",
};

export default function AllergenGuidePage() {
  const allergens = [
    {
      name: "Cereals containing Gluten (Wheat, Barley, Rye, Oats)",
      categories: "Burgers, Pizza, Lunch Bowls, Sushi & Asian",
      typicalDishes:
        "Brioche burger buns, woodfired pizza dough, extruded rigatoni/tagliatelle, soy marinades, tempura crunch",
    },
    {
      name: "Milk & Dairy",
      categories: "Burgers, Pizza, Lunch Bowls, Healthy & Salads, Beverages",
      typicalDishes:
        "Melted cheddar & Emmental, smoked burrata, Parmigiano-Reggiano, cream gravies, yogurt marinades, salted caramel milkshakes",
    },
    {
      name: "Eggs",
      categories: "Burgers, Sushi & Asian, Healthy & Salads",
      typicalDishes:
        "Brioche bun egg-wash, house aioli & smoked paprika mayo, tartare sauces, certain fresh noodles",
    },
    {
      name: "Peanuts",
      categories: "Lunch Bowls, Sushi & Asian, Healthy & Salads",
      typicalDishes:
        "Crushed peanut salad toppers, peanut satay dressings, regional tempering oils",
    },
    {
      name: "Tree Nuts (Almonds, Cashews, Pistachios, Walnuts)",
      categories: "Lunch Bowls, Healthy & Salads, Beverages",
      typicalDishes:
        "Pistachio pesto, rich cashew nut curry gravies, toasted nut garnishes, artisanal dessert shakes",
    },
    {
      name: "Soybeans / Soy",
      categories: "Burgers, Sushi & Asian, Lunch Bowls",
      typicalDishes:
        "Soy sauce reductions, edamame, teriyaki glazes, tofu bowls, seasoned craft batters",
    },
    {
      name: "Fish",
      categories: "Sushi & Asian, Healthy & Salads",
      typicalDishes:
        "Fresh salmon & tuna sushi rolls, dashi broth bases, fish sauces, Caesar dressings",
    },
    {
      name: "Crustaceans & Shellfish (Prawns, Crab, Lobster)",
      categories: "Sushi & Asian, Lunch Bowls",
      typicalDishes:
        "Prawn tempura rolls, crab salads, seafood broths",
    },
    {
      name: "Sesame Seeds",
      categories: "Burgers, Sushi & Asian, Healthy & Salads",
      typicalDishes:
        "Toasted sesame seeds on burger buns, toasted sesame oil, maki roll coatings, tahini drizzles",
    },
    {
      name: "Mustard",
      categories: "Burgers, Healthy & Salads, Lunch Bowls",
      typicalDishes:
        "Mustard aioli, whole-grain burger relishes, salad vinaigrettes, traditional Indian mustard oil tempering",
    },
    {
      name: "Sulphites",
      categories: "Burgers, Pizza, Beverages",
      typicalDishes:
        "Balsamic and red wine reductions, fermented pickled gherkins/jalapeños, dried fruit garnishes",
    },
  ];

  return (
    <LegalPageLayout
      badge="Food Safety & Care"
      title="Allergen & Dietary Guide"
      subtitle="Detailed information about ingredients, cross-contact precautions, and allergen practices at ServeZa – Kitchen & Hearth."
      lastUpdated="November 14, 2026"
    >
      {/* The Short Version */}
      <section className="bg-[#FAF7F2] border border-[#E7DFD5] rounded-2xl p-6 sm:p-7">
        <h2 className="font-serif text-xl font-bold text-[#1c1917] mb-2">
          The Short Version
        </h2>
        <p className="text-sm text-[#57534E] leading-relaxed">
          Your dining safety and comfort mean everything to us. Our open-hearth kitchen prepares food using honest, flavorful ingredients—including wheat, dairy, eggs, nuts, and seafood. Because dishes are prepared in an open, live kitchen using shared cookware and grills, <strong>we cannot guarantee a 100% allergen-free environment</strong>. If you or someone in your group has a food allergy, please let us know when reserving or ordering so our chefs can take extra precautions.
        </p>
      </section>

      {/* 1. Kitchen Environment & Cross-Contact Advisory */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-[#c96342]" />
          <h2 className="font-serif text-2xl font-bold text-[#1c1917]">
            1. Open Kitchen &amp; Cross-Contact Advisory
          </h2>
        </div>
        <p className="text-sm text-[#57534E] leading-relaxed">
          At ServeZa – Kitchen &amp; Hearth, our cooking takes place across live woodfire hearths, open flattops, and artisanal prep stations. 
        </p>
        <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 sm:p-5 text-sm text-amber-900 leading-relaxed space-y-2">
          <p className="font-semibold">
            Important Notice Regarding Cross-Contact:
          </p>
          <p className="text-xs sm:text-sm text-amber-800">
            While our culinary team follows rigorous hygiene and sanitization standards under the <strong>Food Safety and Standards Authority of India (FSSAI)</strong>, all food is prepared in a shared commercial facility. Shared fryers, ovens, grills, cutting surfaces, and cooking utensils mean that <strong>we cannot guarantee that any dish is completely free from trace allergens</strong>.
          </p>
        </div>
      </section>

      {/* 2. FSSAI Veg / Non-Veg Labelling */}
      <section className="space-y-3">
        <h2 className="font-serif text-2xl font-bold text-[#1c1917]">
          2. FSSAI Vegetarian &amp; Non-Vegetarian Labelling
        </h2>
        <p className="text-sm text-[#57534E] leading-relaxed">
          In strict compliance with FSSAI Food Safety and Standards (Packaging and Labelling) regulations:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD5] flex items-start gap-3">
            <div className="w-5 h-5 rounded-xs border-2 border-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
            </div>
            <div>
              <span className="font-bold text-xs uppercase tracking-wider text-emerald-800">
                Green Dot (Vegetarian)
              </span>
              <p className="text-xs text-[#57534E] mt-1 leading-relaxed">
                Contains only plant-based ingredients and dairy. No meat, poultry, fish, seafood, or egg derivatives.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD5] flex items-start gap-3">
            <div className="w-5 h-5 rounded-xs border-2 border-rose-600 flex items-center justify-center shrink-0 mt-0.5">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-600" />
            </div>
            <div>
              <span className="font-bold text-xs uppercase tracking-wider text-rose-800">
                Brown / Red Dot (Non-Vegetarian)
              </span>
              <p className="text-xs text-[#57534E] mt-1 leading-relaxed">
                Contains meat, poultry, fish, crustaceans, seafood, or eggs (including egg-based emulsions or brioche washes).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Major Allergens Matrix */}
      <section className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[#1c1917]">
          3. Common Food Allergens Reference Matrix
        </h2>
        <p className="text-sm text-[#57534E] leading-relaxed">
          Below is a guide to the primary food allergens recognized under Indian and international food safety norms, along with the ServeZa menu sections where they most commonly appear:
        </p>

        <div className="overflow-x-auto rounded-2xl border border-[#E7DFD5]">
          <table className="w-full text-left text-xs sm:text-sm text-[#57534E] divide-y divide-[#E7DFD5]">
            <thead className="bg-[#FAF7F2] text-[#1c1917] font-serif font-bold">
              <tr>
                <th className="py-3 px-4 sm:px-6 w-1/3">Allergen</th>
                <th className="py-3 px-4 sm:px-6 w-1/4">Menu Categories</th>
                <th className="py-3 px-4 sm:px-6">Common Preparations &amp; Ingredients</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7DFD5] bg-white">
              {allergens.map((item) => (
                <tr key={item.name} className="hover:bg-[#FAF7F2]/60 transition-colors">
                  <td className="py-3 px-4 sm:px-6 font-semibold text-[#1c1917] align-top">
                    {item.name}
                  </td>
                  <td className="py-3 px-4 sm:px-6 align-top">
                    <span className="inline-block px-2 py-0.5 bg-[#FAF7F2] text-[#78716C] rounded-md border border-[#E7DFD5] text-[11px]">
                      {item.categories}
                    </span>
                  </td>
                  <td className="py-3 px-4 sm:px-6 align-top text-xs leading-relaxed">
                    {item.typicalDishes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. How to Tell Us About Your Allergies */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <HeartHandshake className="w-5 h-5 text-[#c96342]" />
          <h2 className="font-serif text-2xl font-bold text-[#1c1917]">
            4. How to Inform Us &amp; What We Do
          </h2>
        </div>
        <p className="text-sm text-[#57534E] leading-relaxed">
          We want you to dine with peace of mind. Here is how you can communicate dietary needs:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-sm text-[#57534E]">
          <li>
            <strong>When Reserving Online:</strong> Enter any allergy notes or dining restrictions in the &quot;Special Requests&quot; field. Our host desk reviews these before your arrival.
          </li>
          <li>
            <strong>When Ordering Online for Pickup:</strong> Use the item customization instructions field to specify your dietary alert.
          </li>
          <li>
            <strong>At Your Table / Counter:</strong> Speak directly with your server or manager. We will provide detailed guidance on which preparations can be modified (e.g. omitting cheese, replacing bread with greens, or omitting nuts).
          </li>
          <li>
            <strong>Our Kitchen Response:</strong> When an allergy ticket is received, our kitchen cleans tools, changes gloves, and prepares the dish on dedicated clean equipment to minimize cross-contact.
          </li>
        </ul>
      </section>

      {/* 5. Guidance for Severe Allergies */}
      <section className="space-y-3">
        <h2 className="font-serif text-2xl font-bold text-[#1c1917]">
          5. Guidance for Guests with Severe Allergies
        </h2>
        <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD5] space-y-2 text-sm text-[#57534E]">
          <p className="font-bold text-[#1c1917]">
            If you have a life-threatening or anaphylactic food allergy:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
            <li>Always inform your server and ask to speak with the Duty Chef or Restaurant Manager before placing your order.</li>
            <li>Always carry your prescribed emergency medication (such as an auto-injector / epinephrine or antihistamines) with you.</li>
            <li>If your sensitivity is triggered by airborne flour dust or minute trace cross-contact, please understand that our open woodfire kitchen may not be suitable.</li>
          </ul>
        </div>
      </section>

      {/* 6. Recipe and Supplier Changes */}
      <section className="space-y-3">
        <h2 className="font-serif text-2xl font-bold text-[#1c1917]">
          6. Supplier &amp; Recipe Variations
        </h2>
        <p className="text-sm text-[#57534E] leading-relaxed">
          Because we work with local farmers, artisanal creameries, and seasonal markets, recipes, cooking oils, and ingredient suppliers may change without notice. Please do not assume that a dish enjoyed previously remains unchanged—always re-confirm with our team during every visit.
        </p>
        <p className="text-xs text-[#78716C]">
          <strong>Last reviewed:</strong> November 14, 2026 by ServeZa Culinary &amp; Food Safety Team.
        </p>
      </section>

      {/* 7. Emergency Protocol */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <PhoneCall className="w-5 h-5 text-rose-600" />
          <h2 className="font-serif text-2xl font-bold text-rose-700">
            7. Emergency Protocol for Severe Reactions
          </h2>
        </div>
        <p className="text-sm text-[#57534E] leading-relaxed">
          If you or someone in your group experiences symptoms of an allergic reaction (difficulty breathing, swelling of lips/throat, hives, severe dizziness, or anaphylaxis):
        </p>
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-xs sm:text-sm text-rose-900 space-y-1">
          <p className="font-bold">
            Alert our team immediately and call emergency medical services (dial 112 / 108 in India).
          </p>
          <p>
            Administer auto-injector medication without delay. Our staff is trained to assist in contacting local emergency medical support in Bengaluru, Karnataka.
          </p>
        </div>
      </section>

      {/* Legal Disclaimer */}
      <div className="pt-6 border-t border-[#E7DFD5] text-xs text-[#78716C] italic">
        Reminder: This document is provided for customer education and operational food safety guidance and should be reviewed and approved by a qualified Indian legal practitioner before publishing.
      </div>
    </LegalPageLayout>
  );
}
