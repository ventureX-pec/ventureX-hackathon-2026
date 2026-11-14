import React from "react";
import LegalPageLayout from "@/components/LegalPageLayout";

export const metadata = {
  title: "Privacy Policy | ServeZa – Kitchen & Hearth",
  description:
    "Privacy Policy for ServeZa – Kitchen & Hearth, complying with India's Digital Personal Data Protection Act, 2023.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      badge="Legal & Transparency"
      title="Privacy Policy"
      subtitle="How ServeZa – Kitchen & Hearth collects, cares for, and protects your personal data in accordance with India's Digital Personal Data Protection Act, 2023."
      lastUpdated="November 14, 2026"
    >
      {/* The Short Version */}
      <section className="bg-[#FAF7F2] border border-[#E7DFD5] rounded-2xl p-6 sm:p-7">
        <h2 className="font-serif text-xl font-bold text-[#1c1917] mb-2">
          The Short Version
        </h2>
        <p className="text-sm text-[#57534E] leading-relaxed">
          At ServeZa – Kitchen & Hearth, we believe honest hospitality starts with trust. We collect only the information we need to welcome you to our tables, prepare your pickup orders, and share seasonal menu notes if you ask for them. We never sell your personal details, we protect your data using strict security standards, and you remain in control of your rights under India&apos;s Digital Personal Data Protection Act, 2023.
        </p>
      </section>

      {/* 1. About Us */}
      <section className="space-y-3">
        <h2 className="font-serif text-2xl font-bold text-[#1c1917]">
          1. About Us and This Policy
        </h2>
        <p className="text-sm text-[#57534E] leading-relaxed">
          ServeZa (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates the restaurant, table reservation desk, and digital ordering counter for <strong>ServeZa – Kitchen & Hearth</strong>, based in Bengaluru, Karnataka, India. This digital platform is owned and operated by <strong>ServeZa Hospitality Private Limited</strong>, having its registered office at <strong>Plot No. 42, 100 Feet Road, Indiranagar</strong>.
        </p>
        <p className="text-sm text-[#57534E] leading-relaxed">
          Our culinary operations are licensed under FSSAI License No.: <strong>11224333000521</strong> and GSTIN: <strong>29AAGCS1234F1Z8</strong>. This Privacy Policy outlines our practices regarding the collection, processing, storage, and transfer of your personal data under the <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong> and the <strong>Information Technology Act, 2000</strong>.
        </p>
      </section>

      {/* 2. What We Collect and Why */}
      <section className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[#1c1917]">
          2. Personal Data We Collect &amp; Why We Collect It
        </h2>
        <p className="text-sm text-[#57534E] leading-relaxed">
          We collect personal data directly from you when you interact with our website. Here is exactly what we collect and why:
        </p>

        <div className="space-y-4 pl-1">
          <div className="border-l-2 border-[#c96342] pl-4">
            <h3 className="font-serif text-base font-bold text-[#1c1917]">
              A. Table Reservations &amp; Private Gatherings
            </h3>
            <p className="text-xs sm:text-sm text-[#57534E] mt-1 leading-relaxed">
              <strong>Data:</strong> Your full name, telephone number, email address, date, time of visit, party size, and any special requests or celebration notes.
            </p>
            <p className="text-xs sm:text-sm text-[#57534E] mt-0.5 leading-relaxed">
              <strong>Purpose:</strong> To confirm your booking, hold your table during our 15-minute window, manage seating capacity, and coordinate bespoke private event arrangements.
            </p>
          </div>

          <div className="border-l-2 border-[#c96342] pl-4">
            <h3 className="font-serif text-base font-bold text-[#1c1917]">
              B. Online Ordering &amp; Counter Pickup Queue
            </h3>
            <p className="text-xs sm:text-sm text-[#57534E] mt-1 leading-relaxed">
              <strong>Data:</strong> Your name, phone number, email address, selected dishes, order history, and assigned pickup token receipts.
            </p>
            <p className="text-xs sm:text-sm text-[#57534E] mt-0.5 leading-relaxed">
              <strong>Purpose:</strong> To fire your order live at our hearth, communicate pickup preparation timings, issue your token number, and verify your receipt at the pickup counter.
            </p>
          </div>

          <div className="border-l-2 border-[#c96342] pl-4">
            <h3 className="font-serif text-base font-bold text-[#1c1917]">
              C. Dietary &amp; Allergy Notes
            </h3>
            <p className="text-xs sm:text-sm text-[#57534E] mt-1 leading-relaxed">
              <strong>Data:</strong> Dietary preferences, ingredient intolerances, or specific allergy notices that you voluntarily enter while reserving or ordering.
            </p>
            <p className="text-xs sm:text-sm text-[#57534E] mt-0.5 leading-relaxed">
              <strong>Purpose:</strong> To notify our culinary and service staff so they can take appropriate safety precautions in our open kitchen.
            </p>
          </div>

          <div className="border-l-2 border-[#c96342] pl-4">
            <h3 className="font-serif text-base font-bold text-[#1c1917]">
              D. Customer Sign-In &amp; Accounts
            </h3>
            <p className="text-xs sm:text-sm text-[#57534E] mt-1 leading-relaxed">
              <strong>Data:</strong> Login credentials (name, email address, secure encrypted password). <em>Note: Our staff and kitchen management portals are strictly private internal tools and are not accessible to the public.</em>
            </p>
            <p className="text-xs sm:text-sm text-[#57534E] mt-0.5 leading-relaxed">
              <strong>Purpose:</strong> To allow you to manage saved dishes, view order tokens, and access booking records.
            </p>
          </div>

          <div className="border-l-2 border-[#c96342] pl-4">
            <h3 className="font-serif text-base font-bold text-[#1c1917]">
              E. Payment Confirmation Details
            </h3>
            <p className="text-xs sm:text-sm text-[#57534E] mt-1 leading-relaxed">
              <strong>Data:</strong> Transaction reference IDs, payment status, timestamp, and payment method confirmation from our payment processor, <strong>Razorpay</strong>.
            </p>
            <p className="text-xs sm:text-sm text-[#57534E] mt-0.5 leading-relaxed">
              <strong>Important:</strong> <strong>ServeZa never stores your complete credit/debit card numbers, CVVs, or UPI PINs.</strong> All payment sessions are encrypted and handled directly by PCI-DSS certified gateway partners.
            </p>
          </div>

          <div className="border-l-2 border-[#c96342] pl-4">
            <h3 className="font-serif text-base font-bold text-[#1c1917]">
              F. Device &amp; Cookie Analytics
            </h3>
            <p className="text-xs sm:text-sm text-[#57534E] mt-1 leading-relaxed">
              <strong>Data:</strong> IP address, browser type, device information, and session cookies.
            </p>
            <p className="text-xs sm:text-sm text-[#57534E] mt-0.5 leading-relaxed">
              <strong>Purpose:</strong> To maintain your active browsing session, prevent fraudulent activities, and analyze website traffic to improve digital menu performance.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Lawful Basis & Consent */}
      <section className="space-y-3">
        <h2 className="font-serif text-2xl font-bold text-[#1c1917]">
          3. Lawful Basis for Processing &amp; Your Consent
        </h2>
        <p className="text-sm text-[#57534E] leading-relaxed">
          Under the DPDP Act, 2023, we process your personal data primarily on the basis of your <strong>free, specific, informed, unconditional, and unambiguous consent</strong>, indicated when you submit a reservation, place an order, create an account, or subscribe to our updates.
        </p>
        <p className="text-sm text-[#57534E] leading-relaxed">
          Certain processing activities are also carried out to perform our hospitality contract with you (cooking your order, holding your table) or to fulfill statutory obligations under Indian law (FSSAI records, tax audits, and accounting compliances). You may withdraw consent at any time, subject to statutory retention requirements.
        </p>
      </section>

      {/* 4. Seasonal Notes Newsletter */}
      <section className="space-y-3">
        <h2 className="font-serif text-2xl font-bold text-[#1c1917]">
          4. &quot;Seasonal Notes&quot; Newsletter – Zero Spam Promise
        </h2>
        <p className="text-sm text-[#57534E] leading-relaxed">
          When you subscribe to <strong>Seasonal Notes</strong>, we occasionally email you stories from our hearth: seasonal menu introductions, chef tastings, and holiday kitchen specials.
        </p>
        <p className="text-sm text-[#57534E] leading-relaxed">
          <strong>Zero Spam:</strong> We never sell or share your inbox address with advertisers. Every newsletter issue contains a clear, <strong>one-click unsubscribe link</strong> at the bottom. You can also email us at concierge@serveza.in to be removed immediately.
        </p>
      </section>

      {/* 5. Cookies */}
      <section className="space-y-3">
        <h2 className="font-serif text-2xl font-bold text-[#1c1917]">
          5. Cookies and Web Storage
        </h2>
        <p className="text-sm text-[#57534E] leading-relaxed">
          We use strictly necessary cookies to keep our digital counter responsive, save your dietary preferences during your visit, and secure customer sign-in. Basic performance cookies help us identify slow-loading pages. You can adjust your browser settings to refuse non-essential cookies at any time.
        </p>
      </section>

      {/* 6. Third-Party Data Processors */}
      <section className="space-y-3">
        <h2 className="font-serif text-2xl font-bold text-[#1c1917]">
          6. Sharing with Trusted Data Processors
        </h2>
        <p className="text-sm text-[#57534E] leading-relaxed">
          We do not sell personal data. We engage vetted third-party service providers (data processors) strictly to support our business operations:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm text-[#57534E]">
          <li><strong>Payment Gateway:</strong> Razorpay for payment authorization and refunds.</li>
          <li><strong>Email &amp; Communications:</strong> Resend for reservation confirmations, pickup alerts, and Seasonal Notes.</li>
          <li><strong>Hosting &amp; Analytics:</strong> Vercel Cloud Infrastructure & Google Analytics for secure cloud infrastructure and website uptime monitoring.</li>
          <li><strong>Statutory Authorities:</strong> Indian food safety authorities (FSSAI), tax departments, or law enforcement agencies only when legally mandated by a valid court order or statutory inquiry.</li>
        </ul>
      </section>

      {/* 7. Retention Periods */}
      <section className="space-y-3">
        <h2 className="font-serif text-2xl font-bold text-[#1c1917]">
          7. How Long We Keep Your Data
        </h2>
        <p className="text-sm text-[#57534E] leading-relaxed">
          We retain your personal data only as long as necessary to fulfill the purpose for which it was collected:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm text-[#57534E]">
          <li><strong>Order &amp; Billing Records:</strong> Maintained for 7 years to comply with statutory accounting, GST, and tax regulations in India.</li>
          <li><strong>Reservation Logs:</strong> Retained for 1 year after dining to assist customer service and guest preferences.</li>
          <li><strong>Customer Accounts:</strong> Retained until you request account deletion or closure.</li>
          <li><strong>Newsletter Subscriptions:</strong> Retained until you click unsubscribe or request removal.</li>
        </ul>
      </section>

      {/* 8. Security Measures */}
      <section className="space-y-3">
        <h2 className="font-serif text-2xl font-bold text-[#1c1917]">
          8. Security Measures
        </h2>
        <p className="text-sm text-[#57534E] leading-relaxed">
          We implement technical and organizational security measures to protect your data, including HTTPS/TLS encryption across our website, encrypted password storage, access-controlled staff systems, and isolated internal administrative databases. While no digital platform is 100% invulnerable, we regularly review our safeguards to protect your personal details against unauthorized access.
        </p>
      </section>

      {/* 9. Your Rights */}
      <section className="space-y-3">
        <h2 className="font-serif text-2xl font-bold text-[#1c1917]">
          9. Your Rights Under Indian Law
        </h2>
        <p className="text-sm text-[#57534E] leading-relaxed">
          Under the Digital Personal Data Protection Act, 2023, you have the following rights as a Data Principal:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-sm text-[#57534E]">
          <li><strong>Right to Access:</strong> You may request a summary of the personal data we hold about you and the processing activities undertaken.</li>
          <li><strong>Right to Correction &amp; Erasure:</strong> You can ask us to update inaccurate details or erase your personal data when it is no longer required for its original purpose.</li>
          <li><strong>Right to Withdraw Consent:</strong> You can withdraw consent for voluntary communications at any time.</li>
          <li><strong>Right to Nominate:</strong> You may designate an individual who may exercise your rights in the event of death or incapacity.</li>
          <li><strong>Right of Grievance Redressal:</strong> You may file a complaint with our Grievance Officer regarding any data-handling concern.</li>
        </ul>
      </section>

      {/* 10. Children's Data */}
      <section className="space-y-3">
        <h2 className="font-serif text-2xl font-bold text-[#1c1917]">
          10. Children&apos;s Personal Data
        </h2>
        <p className="text-sm text-[#57534E] leading-relaxed">
          Our online reservation and ordering services are directed to adults aged 18 and older. We do not knowingly collect personal data from individuals under 18 years without verified parental or legal guardian consent. If you are under 18, please have a parent or guardian place orders or make reservations on your behalf.
        </p>
      </section>

      {/* 11. Data Breach Handling */}
      <section className="space-y-3">
        <h2 className="font-serif text-2xl font-bold text-[#1c1917]">
          11. Data Breach Notification
        </h2>
        <p className="text-sm text-[#57534E] leading-relaxed">
          In the unlikely event of a personal data breach affecting your information, we will immediately execute our incident response protocol and notify the <strong>Data Protection Board of India</strong> and affected individuals in accordance with prescribed legal procedures under the DPDP Act.
        </p>
      </section>

      {/* 12. Grievance Officer */}
      <section className="space-y-3">
        <h2 className="font-serif text-2xl font-bold text-[#1c1917]">
          12. Grievance Redressal Officer
        </h2>
        <p className="text-sm text-[#57534E] leading-relaxed">
          If you have questions, wish to exercise your rights, or wish to report a privacy concern, please contact our designated Grievance Officer:
        </p>
        <div className="bg-[#FAF7F2] border border-[#E7DFD5] rounded-2xl p-5 text-sm text-[#57534E] space-y-1.5">
          <p><strong>Name:</strong> Rohan Mehta</p>
          <p><strong>Designation:</strong> Compliance &amp; Guest Relations Manager</p>
          <p><strong>Entity:</strong> ServeZa (ServeZa Hospitality Private Limited)</p>
          <p><strong>Address:</strong> Plot No. 42, 100 Feet Road, Indiranagar, Bengaluru, Karnataka 560038, India</p>
          <p><strong>Email:</strong> concierge@serveza.in</p>
          <p><strong>Phone:</strong> +91 (80) 4123-7890</p>
          <p className="text-xs text-[#78716C] pt-1">
            We will acknowledge grievances within 48 hours and strive to resolve them within 30 days as stipulated by Indian regulations.
          </p>
        </div>
      </section>

      {/* 13. Changes to this Policy */}
      <section className="space-y-3">
        <h2 className="font-serif text-2xl font-bold text-[#1c1917]">
          13. Policy Updates
        </h2>
        <p className="text-sm text-[#57534E] leading-relaxed">
          We may update this Privacy Policy from time to time to reflect changes in our kitchen services or Indian legal standards. When revised, the &quot;Last updated&quot; date at the top will be updated. We encourage you to review this page periodically.
        </p>
      </section>

      {/* Legal Disclaimer */}
      <div className="pt-6 border-t border-[#E7DFD5] text-xs text-[#78716C] italic">
        Reminder: This content is drafted for operational transparency and should be reviewed and approved by a qualified Indian legal practitioner before publishing.
      </div>
    </LegalPageLayout>
  );
}
