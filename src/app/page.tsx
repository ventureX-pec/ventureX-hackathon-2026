import React from "react";
import { MonoNavbar } from "@/components/landing/MonoNavbar";
import { MonoHero } from "@/components/landing/MonoHero";
import { MonoMetrics } from "@/components/landing/MonoMetrics";
import { MonoModels } from "@/components/landing/MonoModels";
import { MonoPhilosophy } from "@/components/landing/MonoPhilosophy";
import { MonoLivePreview } from "@/components/landing/MonoLivePreview";
import { MonoFooter } from "@/components/landing/MonoFooter";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#09090b] text-[#fafafa] selection:bg-amber-500/20 selection:text-amber-200">
      <MonoNavbar />
      <MonoHero />
      <MonoMetrics />
      <MonoModels />
      <MonoPhilosophy />
      <MonoLivePreview />
      <MonoFooter />
    </main>
  );
}
