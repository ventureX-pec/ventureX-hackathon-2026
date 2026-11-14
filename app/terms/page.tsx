import React from "react";
import Link from "next/link";
import LegalPageLayout from "@/components/LegalPageLayout";

export const metadata = {
  title: "Terms of Service | ServeZa – Kitchen & Hearth",
  description:
    "Terms of Service for table reservations, online ordering, and website usage at ServeZa – Kitchen & Hearth, India.",
};

export default function TermsOfServicePage() {
  return (
    <LegalPageLayout
      badge="Customer Agreement"
      title="Terms of Service"
      subtitle="The rules, standards, and guidelines that govern table reservations, online pickup orders, and dining with ServeZa – Kitchen & Hearth."
      lastUpdated="November 14, 2026"
    >
      {/* The Short Version */}
      <section className="bg-[#FAF7F2] border border-[#E7DFD5] rounded-2xl p-6 sm:p-7">
        <h2 className="font-serif text-xl font-bold text-[#1c1917] mb-2">
          The Short Version
        </h2>
        <p className="text-sm text-[#57534E] leading-relaxed">
          Welcome to ServeZa – Kitchen & Hearth. By using our website, booking a table, or ordering dishes for counter pickup, you agree to these simple terms. We cook dishes live from scratch, hold reserved tables for a 15-minute window, price items in Indian Rupees (₹), and ask for mutual respect and courtesy. If you have severe allergies, please let us know in advance. Indian law governs all dining and web arrangements.
        </p>
      </section>

      {/* 1. Acceptance */}
      <section className="space-y-3">
        <h2 className="font-serif text-2xl font-bold text-[#1c1917]">
          1. Acceptance of Terms
        </h2>
        <p className="text-sm text-[#57534E] leading-relaxed">
          These Terms of Service (&quot;Terms&quot;) constitute a legally valid agreement between you (&quot;Guest,&quot; &quot;Customer,&quot; or &quot;You&quot;) and <strong>ServeZa</strong>, operated by <strong>ServeZa Hospitality Private Limited</strong>, having its registered office at <strong>Plot No. 42, 100 Feet Road, Indiranagar</strong> (&quot;ServeZa,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;).
        </p>
        <p className="text-sm text-[#57534E] leading-relaxed">
          By accessing our website, registering an account, booking a table or private gathering, or ordering food via our pickup queue, you confirm that you accept these Terms, together with our <Link href="/privacy" className="text-[#c96342] underline">Privacy Policy</Link> and <Link href="/allergen-guide" className="text-[#c96342] underline">Allergen Guide</Link>.
        </p>
      </section>

      {/* 2. Eligibility & Accounts */}
      <section className="space-y-3">
        <h2 className="font-serif text-2xl font-bold text-[#1c1917]">
          2. Eligibility &amp; Account Security
        </h2>
        <p className="text-sm text-[#57534E] leading-relaxed">
          <strong>Eligibility:</strong> You must be at least 18 years old to make reservations or transact on our website. Individuals under 18 years may dine or order only under adult supervision.
        </p>
        <p className="text-sm text-[#57534E] leading-relaxed">
          <strong>Account Security:</strong> You are responsible for maintaining the confidentiality of your sign-in credentials and for all activities under your account. Notify us immediately if you suspect unauthorized access.
        </p>
        <p className="text-sm text-[#57534E] leading-relaxed">
          <strong>Internal Portals:</strong> Our kitchen, staff, and administrative management portals are confidential, private systems. Any unauthorized attempt to probe or access these non-public areas is strictly prohibited and actionable under the Information Technology Act, 2000.
        </p>
      </section>

      {/* 3. Table Reservations & Private Gatherings */}
      <section className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[#1c1917]">
          3. Table Reservations &amp; Private Events
        </h2>
        
        <div className="space-y-3 pl-1">
          <div className="border-l-2 border-[#c96342] pl-4">
            <h3 className="font-serif text-base font-bold text-[#1c1917]">
              A. Confirmation
            </h3>
            <p className="text-xs sm:text-sm text-[#57534E] mt-1 leading-relaxed">
              Table reservations submitted online are confirmed only upon receipt of an automated SMS, email, or onscreen booking confirmation.
            </p>
          </div>

          <div className="border-l-2 border-[#c96342] pl-4">
            <h3 className="font-serif text-base font-bold text-[#1c1917]">
              B. Grace Period &amp; Seating Hold
            </h3>
            <p className="text-xs sm:text-sm text-[#57534E] mt-1 leading-relaxed">
              We hold reserved tables for <strong>15 minutes</strong> past your confirmed booking time. If your party does not arrive or notify us within this window, we reserve the right to release the table to waiting guests in our dining room.
            </p>
          </div>

          <div className="border-l-2 border-[#c96342] pl-4">
            <h3 className="font-serif text-base font-bold text-[#1c1917]">
              C. Cancellations &amp; No-Shows
            </h3>
            <p className="text-xs sm:text-sm text-[#57534E] mt-1 leading-relaxed">
              If your dining plans change, please cancel or reschedule at least 2 hours prior via your account or by calling +91 (80) 4123-7890. Repeated unexcused no-shows may limit your future booking privileges.
            </p>
          </div>

          <div className="border-l-2 border-[#c96342] pl-4">
            <h3 className="font-serif text-base font-bold text-[#1c1917]">
              D. Group Bookings &amp; Private Gatherings
            </h3>
            <p className="text-xs sm:text-sm text-[#57534E] mt-1 leading-relaxed">
              Parties of more than 8 guests or private gatherings require advance coordination and may require an advance booking deposit of <strong>₹500 per guest or 20% of estimated minimum spend</strong>. Deposit refund rules for events will be confirmed in writing at the time of reservation.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Online Ordering & Pickup */}
      <section className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[#1c1917]">
          4. Online Ordering &amp; Counter Pickup
        </h2>
        <div className="space-y-3 pl-1">
          <div className="border-l-2 border-[#c96342] pl-4">
            <h3 className="font-serif text-base font-bold text-[#1c1917]">
              A. Kitchen Queue &amp; Preparation Times
            </h3>
            <p className="text-xs sm:text-sm text-[#57534E] mt-1 leading-relaxed">
              Our hearth cooks dishes live to order. When you place a pickup order, our system assigns an estimated prep time and a pickup token receipt. While we aim for promptness, preparation times may vary during rush periods.
            </p>
          </div>

          <div className="border-l-2 border-[#c96342] pl-4">
            <h3 className="font-serif text-base font-bold text-[#1c1917]">
              B. Collection Window
            </h3>
            <p className="text-xs sm:text-sm text-[#57534E] mt-1 leading-relaxed">
              To enjoy your meal at its optimal texture and temperature, please collect your order within 20–30 minutes of receiving the &quot;Ready for Pickup&quot; alert. Uncollected food cannot be held indefinitely or refunded.
            </p>
          </div>

          <div className="border-l-2 border-[#c96342] pl-4">
            <h3 className="font-serif text-base font-bold text-[#1c1917]">
              C. Order Cancellations &amp; Refunds
            </h3>
            <p className="text-xs sm:text-sm text-[#57534E] mt-1 leading-relaxed">
              Because ingredients are prepared immediately upon order submission, <strong>orders cannot be cancelled or modified once the kitchen has begun preparation</strong>.
            </p>
            <p className="text-xs sm:text-sm text-[#57534E] mt-0.5 leading-relaxed">
              If an item is unavailable due to fresh supply limits, we will contact you to offer an alternative or issue an immediate refund. Approved refunds are routed through Razorpay back to your original payment method within 5–7 business days.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Pricing, Currency & Payments */}
      <section className="space-y-3">
        <h2 className="font-serif text-2xl font-bold text-[#1c1917]">
          5. Menu Pricing, Currency &amp; Payments
        </h2>
        <p className="text-sm text-[#57534E] leading-relaxed">
          * <strong>Currency:</strong> All prices displayed on our website and digital menus are in <strong>Indian Rupees (₹)</strong>.
        </p>
        <p className="text-sm text-[#57534E] leading-relaxed">
          * <strong>Taxes:</strong> Prices are stated as inclusive of all applicable Goods and Services Tax (GST). Applicable GST (5% without input tax credit) is itemized at checkout before payment.
        </p>
        <p className="text-sm text-[#57534E] leading-relaxed">
          * <strong>Service Charge:</strong> We do not levy any mandatory service charge on pickup orders. Gratuities are purely voluntary..
        </p>
        <p className="text-sm text-[#57534E] leading-relaxed">
          * <strong>Payment Processing:</strong> Transactions are securely facilitated by our authorized gateway partner, <strong>Razorpay</strong>. You warrant that you have lawful authority to use the selected payment instrument.
        </p>
      </section>

      {/* 6. Allergen Disclaimer */}
      <section className="space-y-3">
        <h2 className="font-serif text-2xl font-bold text-[#1c1917]">
          6. Allergen Notice &amp; Cross-Contact Advisory
        </h2>
        <p className="text-sm text-[#57534E] leading-relaxed">
          ServeZa operates an active kitchen that handles common allergens including cereals containing gluten, milk/dairy, tree nuts, peanuts, eggs, soy, sesame, mustard, fish, and shellfish. <strong>We cannot guarantee an allergen-free dining environment.</strong>
        </p>
        <p className="text-sm text-[#57534E] leading-relaxed">
          Guests must review our complete <Link href="/allergen-guide" className="text-[#c96342] underline font-semibold">Allergen Guide</Link> and communicate any sensitivities to our service staff prior to ordering.
        </p>
      </section>

      {/* 7. Acceptable Use */}
      <section className="space-y-3">
        <h2 className="font-serif text-2xl font-bold text-[#1c1917]">
          7. Acceptable Use Policy
        </h2>
        <p className="text-sm text-[#57534E] leading-relaxed">
          You agree not to make fictitious or speculative bookings, place duplicate fraudulent orders, upload harmful scripts or automated bots, or engage in abusive conduct toward our team or fellow patrons.
        </p>
      </section>

      {/* 8. Intellectual Property */}
      <section className="space-y-3">
        <h2 className="font-serif text-2xl font-bold text-[#1c1917]">
          8. Intellectual Property
        </h2>
        <p className="text-sm text-[#57534E] leading-relaxed">
          All materials on this website—including the ServeZa name, logo, dish imagery, recipe descriptions, brand styling, and editorial copy—are the property of <strong>ServeZa Hospitality Private Limited</strong> and protected under Indian copyright, trademark, and intellectual property laws. Content may not be copied or reproduced without prior written permission.
        </p>
      </section>

      {/* 9. Reviews & User Content */}
      <section className="space-y-3">
        <h2 className="font-serif text-2xl font-bold text-[#1c1917]">
          9. User Content &amp; Reviews
        </h2>
        <p className="text-sm text-[#57534E] leading-relaxed">
          If you submit feedback, dining reviews, or suggestions, you grant us a royalty-free, perpetual license to display and use such remarks across our menu communications. You warrant that your submissions are truthful and do not infringe on any third party&apos;s rights.
        </p>
      </section>

      {/* 10. Limitation of Liability */}
      <section className="space-y-3">
        <h2 className="font-serif text-2xl font-bold text-[#1c1917]">
          10. Limitation of Liability &amp; Indemnity
        </h2>
        <p className="text-sm text-[#57534E] leading-relaxed">
          To the maximum extent permitted by Indian law, ServeZa shall not be liable for any indirect, incidental, or consequential damages resulting from website unavailability, minor order delays, or uncommunicated ingredient sensitivities. In any case, our total aggregate liability relating to any order or reservation shall not exceed the amount actually paid by you for that specific transaction.
        </p>
        <p className="text-sm text-[#57534E] leading-relaxed">
          You agree to indemnify and hold harmless ServeZa, ServeZa Hospitality Private Limited, and its culinary team from any third-party claims or expenses arising from your violation of these Terms.
        </p>
      </section>

      {/* 11. Force Majeure */}
      <section className="space-y-3">
        <h2 className="font-serif text-2xl font-bold text-[#1c1917]">
          11. Force Majeure
        </h2>
        <p className="text-sm text-[#57534E] leading-relaxed">
          ServeZa shall not be responsible for failure or delay in fulfilling table reservations or food orders caused by events beyond our reasonable control, including natural calamities, severe weather, power grid failures, kitchen equipment breakdowns, strikes, or governmental restrictions.
        </p>
      </section>

      {/* 12. Governing Law & Jurisdiction */}
      <section className="space-y-3">
        <h2 className="font-serif text-2xl font-bold text-[#1c1917]">
          12. Governing Law &amp; Jurisdiction
        </h2>
        <p className="text-sm text-[#57534E] leading-relaxed">
          These Terms of Service are governed by and construed in accordance with the <strong>laws of the Republic of India</strong>. The civil courts of competent jurisdiction located in <strong>Bengaluru, Karnataka, India</strong>, shall have exclusive jurisdiction over any disputes arising under these Terms.
        </p>
      </section>

      {/* 13. Contact Information */}
      <section className="space-y-3">
        <h2 className="font-serif text-2xl font-bold text-[#1c1917]">
          13. Contact Information
        </h2>
        <div className="bg-[#FAF7F2] border border-[#E7DFD5] rounded-2xl p-5 text-sm text-[#57534E] space-y-1.5">
          <p><strong>Operating Entity:</strong> ServeZa Hospitality Private Limited (ServeZa – Kitchen &amp; Hearth)</p>
          <p><strong>Registered Address:</strong> Plot No. 42, 100 Feet Road, Indiranagar, Bengaluru, Karnataka 560038, India</p>
          <p><strong>FSSAI License No.:</strong> 11224333000521 | <strong>GSTIN:</strong> 29AAGCS1234F1Z8</p>
          <p><strong>Email:</strong> concierge@serveza.in</p>
          <p><strong>Phone:</strong> +91 (80) 4123-7890</p>
        </div>
      </section>

      {/* Legal Disclaimer */}
      <div className="pt-6 border-t border-[#E7DFD5] text-xs text-[#78716C] italic">
        Reminder: This content is drafted for operational transparency and should be reviewed and approved by a qualified Indian legal practitioner before publishing.
      </div>
    </LegalPageLayout>
  );
}
