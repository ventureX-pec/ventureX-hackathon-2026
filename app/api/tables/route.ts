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

// Initial baseline tables across all 6 real restaurants
export const INITIAL_TABLES: Record<string, RestaurantTable[]> = {
  "corner-cafe": [
    {
      id: "tbl_corner_T01",
      restaurant_id: "corner-cafe",
      table_number: "T01",
      capacity: 2,
      seating_area: "Window Nook",
      status: "available",
    },
    {
      id: "tbl_corner_T02",
      restaurant_id: "corner-cafe",
      table_number: "T02",
      capacity: 4,
      seating_area: "Main Dining Hall",
      status: "occupied",
    },
    {
      id: "tbl_corner_T03",
      restaurant_id: "corner-cafe",
      table_number: "T03",
      capacity: 4,
      seating_area: "Main Dining Hall",
      status: "available",
    },
    {
      id: "tbl_corner_T04",
      restaurant_id: "corner-cafe",
      table_number: "T04",
      capacity: 6,
      seating_area: "Outdoor Garden Patio",
      status: "available",
    },
    {
      id: "tbl_corner_T05",
      restaurant_id: "corner-cafe",
      table_number: "T05",
      capacity: 2,
      seating_area: "Espresso Bar Counter",
      status: "available",
    },
    {
      id: "tbl_corner_T06",
      restaurant_id: "corner-cafe",
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
  "pizza-palace": [
    {
      id: "tbl_pizza_T01",
      restaurant_id: "pizza-palace",
      table_number: "T01",
      capacity: 4,
      seating_area: "Woodfire Hearth Side",
      status: "available",
    },
    {
      id: "tbl_pizza_T02",
      restaurant_id: "pizza-palace",
      table_number: "T02",
      capacity: 4,
      seating_area: "Main Dining Hall",
      status: "available",
    },
    {
      id: "tbl_pizza_T03",
      restaurant_id: "pizza-palace",
      table_number: "T03",
      capacity: 6,
      seating_area: "Terrace Balcony",
      status: "available",
    },
    {
      id: "tbl_pizza_T04",
      restaurant_id: "pizza-palace",
      table_number: "T04",
      capacity: 2,
      seating_area: "Window Nook",
      status: "available",
    },
  ],
  "sushi-world": [
    {
      id: "tbl_sushi_T01",
      restaurant_id: "sushi-world",
      table_number: "T01",
      capacity: 2,
      seating_area: "Omakase Bar",
      status: "available",
    },
    {
      id: "tbl_sushi_T02",
      restaurant_id: "sushi-world",
      table_number: "T02",
      capacity: 4,
      seating_area: "Tatami Room",
      status: "available",
    },
    {
      id: "tbl_sushi_T03",
      restaurant_id: "sushi-world",
      table_number: "T03",
      capacity: 4,
      seating_area: "Garden Courtyard",
      status: "available",
    },
    {
      id: "tbl_sushi_T04",
      restaurant_id: "sushi-world",
      table_number: "T04",
      capacity: 6,
      seating_area: "Bamboo Alcove",
      status: "available",
    },
  ],
  "healthy-bites": [
    {
      id: "tbl_healthy_T01",
      restaurant_id: "healthy-bites",
      table_number: "T01",
      capacity: 2,
      seating_area: "Greenhouse Gazebo",
      status: "available",
    },
    {
      id: "tbl_healthy_T02",
      restaurant_id: "healthy-bites",
      table_number: "T02",
      capacity: 4,
      seating_area: "Sunlit Veranda",
      status: "available",
    },
    {
      id: "tbl_healthy_T03",
      restaurant_id: "healthy-bites",
      table_number: "T03",
      capacity: 4,
      seating_area: "Main Commons",
      status: "available",
    },
  ],
  "tandoor-hub": [
    {
      id: "tbl_tandoor_T01",
      restaurant_id: "tandoor-hub",
      table_number: "T01",
      capacity: 4,
      seating_area: "Royal Dining Hall",
      status: "available",
    },
    {
      id: "tbl_tandoor_T02",
      restaurant_id: "tandoor-hub",
      table_number: "T02",
      capacity: 6,
      seating_area: "Family Dawat Diwan",
      status: "available",
    },
    {
      id: "tbl_tandoor_T03",
      restaurant_id: "tandoor-hub",
      table_number: "T03",
      capacity: 4,
      seating_area: "Clay Oven Patio",
      status: "available",
    },
  ],
};

// Aliases
INITIAL_TABLES["the-corner-table"] = INITIAL_TABLES["corner-cafe"];
INITIAL_TABLES["the-corner-cafe"] = INITIAL_TABLES["corner-cafe"];
INITIAL_TABLES["sushi-bay"] = INITIAL_TABLES["sushi-world"];

// Map alternative ids to standard restaurant slugs
const RESTAURANT_ID_MAP: Record<string, string> = {
  "rest-001": "corner-cafe",
  "rest-002": "burger-house",
  "rest-003": "sushi-world",
  "the-corner-table": "corner-cafe",
  "the-corner-cafe": "corner-cafe",
  "sushi-bay": "sushi-world",
};

// GET /api/tables?restaurantId=corner-cafe
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const rawRestId = searchParams.get("restaurantId") || "corner-cafe";
    const restaurantId = RESTAURANT_ID_MAP[rawRestId] || rawRestId;

    const supabase = getSupabaseAdmin();
    if (!supabase) {
      const fallback = (INITIAL_TABLES[restaurantId] || INITIAL_TABLES["corner-cafe"]).map(
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
      const baseline = (INITIAL_TABLES[restaurantId] || INITIAL_TABLES["corner-cafe"]).map(
        (tbl) => ({
          ...tbl,
          qr_code_url: generateTableMenuUrl(tbl.restaurant_id, tbl.table_number),
        })
      );

      try {
        const { error: seedError } = await supabase
          .from("restaurant_tables")
          .upsert(baseline, { onConflict: "id" });
        if (!seedError) {
          return NextResponse.json({ success: true, tables: baseline, source: "seeded" });
        }
      } catch (seedErr) {
        // Ignored, proceed to fallback
      }

      return NextResponse.json({ success: true, tables: baseline, source: "fallback" });
    }

    // Attach generated QR URLs
    const formatted = data.map((tbl) => ({
      ...tbl,
      qr_code_url:
        tbl.qr_code_url || generateTableMenuUrl(tbl.restaurant_id, tbl.table_number),
    }));

    return NextResponse.json({ success: true, tables: formatted, source: "supabase" });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// POST /api/tables (Create table)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      restaurant_id = "corner-cafe",
      table_number,
      capacity = 4,
      seating_area = "Main Dining",
      status = "available",
    } = body;

    if (!table_number) {
      return NextResponse.json(
        { success: false, error: "table_number is required" },
        { status: 400 }
      );
    }

    const cleanTable = String(table_number).toUpperCase().trim();
    const cleanRestId = RESTAURANT_ID_MAP[restaurant_id] || restaurant_id;
    const tableId = `tbl_${cleanRestId}_${cleanTable}_${Date.now()}`;
    const qrUrl = generateTableMenuUrl(cleanRestId, cleanTable);

    const newTable: RestaurantTable = {
      id: tableId,
      restaurant_id: cleanRestId,
      table_number: cleanTable,
      capacity: Number(capacity) || 4,
      seating_area,
      status: status || "available",
      qr_code_url: qrUrl,
      created_at: new Date().toISOString(),
    };

    const supabase = getSupabaseAdmin();
    if (supabase) {
      const { data, error } = await supabase
        .from("restaurant_tables")
        .insert(newTable)
        .select()
        .single();

      if (!error && data) {
        return NextResponse.json({ success: true, table: data, source: "supabase" });
      }
    }

    // Local / In-memory fallback
    if (!INITIAL_TABLES[cleanRestId]) {
      INITIAL_TABLES[cleanRestId] = [];
    }
    INITIAL_TABLES[cleanRestId].push(newTable);

    return NextResponse.json({ success: true, table: newTable, source: "fallback" });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// PUT /api/tables (Update table)
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, table_number, capacity, seating_area, status, restaurant_id } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Table id is required" }, { status: 400 });
    }

    const cleanTable = table_number ? String(table_number).toUpperCase().trim() : undefined;
    const cleanRestId = restaurant_id ? (RESTAURANT_ID_MAP[restaurant_id] || restaurant_id) : undefined;

    const updates: Partial<RestaurantTable> = {};
    if (cleanTable) {
      updates.table_number = cleanTable;
      if (cleanRestId) {
        updates.qr_code_url = generateTableMenuUrl(cleanRestId, cleanTable);
      }
    }
    if (capacity !== undefined) updates.capacity = Number(capacity);
    if (seating_area !== undefined) updates.seating_area = seating_area;
    if (status !== undefined) updates.status = status;

    const supabase = getSupabaseAdmin();
    if (supabase) {
      const { data, error } = await supabase
        .from("restaurant_tables")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (!error && data) {
        return NextResponse.json({ success: true, table: data, source: "supabase" });
      }
    }

    return NextResponse.json({ success: true, table: { id, ...updates }, source: "fallback" });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// DELETE /api/tables?id=tbl_xxx
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Table id is required" }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    if (supabase) {
      const { error } = await supabase.from("restaurant_tables").delete().eq("id", id);
      if (!error) {
        return NextResponse.json({ success: true, id, source: "supabase" });
      }
    }

    // In-memory removal
    Object.keys(INITIAL_TABLES).forEach((k) => {
      INITIAL_TABLES[k] = INITIAL_TABLES[k].filter((t) => t.id !== id);
    });

    return NextResponse.json({ success: true, id, source: "fallback" });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
