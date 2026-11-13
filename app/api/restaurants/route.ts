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

// Baseline restaurants
const BASELINE_RESTAURANTS: RestaurantInfo[] = [
  {
    id: "rest-001",
    name: "The Corner Table",
    slug: "the-corner-table",
    address: "Connaught Place, New Delhi",
    phone: "+91 98765 43210",
  },
  {
    id: "rest-002",
    name: "Burger House & Grill",
    slug: "burger-house",
    address: "Indiranagar, Bangalore",
    phone: "+91 98111 22334",
  },
  {
    id: "rest-003",
    name: "Sushi Bay & Asian Bowls",
    slug: "sushi-bay",
    address: "Bandra West, Mumbai",
    phone: "+91 98222 33445",
  },
];

// GET /api/restaurants or /api/restaurants?slug=the-corner-table
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
      const match =
        BASELINE_RESTAURANTS.find((r) => r.slug === slug || r.id === slug) ||
        BASELINE_RESTAURANTS[0];
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
