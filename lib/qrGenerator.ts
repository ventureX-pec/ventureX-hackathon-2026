import QRCode from "qrcode";

/**
 * Returns the configurable base URL of the deployed application.
 * Reads from environment variables, automatically checks Vercel URLs,
 * and falls back to window.location.origin in the browser.
 */
export function getAppBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, "");
  }

  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`.replace(/\/$/, "");
  }

  if (typeof window !== "undefined" && window.location.origin) {
    return window.location.origin.replace(/\/$/, "");
  }

  return "https://venture-x-hackathon-2026.vercel.app";
}

/**
 * Generates the standardized dynamic table menu URL:
 * https://YOUR_PRODUCTION_DOMAIN/r/RESTAURANT_SLUG/menu?table=TABLE_NUMBER
 */
export function generateTableMenuUrl(restaurantSlug?: string, tableNumber?: string): string {
  const baseUrl = getAppBaseUrl();
  const cleanSlug = encodeURIComponent((restaurantSlug || "the-corner-table").toLowerCase().trim());
  const cleanTable = encodeURIComponent((tableNumber ? String(tableNumber) : "T01").toUpperCase().trim());
  return `${baseUrl}/r/${cleanSlug}/menu?table=${cleanTable}`;
}

/**
 * Generates a high-resolution PNG Data URL for a given table QR code.
 * Uses the free 'qrcode' npm package with High Error Correction ('H').
 */
export async function generateQrDataUrl(
  text: string,
  options?: { width?: number; margin?: number; darkColor?: string; lightColor?: string }
): Promise<string> {
  const width = options?.width || 1024; // High resolution 1024px
  const margin = options?.margin !== undefined ? options.margin : 2;
  const dark = options?.darkColor || "#1c1917";
  const light = options?.lightColor || "#ffffff";

  return await QRCode.toDataURL(text, {
    width,
    margin,
    color: { dark, light },
    errorCorrectionLevel: "H",
  });
}

/**
 * Triggers a browser download of the high-resolution QR PNG
 */
export function downloadQrPng(dataUrl: string, fileName: string) {
  if (typeof window === "undefined") return;
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = fileName.endsWith(".png") ? fileName : `${fileName}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
