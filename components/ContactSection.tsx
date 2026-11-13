"use client"

import React, { useState } from "react"
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, AlertCircle } from "lucide-react"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!formData.name.trim()) errs.name = "Please enter your name"
    if (!formData.email.trim()) {
      errs.email = "Please enter your email address"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please enter a valid email address"
    }
    if (!formData.subject.trim()) errs.subject = "Please enter a subject"
    if (!formData.message.trim()) errs.message = "Please write your message"
    return errs
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)

    if (Object.keys(errs).length === 0) {
      setIsSubmitting(true)
      setTimeout(() => {
        setIsSubmitting(false)
        setIsSubmitted(true)
        setFormData({ name: "", email: "", subject: "", message: "" })
      }, 700)
    }
  }

  return (
    <section id="contact" className="py-24 bg-[#faf7f2] border-t border-[#e7dfd5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f4ede4] border border-[#e7dfd5] text-xs font-semibold text-[#c96342] uppercase tracking-wider mb-3">
            <span>GET IN TOUCH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1c1917] tracking-tight">
            Let&apos;s Stay Connected.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#57534e]">
            Whether you&apos;re planning a dinner, asking about ingredients or looking to collaborate, we&apos;re always here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Contact Details, Hours & Socials */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white rounded-2xl border border-[#e7dfd5] p-8 shadow-2xs space-y-6">
              <h3 className="font-serif text-xl font-medium text-[#1c1917] pb-4 border-b border-[#e7dfd5]">
                Restaurant Information
              </h3>

              <div className="space-y-5 text-sm text-[#57534e]">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-[#f4ede4] flex items-center justify-center shrink-0 text-[#c96342]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-[#78716c]">
                      Address
                    </span>
                    <span className="font-medium text-[#1c1917]">
                      42 Heritage Lane, Culinary District, Metro 10001
                    </span>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-[#f4ede4] flex items-center justify-center shrink-0 text-[#c96342]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-[#78716c]">
                      Phone
                    </span>
                    <a href="tel:+15552345678" className="font-medium text-[#1c1917] hover:text-[#c96342] transition-colors">
                      +1 (555) 234-5678
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-[#f4ede4] flex items-center justify-center shrink-0 text-[#c96342]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-[#78716c]">
                      Email
                    </span>
                    <a href="mailto:hello@thecornertable.com" className="font-medium text-[#1c1917] hover:text-[#c96342] transition-colors">
                      hello@thecornertable.com
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-[#f4ede4] flex items-center justify-center shrink-0 text-[#c96342]">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-[#78716c]">
                      Kitchen & Dine-In Hours
                    </span>
                    <div className="mt-1 space-y-1 text-xs">
                      <div className="flex justify-between gap-4 font-medium text-[#1c1917]">
                        <span>Mon – Thu:</span>
                        <span>11:30 AM – 10:00 PM</span>
                      </div>
                      <div className="flex justify-between gap-4 font-medium text-[#1c1917]">
                        <span>Fri – Sun:</span>
                        <span>11:00 AM – 11:00 PM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links Box */}
            <div className="bg-white rounded-2xl border border-[#e7dfd5] p-6 shadow-2xs flex items-center justify-between">
              <span className="text-sm font-medium text-[#1c1917]">
                Follow Our Kitchen Journey
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full bg-[#f4ede4] hover:bg-[#c96342] text-[#57534e] hover:text-white flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full bg-[#f4ede4] hover:bg-[#c96342] text-[#57534e] hover:text-white flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.667 5H18V0h-3.808C10.595 0 9 1.583 9 4.615V8z" />
                  </svg>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full bg-[#f4ede4] hover:bg-[#c96342] text-[#57534e] hover:text-white flex items-center justify-center transition-colors"
                  aria-label="Twitter"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Stateful Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-[#e7dfd5] p-8 sm:p-10 shadow-2xs">
              <h3 className="font-serif text-2xl font-medium text-[#1c1917] mb-2">
                Send Us a Note
              </h3>
              <p className="text-xs sm:text-sm text-[#57534e] mb-8">
                Fill in the details below and our team will respond within 24 hours.
              </p>

              {isSubmitted ? (
                <div className="p-8 rounded-2xl bg-[#f4ede4] border border-[#e7dfd5] text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#2e7d32]/10 text-[#2e7d32] mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-xl font-medium text-[#1c1917]">
                    Message Delivered
                  </h4>
                  <p className="text-sm text-[#57534e] max-w-md mx-auto leading-relaxed">
                    Thank you! Your message has been sent. We&apos;ll get back to you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-full bg-[#c96342] text-white text-xs font-medium hover:bg-[#a84d31] transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {/* Full Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-[#1c1917] mb-1.5 uppercase tracking-wider">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value })
                          if (errors.name) setErrors({ ...errors, name: "" })
                        }}
                        placeholder="Jane Doe"
                        className={`w-full px-4 py-3 rounded-xl bg-[#faf7f2] border ${
                          errors.name ? "border-red-400" : "border-[#e7dfd5]"
                        } text-sm text-[#1c1917] focus:outline-none focus:ring-2 focus:ring-[#c96342]/20 focus:border-[#c96342] transition-all`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1c1917] mb-1.5 uppercase tracking-wider">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value })
                          if (errors.email) setErrors({ ...errors, email: "" })
                        }}
                        placeholder="jane@example.com"
                        className={`w-full px-4 py-3 rounded-xl bg-[#faf7f2] border ${
                          errors.email ? "border-red-400" : "border-[#e7dfd5]"
                        } text-sm text-[#1c1917] focus:outline-none focus:ring-2 focus:ring-[#c96342]/20 focus:border-[#c96342] transition-all`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-semibold text-[#1c1917] mb-1.5 uppercase tracking-wider">
                      Subject *
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => {
                        setFormData({ ...formData, subject: e.target.value })
                        if (errors.subject) setErrors({ ...errors, subject: "" })
                      }}
                      placeholder="Table reservation inquiry, catering, or feedback"
                      className={`w-full px-4 py-3 rounded-xl bg-[#faf7f2] border ${
                        errors.subject ? "border-red-400" : "border-[#e7dfd5]"
                      } text-sm text-[#1c1917] focus:outline-none focus:ring-2 focus:ring-[#c96342]/20 focus:border-[#c96342] transition-all`}
                    />
                    {errors.subject && (
                      <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.subject}</span>
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-semibold text-[#1c1917] mb-1.5 uppercase tracking-wider">
                      Message *
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value })
                        if (errors.message) setErrors({ ...errors, message: "" })
                      }}
                      placeholder="Tell us what you have in mind..."
                      className={`w-full px-4 py-3 rounded-xl bg-[#faf7f2] border ${
                        errors.message ? "border-red-400" : "border-[#e7dfd5]"
                      } text-sm text-[#1c1917] focus:outline-none focus:ring-2 focus:ring-[#c96342]/20 focus:border-[#c96342] transition-all`}
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#c96342] hover:bg-[#a84d31] disabled:opacity-50 text-white font-medium text-sm transition-all shadow-xs hover:shadow active:scale-95 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
