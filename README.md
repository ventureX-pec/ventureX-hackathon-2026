<div align="center">

# 🍽️ ServeZa — Kitchen & Hearth
### Artisanal Campus Dining, Contactless Table QR Ordering & Live Kitchen Display (KDS)

[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3-blue?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Vercel Deployment](https://img.shields.io/badge/Deployed-Vercel-black?style=for-the-badge&logo=vercel&logoColor=white)](https://venture-x-hackathon-2026.vercel.app)

<br />

### 🌐 Live Production Deployment
**[👉 Click Here to Launch ServeZa Live](https://venture-x-hackathon-2026.vercel.app)**

```
Production URL: https://venture-x-hackathon-2026.vercel.app
```

---

</div>

## 📌 Executive Summary

**ServeZa** is a high-performance, full-stack digital dining platform built for **VentureX Hackathon 2026**. Designed specifically to eliminate campus cafeteria congestion and long ordering counter queues, ServeZa replaces fragmented paper receipts and order chaos with an end-to-end synchronized dining ecosystem:

1. **Pre-Order & Express Pickup**: Students order ahead from dorms or lecture halls, pay seamlessly with 1-tap UPI, and grab fresh food right as it is packed.
2. **Contactless Dine-In Table QR Ordering**: Diners scan a dynamic table QR standee to view real-time menus bound to their specific table.
3. **Synchronized Kitchen Display System (KDS)**: Live kitchen pipeline with real-time status transitions, ingredient stock decrement, and one-click store live/pause toggles.

---

## 🚀 Key Live Portals

| Portal | URL Route | Description |
| :--- | :--- | :--- |
| **Landing Showcase** | [`/`](https://venture-x-hackathon-2026.vercel.app) | Cinematic luxury landing page with smooth GSAP dish orbit pinning, interactive how-it-works cards, and brand storytelling. |
| **Customer Storefront** | [`/customer`](https://venture-x-hackathon-2026.vercel.app/customer) | Browse campus cafes, filter by dietary requirements (100% Pure Veg), customize dishes, track previous orders, and pay with UPI. |
| **Kitchen Admin & KDS** | [`/admin`](https://venture-x-hackathon-2026.vercel.app/admin) | Real-time chef dashboard, live order pipeline, ingredient stock warnings, staff scheduling, table standee generator, and store live toggle. |
| **Table QR Ordering** | [`/r/corner-cafe/menu?table=T01`](https://venture-x-hackathon-2026.vercel.app/r/corner-cafe/menu?table=T01) | Direct guest table ordering experience with auto table-binding and instant kitchen routing. |
| **Auth & Gateway** | [`/login`](https://venture-x-hackathon-2026.vercel.app/login) | Dual-role authentication gateway powered by Supabase with separate Customer and Staff/Admin portals. |

---

## ✨ Core Features & Innovations

### 1. ⚡ Store Live & Orders Paused Governor (Real-Time)
- Located directly in the Admin Header, allowing chefs to toggle between **`Accepting Orders` (Live)** and **`Orders Paused` (Paused)** with one click.
- Instantly propagates across all open customer tabs via cross-tab `BroadcastChannel` and Custom Events:
  - Displays a live warning banner on the customer portal.
  - Automatically freezes new checkout attempts to protect the kitchen during rush hours.

### 2. 📱 Contactless Smart Table QR Code Engine
- Automatically generates SVG & PNG table standees with embedded cryptographic table identifiers.
- Diners scan the standee on Table `T-01` to `T-16` to launch an instant ordering flow without downloading any native app.

### 3. 🍳 Real-Time Kitchen Display System (KDS)
- Kanban state machine: `Received` ➔ `Preparing` ➔ `Ready for Shelf` ➔ `Completed`.
- Live cooking countdown timers, allergen warnings, and custom customer preparation notes.

### 4. 📦 Dynamic Inventory & Ingredient Stock Depletion
- Real-time stock decrement when orders are placed.
- Low-stock threshold alerts preventing orders for depleted kitchen supplies.

### 5. 🛡️ 100% Free-Tier & Resilient Architecture
- Built on Supabase Cloud PostgreSQL with Row Level Security (RLS).
- Zero-cost architecture ready for campus-wide adoption ($0/mo recurring infrastructure cost).

---

## 🛠️ Tech Stack & Architecture

```
┌────────────────────────────────────────────────────────┐
│                   Next.js 16 (App Router)              │
│       React 19 • TypeScript • Tailwind CSS v4          │
└───────────────────────────┬────────────────────────────┘
                            │
        ┌───────────────────┴───────────────────┐
        ▼                                       ▼
┌─────────────────────────┐           ┌─────────────────────────┐
│     Customer Portal     │           │   Admin / Kitchen KDS   │
│  • Visual Menu Catalog  │           │  • Live Order Pipeline  │
│  • 1-Tap UPI Checkout   │◄─────────►│  • Live/Pause Governor  │
│  • Real-Time Order Sync │           │  • Stock & QR Standees  │
└─────────────────────────┘           └─────────────────────────┘
                            │
                            ▼
        ┌───────────────────────────────────────┐
        │        Supabase Cloud PostgreSQL      │
        │  • Realtime Replication & WebSockets  │
        │  • Row Level Security (RLS)           │
        └───────────────────────────────────────┘
```

- **Framework**: [Next.js 16.4](https://nextjs.org/) (App Router & Turbopack)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://motion.dev/) & [GSAP ScrollTrigger](https://greensock.com/)
- **Database & Auth**: [Supabase](https://supabase.com/) (PostgreSQL & GoTrue)
- **Deployment**: [Vercel](https://vercel.com/)

---

## 🏁 Quickstart / Local Development

Follow these steps to run ServeZa on your local machine:

### 1. Prerequisites
- **Node.js** (v18.18 or higher)
- **npm** (v9 or higher)

### 2. Clone the Repository
```bash
git clone https://github.com/ventureX-pec/ventureX-hackathon-2026.git
cd ventureX-hackathon-2026
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```
*(Note: If Supabase credentials are not provided, ServeZa seamlessly falls back to resilient local mock storage so all portals run smoothly without any setup!)*

### 5. Start the Development Server
```bash
npm run dev
```

Open your browser and navigate to:
- 🌐 **Landing Page**: [http://localhost:3000](http://localhost:3000)
- 🛒 **Customer Portal**: [http://localhost:3000/customer](http://localhost:3000/customer)
- 👨‍🍳 **Admin & Kitchen KDS**: [http://localhost:3000/admin](http://localhost:3000/admin)

### 6. Build for Production
```bash
npm run build
npm run start
```

---

## 👥 Team neXora — VentureX 2026
- **Project**: ServeZa (Kitchen & Hearth)
- **Event**: VentureX Hackathon 2026
- **Institution**: Punjab Engineering College (PEC), Chandigarh

---

<div align="center">
  <sub>Built with ❤️ by Team neXora for VentureX Hackathon 2026</sub>
</div>
