"use client";

import Link from "next/link";
import { useState } from "react";
import type { Coupon } from "../../data";

export default function Detail({ coupon }: { coupon: Coupon }) {
  const [revealed, setRevealed] = useState(!coupon.surprise);

  return (
    <div className="min-h-dvh flex flex-col bg-black text-white">
      <header className="flex items-center px-6 pt-14 pb-2">
        <Link
          href="/"
          className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/80"
        >
          ←
        </Link>
      </header>

      <main className="flex-1 px-6 pt-8 flex flex-col">
        <div
          className="w-full aspect-[3/2] rounded-3xl flex items-center justify-center shadow-2xl"
          style={{ backgroundColor: coupon.color, color: "#1a1a1a" }}
          onClick={() => coupon.surprise && setRevealed(true)}
          role={coupon.surprise && !revealed ? "button" : undefined}
        >
          <span className="text-3xl font-semibold tracking-tight">
            {revealed ? coupon.title : "Tap to reveal"}
          </span>
        </div>

        <h1 className="mt-10 text-3xl font-semibold tracking-tight">
          {revealed ? coupon.title : "A surprise for you"}
        </h1>
        <p className="mt-4 text-white/70 leading-relaxed">
          {revealed ? coupon.detail : "Tap the card above when you're ready."}
        </p>
      </main>

      <div className="px-6 pb-8 pt-4">
        <Link
          href="/"
          className="block w-full text-center py-4 rounded-full bg-white text-black font-medium tracking-tight"
        >
          Back to coupons
        </Link>
      </div>
    </div>
  );
}
