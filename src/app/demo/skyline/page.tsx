"use client";

import ContributionSkyline from "@/components/ui/contribution-skyline";
import Link from "next/link";

export default function Demo() {
  // w-full is load-bearing: 21st centres every demo in a flex wrapper, and a
  // flex item left at width:auto shrinks to its contents.
  return (
    <div className="w-full bg-background px-4 py-10 sm:px-8 min-h-screen">
      <div className="max-w-[980px] mx-auto mb-6 flex items-center justify-between">
        <Link
          href="/"
          className="font-mono text-xs uppercase tracking-wider text-[#0d0d0d] hover:text-[#77756f] flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 border border-[#0d0d0d]/10 transition-colors shadow-xs"
        >
          <span>←</span> <span>Back to Portfolio</span>
        </Link>
        <span className="font-mono text-xs text-[#77756f]">
          Contribution Skyline 3D Heatmap
        </span>
      </div>
      <div className="mx-auto w-full max-w-[980px]">
        <ContributionSkyline endDate="2017-11-08" />
      </div>
    </div>
  );
}
