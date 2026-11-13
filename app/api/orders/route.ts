import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseServer";
import { INITIAL_ADMIN_ORDERS, AdminOrder } from "@/data/mockAdminData";

/**
 * Transforms an in-app AdminOrder into a Supabase public.orders row
 */
function toDbRow(order: AdminOrder) {
  // Map 'accepted' to 'preparing' for Postgres check constraint compliance
  const dbStatus =
    order.status === "accepted" ? "preparing" : order.status || "new";

  return {
    id: order.id,
    customer_name: order.customerName || "Customer",
    customer_phone: order.customerPhone || "+91 98765 43210",
    total_amount: order.totalAmount || 0,
    status: dbStatus,
    pickup_type: order.orderType || "takeaway",
    pickup_slot: order.tableOrShelf || "Counter 1",
    items: {
      orderNumber: order.orderNumber,
      tokenNumber: order.tokenNumber,
      realStatus: order.status,
      prepTimeEstimate: order.prepTimeEstimate,
      timeAgo: order.timeAgo || "Just now",
      image: order.image,
      dishList: order.items,
    },
  };
}

/**
 * Transforms a Supabase public.orders row into an in-app AdminOrder
 */
function fromDbRow(row: any): AdminOrder {
  const meta = row.items || {};
  const isWrapped = meta && meta.dishList;

  return {
    id: row.id,
    orderNumber: isWrapped
      ? meta.orderNumber
      : meta.orderNumber || `#D${row.id.replace(/[^0-9]/g, "").slice(-4) || "1001"}`,
    tokenNumber: isWrapped
      ? meta.tokenNumber
      : meta.tokenNumber || row.id.slice(-2),
    customerName: row.customer_name || "Customer",
    customerPhone: row.customer_phone || "+91 98765 43210",
    orderType: (row.pickup_type as "dine-in" | "takeaway") || "takeaway",
    tableOrShelf: row.pickup_slot || "Counter 1",
    items: isWrapped
      ? meta.dishList
      : Array.isArray(row.items)
      ? row.items
      : [],
    totalAmount: Number(row.total_amount) || 0,
    status:
      (isWrapped && meta.realStatus) ||
      (row.status as AdminOrder["status"]) ||
      "new",
    prepTimeEstimate:
      (isWrapped && meta.prepTimeEstimate) ||
      (row.status === "ready" ? "Ready for shelf" : "~ 10 min"),
    timeAgo: (isWrapped && meta.timeAgo) || "Just now",
    createdAt: row.created_at
      ? new Date(row.created_at).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "Just now",
    image:
      (isWrapped && meta.image) ||
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80",
  };
}

// GET /api/orders
export async function GET() {
  try {
    const supabase = getSupabaseAdmin();
    if (!supabase) {
      return NextResponse.json({
        success: true,
        orders: INITIAL_ADMIN_ORDERS,
        source: "fallback",
      });
    }

    const { data: rows, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[Orders API] Supabase query error:", error.message);
      return NextResponse.json({
        success: true,
        orders: INITIAL_ADMIN_ORDERS,
        source: "fallback",
      });
    }

    // If database table has fewer than initial baseline orders, auto-seed the baseline orders into Supabase
    if (!rows || rows.length < INITIAL_ADMIN_ORDERS.length) {
      const seedRows = INITIAL_ADMIN_ORDERS.map(toDbRow);
      await supabase.from("orders").upsert(seedRows);
      const { data: updatedRows } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });
      const orders = (updatedRows || seedRows).map(fromDbRow);
      return NextResponse.json({
        success: true,
        orders,
        source: "seeded",
      });
    }

    const orders = rows.map(fromDbRow);
    return NextResponse.json({
      success: true,
      orders,
      source: "database",
    });
  } catch (err: any) {
    console.error("[Orders API] Error fetching orders:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

// POST /api/orders (Customer creates order)
export async function POST(req: Request) {
  try {
    const body: AdminOrder = await req.json();
    const supabase = getSupabaseAdmin();

    if (!supabase) {
      return NextResponse.json({
        success: true,
        order: body,
        source: "local",
      });
    }

    const row = toDbRow(body);
    const { data, error } = await supabase
      .from("orders")
      .upsert(row)
      .select()
      .single();

    if (error) {
      console.error("[Orders API] Error inserting order:", error.message);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    const createdOrder = fromDbRow(data);
    return NextResponse.json({
      success: true,
      order: createdOrder,
    });
  } catch (err: any) {
    console.error("[Orders API] Post error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

// PATCH /api/orders (Admin updates order status or details)
export async function PATCH(req: Request) {
  try {
    const { id, status, prepTimeEstimate } = await req.json();
    const supabase = getSupabaseAdmin();

    if (!supabase) {
      return NextResponse.json({ success: true, id, status, source: "local" });
    }

    // Fetch existing row to preserve metadata
    const { data: existing } = await supabase
      .from("orders")
      .select("*")
      .eq("id", id)
      .single();

    const existingMeta = existing?.items || {};
    const updatedMeta = {
      ...existingMeta,
      realStatus: status,
      prepTimeEstimate:
        prepTimeEstimate ||
        (status === "ready"
          ? "Ready for shelf"
          : status === "completed"
          ? "Handed over"
          : existingMeta.prepTimeEstimate),
    };

    const dbStatus = status === "accepted" ? "preparing" : status;

    const { data, error } = await supabase
      .from("orders")
      .update({
        status: dbStatus,
        items: updatedMeta,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("[Orders API] Update error:", error.message);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      order: fromDbRow(data),
    });
  } catch (err: any) {
    console.error("[Orders API] Patch error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

// DELETE /api/orders (Cancel or delete order)
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing order ID" },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();
    if (supabase) {
      await supabase.from("orders").delete().eq("id", id);
    }

    return NextResponse.json({ success: true, id });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
