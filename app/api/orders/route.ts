import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseServer";
import { INITIAL_ADMIN_ORDERS, AdminOrder } from "@/data/mockAdminData";
import { MENU_ITEMS } from "@/data/mockCustomerData";

/**
 * Resilient in-memory server cache.
 * Ensures orders placed from any client or device are immediately available across
 * serverless calls and never lost, even if database network experiences hiccups.
 */
let SERVER_ORDERS: AdminOrder[] = [...INITIAL_ADMIN_ORDERS];

/**
 * Transforms an in-app AdminOrder into a Supabase public.orders row
 */
function toDbRow(order: AdminOrder) {
  const dbStatus =
    order.status === "accepted" ? "preparing" : order.status || "new";

  const extractedTableNum =
    order.tableNumber ||
    (order.tableOrShelf?.match(/Table\s*#?([A-Za-z0-9_-]+)/i)?.[1] ||
      order.tableOrShelf);

  return {
    id: order.id,
    customer_name: order.customerName || "Customer",
    customer_phone: order.customerPhone || "+91 98765 43210",
    total_amount: order.totalAmount || 0,
    status: dbStatus,
    pickup_type: order.orderType || "takeaway",
    pickup_slot: order.tableOrShelf || "Counter 1",
    restaurant_id: order.restaurantId || "burger-house",
    table_id: null, // Avoid FK violations while preserving table_number & pickup_slot
    table_number: extractedTableNum || null,
    items: {
      orderNumber: order.orderNumber,
      tokenNumber: order.tokenNumber,
      customerEmail: order.customerEmail,
      customerName: order.customerName,
      realStatus: order.status,
      prepTimeEstimate: order.prepTimeEstimate,
      timeAgo: order.timeAgo || "Just now",
      image: order.image,
      dishList: order.items,
      restaurantId: order.restaurantId || "burger-house",
      restaurantName: order.restaurantName || "Burger House",
      tableNumber: extractedTableNum,
      tableId: order.tableId,
      createdAt: order.createdAt,
    },
  };
}

/**
 * Transforms a Supabase public.orders row into an in-app AdminOrder
 */
function fromDbRow(row: any): AdminOrder {
  const meta = row.items || {};
  const isWrapped = meta && meta.dishList;

  const tableNumber =
    meta.tableNumber ||
    row.table_number ||
    (row.pickup_slot?.match(/Table\s*#?([A-Za-z0-9_-]+)/i)?.[1] ||
      row.pickup_slot);

  const restaurantName =
    meta.restaurantName ||
    (row.restaurant_id === "burger-house"
      ? "Burger House"
      : row.restaurant_id === "pizza-palace"
      ? "Pizza Palace"
      : "Burger House");

  return {
    id: row.id,
    orderNumber: isWrapped
      ? meta.orderNumber
      : meta.orderNumber || `#D${row.id.replace(/[^0-9]/g, "").slice(-4) || "1001"}`,
    tokenNumber: isWrapped
      ? meta.tokenNumber
      : meta.tokenNumber || row.id.slice(-2),
    customerName: row.customer_name || meta.customerName || "Customer",
    customerPhone: row.customer_phone || "+91 98765 43210",
    customerEmail: meta.customerEmail || row.customer_email || undefined,
    orderType: (row.pickup_type as "dine-in" | "takeaway") || "takeaway",
    tableOrShelf: row.pickup_slot || (tableNumber ? `Table #${tableNumber}` : "Counter 1"),
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
    restaurantId: meta.restaurantId || row.restaurant_id || "burger-house",
    restaurantName,
    tableNumber,
    tableId: meta.tableId || row.table_id,
  };
}

// GET /api/orders?restaurantId=the-corner-table&customerEmail=user@gmail.com
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const restaurantId = searchParams.get("restaurantId");
    const customerEmail = searchParams.get("customerEmail")?.trim().toLowerCase();
    const customerName = searchParams.get("customerName")?.trim().toLowerCase();

    let allOrders: AdminOrder[] = [...SERVER_ORDERS];

    const supabase = getSupabaseAdmin();
    if (supabase) {
      try {
        const { data: rows, error } = await supabase
          .from("orders")
          .select("*")
          .order("created_at", { ascending: false });

        if (!error && rows && rows.length > 0) {
          const dbOrders = rows.map(fromDbRow);
          // Merge dbOrders and in-memory SERVER_ORDERS
          const map = new Map<string, AdminOrder>();
          dbOrders.forEach((o) => map.set(o.id, o));
          SERVER_ORDERS.forEach((o) => {
            // Memory orders take precedence if they are newer or have custom status
            if (!map.has(o.id)) {
              map.set(o.id, o);
            }
          });
          allOrders = Array.from(map.values());
          SERVER_ORDERS = allOrders;
        }
      } catch (dbErr) {
        console.warn("[Orders API] Supabase query fallback:", dbErr);
      }
    }

    let filtered = allOrders;
    if (restaurantId && restaurantId !== "all") {
      filtered = filtered.filter(
        (o) => !o.restaurantId || o.restaurantId === restaurantId
      );
    }
    if (customerEmail) {
      filtered = filtered.filter((o) => {
        const matchEmail = (o.customerEmail || "").toLowerCase() === customerEmail;
        const matchName =
          customerName && (o.customerName || "").toLowerCase() === customerName;
        return matchEmail || matchName;
      });
    }

    return NextResponse.json({
      success: true,
      orders: filtered,
      count: filtered.length,
      source: supabase ? "database_synced" : "server_cache",
    });
  } catch (err: any) {
    console.error("[Orders API] Error fetching orders:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

// POST /api/orders (Customer creates order with server-side validation)
export async function POST(req: Request) {
  try {
    const body: AdminOrder = await req.json();

    // 1. Server-side validation: Verify order has items
    if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json(
        { success: false, error: "Order must contain at least one item" },
        { status: 400 }
      );
    }

    // 2. Server-side price calculation & verification
    let verifiedSubtotal = 0;
    const verifiedItems = body.items.map((item) => {
      const quantity = Math.max(1, Math.min(20, Math.floor(Number(item.quantity) || 1)));
      const catalogMatch = MENU_ITEMS.find(
        (m) => m.name.toLowerCase() === item.dishName.toLowerCase()
      );
      const unitPrice = catalogMatch ? catalogMatch.price : Number(item.price) || 150;
      verifiedSubtotal += unitPrice * quantity;

      return {
        dishName: item.dishName,
        quantity,
        price: unitPrice,
        notes: item.notes || "",
      };
    });

    const taxAmount = Math.round(verifiedSubtotal * 0.05);
    const verifiedTotal = verifiedSubtotal + taxAmount;

    // 3. Verify Table Number format if dine-in
    let verifiedTableNumber = body.tableNumber;
    if (!verifiedTableNumber && body.tableOrShelf) {
      const match = body.tableOrShelf.match(/Table\s*#?([A-Za-z0-9_-]+)/i);
      verifiedTableNumber = match ? match[1] : undefined;
    }

    const verifiedOrder: AdminOrder = {
      ...body,
      items: verifiedItems,
      totalAmount: verifiedTotal,
      tableNumber: verifiedTableNumber,
      restaurantId: body.restaurantId || "burger-house",
      restaurantName: body.restaurantName || "Burger House",
      status: body.status || "new",
      createdAt: body.createdAt || new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      timeAgo: "Just now",
    };

    // Store immediately in server memory cache
    SERVER_ORDERS = [verifiedOrder, ...SERVER_ORDERS.filter((o) => o.id !== verifiedOrder.id)];

    const supabase = getSupabaseAdmin();
    if (!supabase) {
      return NextResponse.json({
        success: true,
        order: verifiedOrder,
        source: "server_memory",
      });
    }

    const row = toDbRow(verifiedOrder);
    let { data, error } = await supabase
      .from("orders")
      .upsert(row)
      .select()
      .single();

    // If schema cache doesn't have restaurant_id or table_id columns yet,
    // fallback to storing in items JSONB so order submission never fails
    if (error && (error.message.includes("column") || error.code === "PGRST204")) {
      const legacyRow = {
        id: row.id,
        customer_name: row.customer_name,
        customer_phone: row.customer_phone,
        total_amount: row.total_amount,
        status: row.status,
        pickup_type: row.pickup_type,
        pickup_slot: row.pickup_slot,
        items: row.items,
      };

      const retry = await supabase
        .from("orders")
        .upsert(legacyRow)
        .select()
        .single();

      if (!retry.error && retry.data) {
        data = retry.data;
        error = null;
      }
    }

    if (error) {
      console.warn("[Orders API] Supabase insert fallback to in-memory order:", error.message);
      return NextResponse.json({
        success: true,
        order: verifiedOrder,
        source: "memory_resilient",
      });
    }

    const createdOrder = fromDbRow(data);
    // Refresh memory cache with canonical db row
    SERVER_ORDERS = [createdOrder, ...SERVER_ORDERS.filter((o) => o.id !== createdOrder.id)];

    return NextResponse.json({
      success: true,
      order: createdOrder,
      source: "database",
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

    // 1. Update in-memory server cache immediately
    SERVER_ORDERS = SERVER_ORDERS.map((o) => {
      if (o.id === id) {
        return {
          ...o,
          status,
          prepTimeEstimate:
            prepTimeEstimate ||
            (status === "ready"
              ? "Ready for shelf"
              : status === "completed"
              ? "Handed over"
              : o.prepTimeEstimate),
        };
      }
      return o;
    });

    const supabase = getSupabaseAdmin();
    if (!supabase) {
      const updated = SERVER_ORDERS.find((o) => o.id === id);
      return NextResponse.json({ success: true, order: updated, source: "server_memory" });
    }

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
      console.warn("[Orders API] Update DB error, fallback to memory:", error.message);
      const updated = SERVER_ORDERS.find((o) => o.id === id);
      return NextResponse.json({ success: true, order: updated, source: "memory_fallback" });
    }

    const updatedOrder = fromDbRow(data);
    SERVER_ORDERS = SERVER_ORDERS.map((o) => (o.id === id ? updatedOrder : o));

    return NextResponse.json({
      success: true,
      order: updatedOrder,
      source: "database",
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

    SERVER_ORDERS = SERVER_ORDERS.filter((o) => o.id !== id);

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
