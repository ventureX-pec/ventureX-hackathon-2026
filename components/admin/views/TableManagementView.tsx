"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  QrCode,
  Plus,
  Search,
  Printer,
  Download,
  ExternalLink,
  Edit2,
  Trash2,
  Users,
  MapPin,
  CheckCircle2,
  Building2,
  Sparkles,
  ArrowRight,
  Filter,
  RefreshCw,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { RestaurantTable } from "@/app/api/tables/route";
import { RestaurantInfo } from "@/app/api/restaurants/route";
import { generateQrDataUrl, downloadQrPng, generateTableMenuUrl } from "@/lib/qrGenerator";
import { TableStandeeModal } from "@/components/admin/modals/TableStandeeModal";
import { AddTableModal } from "@/components/admin/modals/AddTableModal";
import { EditTableModal } from "@/components/admin/modals/EditTableModal";

const DEFAULT_RESTAURANTS: RestaurantInfo[] = [
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
];

export const TableManagementView: React.FC = () => {
  const [restaurants, setRestaurants] = useState<RestaurantInfo[]>(DEFAULT_RESTAURANTS);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string>("rest-001");
  const [tables, setTables] = useState<RestaurantTable[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedArea, setSelectedArea] = useState<string>("all");

  // Modals state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingTable, setEditingTable] = useState<RestaurantTable | null>(null);
  const [standeeTable, setStandeeTable] = useState<RestaurantTable | null>(null);
  const [isBulkDownloading, setIsBulkDownloading] = useState(false);

  // Active restaurant info
  const activeRestaurant = useMemo(() => {
    return (
      restaurants.find((r) => r.id === selectedRestaurantId) ||
      restaurants[0] ||
      DEFAULT_RESTAURANTS[0]
    );
  }, [restaurants, selectedRestaurantId]);

  // Load restaurants
  useEffect(() => {
    fetch("/api/restaurants")
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data)
          ? data
          : Array.isArray(data?.restaurants)
          ? data.restaurants
          : [];
        if (list.length > 0) {
          setRestaurants(list);
          if (!list.some((r: RestaurantInfo) => r.id === selectedRestaurantId)) {
            setSelectedRestaurantId(list[0].id);
          }
        }
      })
      .catch((err) => console.error("Error loading restaurants:", err));
  }, []);

  // Fetch tables when selectedRestaurantId changes
  const loadTables = async (restId: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/tables?restaurantId=${restId}`);
      const data = await res.json();
      const list = Array.isArray(data)
        ? data
        : Array.isArray(data?.tables)
        ? data.tables
        : [];
      setTables(list);
    } catch (e) {
      console.error("Failed to load tables:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedRestaurantId) {
      loadTables(selectedRestaurantId);
    }
  }, [selectedRestaurantId]);

  // Handle Add Table
  const handleAddTable = async (tableData: {
    table_number: string;
    capacity: number;
    seating_area: string;
  }) => {
    try {
      const res = await fetch("/api/tables", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          restaurant_id: selectedRestaurantId,
          restaurant_slug: activeRestaurant.slug,
          ...tableData,
        }),
      });
      const data = await res.json();
      const newTable = data.table || data;
      if (newTable && newTable.id) {
        setTables((prev) => [...prev, newTable]);
      }
    } catch (err) {
      console.error("Error adding table:", err);
    }
  };

  // Handle Update Table
  const handleUpdateTable = async (
    tableId: string,
    updates: Partial<RestaurantTable>
  ) => {
    try {
      const res = await fetch("/api/tables", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: tableId, ...updates }),
      });
      const data = await res.json();
      const updated = data.table || data;
      setTables((prev) =>
        prev.map((t) => (t.id === tableId ? { ...t, ...updated } : t))
      );
    } catch (err) {
      console.error("Error updating table:", err);
    }
  };

  // Handle Delete Table
  const handleDeleteTable = async (tableId: string) => {
    if (!confirm("Are you sure you want to delete this table? The QR code will no longer be linked.")) {
      return;
    }
    try {
      await fetch(`/api/tables?id=${tableId}`, { method: "DELETE" });
      setTables((prev) => prev.filter((t) => t.id !== tableId));
    } catch (err) {
      console.error("Error deleting table:", err);
    }
  };

  // Download Individual QR
  const handleDownloadSingleQr = async (table: RestaurantTable) => {
    try {
      const url =
        table.qr_code_url ||
        generateTableMenuUrl(activeRestaurant.slug, table.table_number);
      const dataUrl = await generateQrDataUrl(url, { width: 1024 });
      downloadQrPng(
        dataUrl,
        `ServeZa_${activeRestaurant.slug}_Table_${table.table_number}.png`
      );
    } catch (err) {
      console.error("Error downloading QR:", err);
    }
  };

  // Download All QR Codes
  const handleDownloadAllQrs = async () => {
    if (tables.length === 0) return;
    setIsBulkDownloading(true);
    try {
      for (let i = 0; i < tables.length; i++) {
        const table = tables[i];
        const url =
          table.qr_code_url ||
          generateTableMenuUrl(activeRestaurant.slug, table.table_number);
        const dataUrl = await generateQrDataUrl(url, { width: 1024 });
        downloadQrPng(
          dataUrl,
          `ServeZa_${activeRestaurant.slug}_Table_${table.table_number}.png`
        );
        // Small stagger to let browser download queue process smoothly
        await new Promise((r) => setTimeout(r, 250));
      }
    } finally {
      setIsBulkDownloading(false);
    }
  };

  // Filtered tables
  const filteredTables = useMemo(() => {
    return tables.filter((t) => {
      const tableNum = t.table_number || (t as any).tableNumber || "";
      const area = t.seating_area || (t as any).seatingArea || "";
      if (selectedArea !== "all" && area !== selectedArea) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesNum = tableNum.toLowerCase().includes(q);
        const matchesArea = area.toLowerCase().includes(q);
        return matchesNum || matchesArea;
      }
      return true;
    });
  }, [tables, selectedArea, searchQuery]);

  // Seating areas present in current tables
  const areas = useMemo(() => {
    const set = new Set<string>();
    tables.forEach((t) => {
      const a = t.seating_area || (t as any).seatingArea;
      if (a) set.add(a);
    });
    return ["all", ...Array.from(set)];
  }, [tables]);

  return (
    <div className="space-y-6">
      {/* ============================================================ */}
      {/* Top Header & Restaurant Switcher                             */}
      {/* ============================================================ */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-white/95 backdrop-blur-md p-5 rounded-3xl border border-[#EDE4D8] shadow-xs">
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#c96342]/10 text-[#c96342] flex items-center justify-center font-bold">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#252522]">
                  Table QR Codes
                </h1>
                <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-[#c96342]/10 text-[#c96342]">
                  {tables.length} Tables Active
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#736E65]">
                Generate, manage, download and print high-resolution acrylic QR standees for dine-in ordering
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Restaurant Selector */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-[#FAF8F5] border border-[#EDE4D8]">
            <Building2 className="w-4 h-4 text-[#8C877D]" />
            <select
              value={selectedRestaurantId}
              onChange={(e) => setSelectedRestaurantId(e.target.value)}
              className="bg-transparent text-xs font-bold text-[#252522] focus:outline-none cursor-pointer"
            >
              {restaurants.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>

          {/* Bulk Download */}
          <button
            onClick={handleDownloadAllQrs}
            disabled={isBulkDownloading || tables.length === 0}
            className="px-4 py-2.5 rounded-2xl border border-[#EDE4D8] bg-white hover:bg-[#FAF8F5] text-xs font-semibold text-[#5C574F] transition-all flex items-center gap-2 disabled:opacity-50"
            title="Download high-resolution PNGs for all tables"
          >
            <Download className="w-4 h-4 text-[#c96342]" />
            <span>{isBulkDownloading ? "Downloading..." : "Download All PNGs"}</span>
          </button>

          {/* Add Table Button */}
          <button
            onClick={() => setIsAddOpen(true)}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#c96342] to-[#de7453] text-white text-xs sm:text-sm font-bold shadow-md hover:brightness-105 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Table</span>
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* Filter and Search Bar                                        */}
      {/* ============================================================ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Seating Area Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {areas.map((area) => (
            <button
              key={area}
              onClick={() => setSelectedArea(area)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all ${
                selectedArea === area
                  ? "bg-[#c96342] text-white shadow-xs"
                  : "bg-white border border-[#EDE5DA] text-[#5C574F] hover:bg-[#FAF8F5]"
              }`}
            >
              {area === "all" ? "All Areas" : area}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C877D]" />
          <input
            type="text"
            placeholder="Search table number or area..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-2xl bg-white border border-[#EDE4D8] text-xs font-medium text-[#252522] placeholder:text-[#A8A29E] focus:outline-none focus:border-[#c96342]"
          />
        </div>
      </div>

      {/* ============================================================ */}
      {/* Tables Grid                                                  */}
      {/* ============================================================ */}
      {loading ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-[#EDE4D8]">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto text-[#c96342] mb-2" />
          <p className="text-xs font-medium text-[#78716c]">Loading restaurant tables...</p>
        </div>
      ) : filteredTables.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-[#EDE4D8] space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#c96342]/10 text-[#c96342] mx-auto flex items-center justify-center">
            <QrCode className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-lg font-bold text-[#252522]">No tables found</h3>
          <p className="text-xs text-[#78716c] max-w-sm mx-auto">
            {searchQuery
              ? "No tables matched your search query. Try clearing filters."
              : "No tables added for this restaurant yet. Create your first table QR code!"}
          </p>
          <button
            onClick={() => setIsAddOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#c96342] text-white text-xs font-bold hover:bg-[#b04f32]"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Table</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTables.map((table) => {
            const tableNum = table.table_number || (table as any).tableNumber || "T01";
            const tableArea = table.seating_area || (table as any).seatingArea || "Main Dining Hall";
            const tableMenuUrl =
              table.qr_code_url ||
              generateTableMenuUrl(activeRestaurant.slug, tableNum);

            return (
              <motion.div
                key={table.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="bg-white rounded-3xl border border-[#EDE4D8] p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
              >
                {/* Card Top: Number, Area, and Status */}
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-11 h-11 rounded-2xl bg-[#FAF8F5] border border-[#EDE4D8] flex items-center justify-center font-serif text-lg font-bold text-[#1c1917] shadow-xs">
                        {tableNum}
                      </div>
                      <div>
                        <h3 className="font-serif text-base font-bold text-[#1c1917]">
                          Table {tableNum}
                        </h3>
                        <div className="flex items-center gap-1 text-[11px] text-[#78716c]">
                          <MapPin className="w-3 h-3 text-[#c96342]" />
                          <span>{tableArea}</span>
                        </div>
                      </div>
                    </div>

                    {/* Status Pill */}
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase ${
                        table.status === "available"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : table.status === "occupied"
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "bg-stone-100 text-stone-600 border border-stone-200"
                      }`}
                    >
                      {table.status}
                    </span>
                  </div>

                  {/* Capacity indicator */}
                  <div className="flex items-center gap-3 pt-1 text-[11px] text-[#78716c]">
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-[#8C877D]" />
                      <span>{table.capacity} Seats</span>
                    </span>
                    <span>•</span>
                    <span className="text-[11px] text-[#8C877D] truncate max-w-[150px]">
                      {activeRestaurant.name}
                    </span>
                  </div>
                </div>

                {/* QR Code Center Box */}
                <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#EFE8DE] flex items-center gap-3.5">
                  <div className="p-2 bg-white rounded-xl border border-[#EDE4D8] shadow-xs shrink-0">
                    <QRCodeSVG
                      value={tableMenuUrl}
                      size={80}
                      level="H"
                      includeMargin={false}
                    />
                  </div>
                  <div className="space-y-1 min-w-0 flex-1">
                    <span className="text-[10px] font-bold text-[#c96342] uppercase tracking-wider block">
                      Table QR Destination
                    </span>
                    <p className="text-[11px] text-[#5C574F] font-mono break-all line-clamp-2">
                      /r/{activeRestaurant.slug}/menu?table={tableNum}
                    </p>
                    <a
                      href={tableMenuUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#c96342] hover:underline pt-0.5"
                    >
                      <span>Open Customer Menu</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="pt-2 border-t border-[#F2ECE2] flex items-center justify-between gap-1">
                  <div className="flex items-center gap-1">
                    {/* View Standee / Print */}
                    <button
                      onClick={() => setStandeeTable(table)}
                      className="px-3 py-1.5 rounded-xl bg-[#FAF8F5] hover:bg-[#F2ECE2] text-[11px] font-bold text-[#1c1917] transition-colors flex items-center gap-1.5"
                      title="View printable acrylic standee"
                    >
                      <Printer className="w-3.5 h-3.5 text-[#c96342]" />
                      <span>Print Standee</span>
                    </button>

                    {/* Download High-Res PNG */}
                    <button
                      onClick={() => handleDownloadSingleQr(table)}
                      className="p-1.5 rounded-xl hover:bg-[#FAF8F5] text-[#78716c] hover:text-[#1c1917] transition-colors"
                      title="Download high-resolution PNG"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-1">
                    {/* Edit Table */}
                    <button
                      onClick={() => setEditingTable(table)}
                      className="p-1.5 rounded-xl hover:bg-[#FAF8F5] text-[#78716c] hover:text-[#1c1917] transition-colors"
                      title="Edit table details"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    {/* Delete Table */}
                    <button
                      onClick={() => handleDeleteTable(table.id)}
                      className="p-1.5 rounded-xl hover:bg-red-50 text-[#78716c] hover:text-red-600 transition-colors"
                      title="Delete table"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* ============================================================ */}
      {/* Modals                                                       */}
      {/* ============================================================ */}

      {/* Add Table Modal */}
      <AddTableModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        restaurantId={selectedRestaurantId}
        onAddTable={handleAddTable}
      />

      {/* Edit Table Modal */}
      <EditTableModal
        isOpen={!!editingTable}
        table={editingTable}
        onClose={() => setEditingTable(null)}
        onUpdateTable={handleUpdateTable}
      />

      {/* Standee Modal */}
      <TableStandeeModal
        isOpen={!!standeeTable}
        table={standeeTable}
        restaurantName={activeRestaurant.name}
        onClose={() => setStandeeTable(null)}
      />
    </div>
  );
};
