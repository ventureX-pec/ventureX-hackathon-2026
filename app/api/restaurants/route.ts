import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseServer";
import { RESTAURANTS } from "@/data/mockCustomerData";

export interface RestaurantInfo {
  id: string;
  name: string;
  slug: string;
  address?: string;
  phone?: string;
}

// 6 Real Campus Partner Restaurants matching the storefront catalog
export const BASELINE_RESTAURANTS: RestaurantInfo[] = [
  {
    id: "corner-cafe",
    name: "The Corner Café",
    slug: "corner-cafe",
    address: "Courtyard Wing • Block A",
    phone: "+91 98765 43210",
  },
  {
    id: "burger-house",
    name: "Burger House",
    slug: "burger-house",
    address: "Block A • Food Court",
    phone: "+91 98111 22334",
  },
  {
    id: "pizza-palace",
    name: "Pizza Palace",
    slug: "pizza-palace",
    address: "Main Commons • Stall 03",
    phone: "+91 98222 33445",
  },
  {
    id: "sushi-world",
    name: "Sushi World",
    slug: "sushi-world",
    address: "East Wing Courtyard",
    phone: "+91 98333 44556",
  },
  {
    id: "healthy-bites",
    name: "Healthy Bites",
    slug: "healthy-bites",
    address: "Sports Complex Kiosk",
    phone: "+91 98444 55667",
  },
  {
    id: "tandoor-hub",
    name: "Tandoor & Curry Hub",
    slug: "tandoor-hub",
    address: "Hostel Zone Dine Hall",
    phone: "+91 98555 66778",
  },
];

// GET /api/restaurants or /api/restaurants?slug=corner-cafe
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    const supabase = getSupabaseAdmin();
    if (supabase) {
      let query = supabase.from("restaurants").select("*");
      if (slug) {
        query = query.eq("slug", slug);
      }

      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        if (slug) {
          return NextResponse.json({ success: true, restaurant: data[0] });
        }
        return NextResponse.json({ success: true, restaurants: data });
      }
    }

    // Fallback to baseline restaurants
    if (slug) {
      const normalized = slug.toLowerCase().trim();
      const match =
        BASELINE_RESTAURANTS.find(
          (r) =>
            r.slug === normalized ||
            r.id === normalized ||
            (normalized === "the-corner-table" && r.id === "corner-cafe") ||
            (normalized === "the-corner-cafe" && r.id === "corner-cafe") ||
            (normalized === "sushi-bay" && r.id === "sushi-world")
        ) || BASELINE_RESTAURANTS[0];
      return NextResponse.json({ success: true, restaurant: match, source: "baseline" });
    }

    return NextResponse.json({
      success: true,
      restaurants: BASELINE_RESTAURANTS,
      source: "baseline",
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
