"use client";

import React, { useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Printer, Download, ExternalLink, QrCode, Sparkles, MapPin } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { RestaurantTable } from "@/app/api/tables/route";
import { generateQrDataUrl, downloadQrPng } from "@/lib/qrGenerator";

interface TableStandeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  table: RestaurantTable | null;
  restaurantName: string;
  restaurantSlug?: string;
}

export const TableStandeeModal: React.FC<TableStandeeModalProps> = ({
  isOpen,
  onClose,
  table,
  restaurantName,
  restaurantSlug = "the-corner-table",
}) => {
  const standeeRef = useRef<HTMLDivElement>(null);
  const [targetMode, setTargetMode] = React.useState<"local" | "production">("local");

  if (!isOpen || !table) return null;

  const tableNum = table.table_number || (table as any).tableNumber || "T01";
  const localIp = typeof window !== "undefined" && window.location.hostname !== "localhost"
    ? window.location.hostname
    : "10.198.54.135";

  const localUrl = `http://${localIp}:3000/r/${restaurantSlug}/menu?table=${tableNum}`;
  const prodUrl = `https://venture-x-hackathon-2026.vercel.app/r/${restaurantSlug}/menu?table=${tableNum}`;

  const targetUrl = targetMode === "local" ? localUrl : prodUrl;

  const handleDownload = async () => {
    try {
      const dataUrl = await generateQrDataUrl(targetUrl, { width: 1024 });
      downloadQrPng(dataUrl, `ServeZa_${restaurantName.replace(/\s+/g, "_")}_Table_${tableNum}_QR.png`);
    } catch (e) {
      console.error("Error generating QR PNG:", e);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto print:p-0 print:bg-white print:static">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="w-full max-w-md bg-white rounded-3xl border border-[#EDE4D8] shadow-2xl p-6 sm:p-7 space-y-6 relative print:border-none print:shadow-none print:max-w-none print:p-0"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-[#F2ECE2] print:hidden">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#c96342]/15 text-[#c96342] flex items-center justify-center">
              <QrCode className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif text-base font-bold text-[#252522]">
                Table QR Standee
              </h2>
              <p className="text-[11px] text-[#78716c]">
                Ready to print for table-side customer ordering
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 rounded-lg text-[#8C877D] hover:text-[#252522] hover:bg-[#FAF8F5] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Destination Target Switcher */}
        <div className="flex items-center justify-center p-1 rounded-xl bg-[#FAF8F5] border border-[#EDE4D8] text-xs print:hidden">
          <button
            type="button"
            onClick={() => setTargetMode("local")}
            className={`flex-1 py-1.5 px-2 rounded-lg font-bold transition-all text-center ${
              targetMode === "local"
                ? "bg-[#c96342] text-white shadow-xs"
                : "text-[#78716c] hover:text-[#1c1917]"
            }`}
          >
            📱 Local Wi-Fi (Scan with Phone)
          </button>
          <button
            type="button"
            onClick={() => setTargetMode("production")}
            className={`flex-1 py-1.5 px-2 rounded-lg font-bold transition-all text-center ${
              targetMode === "production"
                ? "bg-[#c96342] text-white shadow-xs"
                : "text-[#78716c] hover:text-[#1c1917]"
            }`}
          >
            🌐 Production (Vercel)
          </button>
        </div>

        {/* ============================================================ */}
        {/* Printable Acrylic Standee Card                                */}
        {/* ============================================================ */}
        <div
          ref={standeeRef}
          className="mx-auto w-full max-w-[340px] bg-gradient-to-b from-[#FAF8F3] to-[#FFFFFF] rounded-[28px] border-2 border-[#1c1917] p-6 text-center space-y-4 shadow-xl print:shadow-none print:border-2 print:border-black print:m-auto print:my-8"
        >
          {/* Top Brand Pill */}
          <div className="flex items-center justify-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#c96342] text-white flex items-center justify-center font-serif font-bold text-xs shadow-xs">
              SZ
            </div>
            <span className="font-serif text-sm font-bold tracking-tight text-[#1c1917]">
              ServeZa
            </span>
          </div>

          {/* Restaurant Title */}
          <div>
            <h3 className="font-serif text-lg font-bold text-[#1c1917] leading-tight">
              {restaurantName}
            </h3>
            <div className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-[#c96342] uppercase tracking-wider">
              <MapPin className="w-3 h-3" />
              <span>{table.seating_area}</span>
            </div>
          </div>

          {/* Prominent Table Number Callout */}
          <div className="py-1 px-4 rounded-xl bg-[#1c1917] text-white inline-block shadow-xs">
            <span className="text-[10px] tracking-widest uppercase font-semibold text-[#e7dfd5] block">
              Dine-In Table
            </span>
            <span className="font-serif text-2xl font-bold tracking-wider">
              {tableNum}
            </span>
          </div>

          {/* Live High-Res QR Code */}
          <div className="p-3.5 bg-white rounded-2xl border-2 border-[#ECE7DE] inline-block shadow-sm">
            <QRCodeSVG
              value={targetUrl}
              size={180}
              level="H"
              includeMargin={false}
              fgColor="#1c1917"
            />
          </div>

          {/* Action Instructions */}
          <div className="space-y-1">
            <p className="font-serif text-sm font-bold text-[#1c1917]">
              Scan to View Menu & Order
            </p>
            <p className="text-[10px] text-[#78716c] max-w-[240px] mx-auto leading-relaxed">
              Point your smartphone camera at this code. No app download or sign-in required!
            </p>
          </div>

          {/* Mini Footnote */}
          <div className="pt-2 border-t border-[#ECE7DE] text-[9px] text-[#A8A29E] tracking-widest uppercase">
            Powered by ServeZa Digital Ordering
          </div>
        </div>

        {/* URL Preview */}
        <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#EDE4D8] text-center space-y-1 print:hidden">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-[#8C877D] block">
            Encoded Destination URL
          </span>
          <span className="text-[11px] font-mono text-[#c96342] break-all select-all block font-semibold">
            {targetUrl}
          </span>
        </div>

        {/* Modal Actions */}
        <div className="grid grid-cols-3 gap-2.5 pt-2 print:hidden">
          <button
            type="button"
            onClick={handleDownload}
            className="py-2.5 px-3 rounded-xl border border-[#EDE4D8] hover:border-[#c96342]/40 bg-white hover:bg-[#FAF8F5] text-xs font-semibold text-[#252522] flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#c96342]" />
            <span>PNG</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="py-2.5 px-3 rounded-xl bg-[#c96342] hover:bg-[#b04f32] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-md shadow-[#c96342]/20 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Standee</span>
          </button>

          <a
            href={targetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-3 rounded-xl border border-[#EDE4D8] hover:border-[#c96342]/40 bg-white hover:bg-[#FAF8F5] text-xs font-semibold text-[#252522] flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer text-center"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#c96342]" />
            <span>Launch</span>
          </a>
        </div>
      </motion.div>
    </div>
  );
};
