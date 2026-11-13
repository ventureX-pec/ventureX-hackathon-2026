-- ==============================================================================
-- ServeZa Migration 02: Table QR Code Ordering System
-- Run this in your Supabase SQL Editor (Dashboard > SQL Editor)
-- ==============================================================================

-- 1. Create Restaurants Table
CREATE TABLE IF NOT EXISTS public.restaurants (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  cuisine TEXT,
  tagline TEXT,
  image TEXT,
  location TEXT,
  is_open BOOLEAN DEFAULT true,
  owner_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Create Restaurant Tables (QR Tables) Table
CREATE TABLE IF NOT EXISTS public.restaurant_tables (
  id TEXT PRIMARY KEY,
  restaurant_id TEXT NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
  table_number TEXT NOT NULL,
  capacity INT DEFAULT 4,
  seating_area TEXT DEFAULT 'Main Hall',
  status TEXT NOT NULL CHECK (status IN ('available', 'occupied', 'reserved', 'inactive')) DEFAULT 'available',
  qr_code_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_restaurant_table UNIQUE (restaurant_id, table_number)
);

-- 3. Enhance public.orders Table with Restaurant and Table Foreign Keys
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'orders' AND column_name = 'restaurant_id') THEN
    ALTER TABLE public.orders ADD COLUMN restaurant_id TEXT REFERENCES public.restaurants(id) ON DELETE SET NULL;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'orders' AND column_name = 'table_id') THEN
    ALTER TABLE public.orders ADD COLUMN table_id TEXT REFERENCES public.restaurant_tables(id) ON DELETE SET NULL;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'orders' AND column_name = 'table_number') THEN
    ALTER TABLE public.orders ADD COLUMN table_number TEXT;
  END IF;
END $$;

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.restaurant_tables ENABLE ROW LEVEL SECURITY;

-- 5. Permissions: Grant usage to anon, authenticated, and service_role
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.restaurants TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.restaurant_tables TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.orders TO anon, authenticated, service_role;

-- 6. RLS Policies
-- Anyone can view restaurants and tables
DROP POLICY IF EXISTS "Public can view restaurants" ON public.restaurants;
CREATE POLICY "Public can view restaurants"
  ON public.restaurants FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Owners and admins manage restaurants" ON public.restaurants;
CREATE POLICY "Owners and admins manage restaurants"
  ON public.restaurants FOR ALL
  USING (true);

DROP POLICY IF EXISTS "Public can view tables" ON public.restaurant_tables;
CREATE POLICY "Public can view tables"
  ON public.restaurant_tables FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Owners and admins manage tables" ON public.restaurant_tables;
CREATE POLICY "Owners and admins manage tables"
  ON public.restaurant_tables FOR ALL
  USING (true);

-- Ensure orders can be inserted and queried by table orders
DROP POLICY IF EXISTS "Allow select on orders" ON public.orders;
CREATE POLICY "Allow select on orders"
  ON public.orders FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Allow insert on orders" ON public.orders;
CREATE POLICY "Allow insert on orders"
  ON public.orders FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow update on orders" ON public.orders;
CREATE POLICY "Allow update on orders"
  ON public.orders FOR UPDATE
  USING (true);

-- 7. Seed Baseline Restaurants
INSERT INTO public.restaurants (id, name, slug, cuisine, tagline, image, location)
VALUES
  ('the-corner-table', 'The Corner Table', 'the-corner-table', 'Artisanal Cafe & Bakery', 'Specialty brews, flaky croissants & hearth sourdough', 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80', 'Courtyard Wing • Block A'),
  ('burger-house', 'Burger House', 'burger-house', 'American Gourmet Smashed Burgers', 'Dry-aged patties, brioche buns & truffle fries', 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80', 'Central Food Court • Stall 03'),
  ('pizza-palace', 'Pizza Palace', 'pizza-palace', 'Woodfired Neapolitan Pizza', 'Fermented sourdough crust, San Marzano tomatoes & fresh buffalo mozzarella', 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80', 'Courtyard Patio • Stall 05'),
  ('sushi-world', 'Sushi World', 'sushi-world', 'Japanese Nigiri & Hand Rolls', 'Sashimi-grade seafood, seasoned sushi rice & artisan rolls', 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80', 'Gourmet Pavilion • Level 1'),
  ('healthy-bites', 'Healthy Bites', 'healthy-bites', 'Organic Bowls & Cold Pressed Juices', 'Wholesome greens, farm-fresh avocados & cold-pressed tonics', 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80', 'Wellness Hall • Stall 08'),
  ('tandoor-hub', 'Tandoor & Curry Hub', 'tandoor-hub', 'North Indian Clay Oven Specialties', 'Slow-cooked gravies, smoky kebabs & butter garlic naans', 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80', 'Heritage Kitchens • Stall 02')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  cuisine = EXCLUDED.cuisine,
  image = EXCLUDED.image,
  location = EXCLUDED.location;

-- 8. Seed Baseline Restaurant Tables (T01 - T06 for The Corner Table & Burger House)
INSERT INTO public.restaurant_tables (id, restaurant_id, table_number, capacity, seating_area, status)
VALUES
  ('tbl_corner_T01', 'the-corner-table', 'T01', 2, 'Window Nook', 'available'),
  ('tbl_corner_T02', 'the-corner-table', 'T02', 4, 'Main Dining Hall', 'available'),
  ('tbl_corner_T03', 'the-corner-table', 'T03', 4, 'Main Dining Hall', 'available'),
  ('tbl_corner_T04', 'the-corner-table', 'T04', 6, 'Outdoor Garden Patio', 'available'),
  ('tbl_corner_T05', 'the-corner-table', 'T05', 2, 'Espresso Bar Counter', 'available'),
  ('tbl_corner_T06', 'the-corner-table', 'T06', 8, 'Private Dining Booth', 'available'),
  ('tbl_burger_T01', 'burger-house', 'T01', 2, 'Front Patio', 'available'),
  ('tbl_burger_T02', 'burger-house', 'T02', 4, 'Center Hall', 'available'),
  ('tbl_burger_T03', 'burger-house', 'T03', 4, 'Center Hall', 'available'),
  ('tbl_burger_T04', 'burger-house', 'T04', 6, 'Family Booth', 'available')
ON CONFLICT (restaurant_id, table_number) DO NOTHING;
