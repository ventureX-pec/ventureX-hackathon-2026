import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseServer";
import { generateTableMenuUrl } from "@/lib/qrGenerator";

export interface RestaurantTable {
  id: string;
  restaurant_id: string;
  table_number: string;
  capacity: number;
  seating_area: string;
  status: "available" | "occupied" | "reserved" | "inactive";
  qr_code_url?: string;
  created_at?: string;
}

// Initial baseline tables used as fallback and initial seeding
export const INITIAL_TABLES: Record<string, RestaurantTable[]> = {
  "the-corner-table": [
    {
      id: "tbl_corner_T01",
      restaurant_id: "the-corner-table",
      table_number: "T01",
      capacity: 2,
      seating_area: "Window Nook",
      status: "available",
    },
    {
      id: "tbl_corner_T02",
      restaurant_id: "the-corner-table",
      table_number: "T02",
      capacity: 4,
      seating_area: "Main Dining Hall",
      status: "occupied",
    },
    {
      id: "tbl_corner_T03",
      restaurant_id: "the-corner-table",
      table_number: "T03",
      capacity: 4,
      seating_area: "Main Dining Hall",
      status: "available",
    },
    {
      id: "tbl_corner_T04",
      restaurant_id: "the-corner-table",
      table_number: "T04",
      capacity: 6,
      seating_area: "Outdoor Garden Patio",
      status: "available",
    },
    {
      id: "tbl_corner_T05",
      restaurant_id: "the-corner-table",
      table_number: "T05",
      capacity: 2,
      seating_area: "Espresso Bar Counter",
      status: "available",
    },
    {
      id: "tbl_corner_T06",
      restaurant_id: "the-corner-table",
      table_number: "T06",
      capacity: 8,
      seating_area: "Private Dining Booth",
      status: "reserved",
    },
  ],
  "burger-house": [
    {
      id: "tbl_burger_T01",
      restaurant_id: "burger-house",
      table_number: "T01",
      capacity: 2,
      seating_area: "Front Patio",
      status: "available",
    },
    {
      id: "tbl_burger_T02",
      restaurant_id: "burger-house",
      table_number: "T02",
      capacity: 4,
      seating_area: "Center Hall",
      status: "occupied",
    },
    {
      id: "tbl_burger_T03",
      restaurant_id: "burger-house",
      table_number: "T03",
      capacity: 4,
      seating_area: "Center Hall",
      status: "available",
    },
    {
      id: "tbl_burger_T04",
      restaurant_id: "burger-house",
      table_number: "T04",
      capacity: 6,
      seating_area: "Family Booth",
      status: "available",
    },
  ],
};

// Map alternative ids to standard restaurant slugs
const RESTAURANT_ID_MAP: Record<string, string> = {
  "rest-001": "the-corner-table",
  "rest-002": "burger-house",
  "rest-003": "sushi-bay",
};

// GET /api/tables?restaurantId=the-corner-table
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const rawRestId = searchParams.get("restaurantId") || "the-corner-table";
    const restaurantId = RESTAURANT_ID_MAP[rawRestId] || rawRestId;

    const supabase = getSupabaseAdmin();
    if (!supabase) {
      const fallback = (INITIAL_TABLES[restaurantId] || INITIAL_TABLES["the-corner-table"]).map(
        (tbl) => ({
          ...tbl,
          qr_code_url: generateTableMenuUrl(tbl.restaurant_id, tbl.table_number),
        })
      );
      return NextResponse.json({ success: true, tables: fallback, source: "fallback" });
    }

    const { data, error } = await supabase
      .from("restaurant_tables")
      .select("*")
      .eq("restaurant_id", restaurantId)
      .order("table_number", { ascending: true });

    if (error || !data || data.length === 0) {
      // Auto-seed baseline tables into Supabase if empty
      const baseline = (INITIAL_TABLES[restaurantId] || INITIAL_TABLES["the-corner-table"]).map(
        (tbl) => ({
          ...tbl,
          qr_code_url: generateTableMenuUrl(tbl.restaurant_id, tbl.table_number),
        })
      );

      try {
        await supabase.from("restaurant_tables").upsert(baseline);
      } catch (e) {
        // Safe to ignore if table doesn't exist yet in Supabase
      }

      return NextResponse.json({
        success: true,
        tables: baseline,
        source: error ? "fallback" : "seeded",
      });
    }

    const tables = data.map((tbl: any) => ({
      ...tbl,
      qr_code_url: generateTableMenuUrl(tbl.restaurant_id, tbl.table_number),
    }));

    return NextResponse.json({
      success: true,
      tables,
      source: "database",
    });
  } catch (err: any) {
    console.error("[Tables API] GET error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// POST /api/tables (Add a table)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { restaurant_id, table_number, capacity = 4, seating_area = "Main Hall" } = body;

    if (!restaurant_id || !table_number) {
      return NextResponse.json(
        { success: false, error: "Missing restaurant_id or table_number" },
        { status: 400 }
      );
    }

    const cleanTableNum = table_number.trim().toUpperCase();
    const resolvedRestId = RESTAURANT_ID_MAP[restaurant_id] || restaurant_id;
    const tableId = `tbl_${resolvedRestId.replace(/[^a-z0-9]/gi, "")}_${cleanTableNum}`;
    const qrUrl = generateTableMenuUrl(resolvedRestId, cleanTableNum);

    const newTable: RestaurantTable = {
      id: tableId,
      restaurant_id: resolvedRestId,
      table_number: cleanTableNum,
      capacity: Number(capacity) || 4,
      seating_area: seating_area.trim(),
      status: "available",
      qr_code_url: qrUrl,
      created_at: new Date().toISOString(),
    };

    const supabase = getSupabaseAdmin();
    if (supabase) {
      const { data, error } = await supabase
        .from("restaurant_tables")
        .upsert(newTable)
        .select()
        .single();

      if (!error && data) {
        return NextResponse.json({
          success: true,
          table: { ...data, qr_code_url: qrUrl },
        });
      }
    }

    return NextResponse.json({ success: true, table: newTable, source: "local" });
  } catch (err: any) {
    console.error("[Tables API] POST error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// PATCH /api/tables (Update a table)
export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, table_number, capacity, seating_area, status } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing table id" }, { status: 400 });
    }

    const updates: Partial<RestaurantTable> = {};
    if (table_number) updates.table_number = table_number.trim().toUpperCase();
    if (capacity !== undefined) updates.capacity = Number(capacity);
    if (seating_area) updates.seating_area = seating_area.trim();
    if (status) updates.status = status;

    const supabase = getSupabaseAdmin();
    if (supabase) {
      const { data, error } = await supabase
        .from("restaurant_tables")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (!error && data) {
        return NextResponse.json({
          success: true,
          table: {
            ...data,
            qr_code_url: generateTableMenuUrl(data.restaurant_id, data.table_number),
          },
        });
      }
    }

    return NextResponse.json({ success: true, table: { id, ...updates } });
  } catch (err: any) {
    console.error("[Tables API] PATCH error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// DELETE /api/tables?id=tbl_xxx
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing table id" }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    if (supabase) {
      await supabase.from("restaurant_tables").delete().eq("id", id);
    }

    return NextResponse.json({ success: true, id });
  } catch (err: any) {
    console.error("[Tables API] DELETE error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
