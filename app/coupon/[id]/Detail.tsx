"use client";

import Link from "next/link";
import { useState } from "react";
import type { Coupon } from "../../data";
import ScratchCard from "../../ScratchCard";

export default function Detail({ coupon }: { coupon: Coupon }) {
  const [revealed, setRevealed] = useState(false);

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

      <main className="flex-1 px-6 pt-8 flex flex-col items-center">
        <ScratchCard
          width={320}
          height={220}
          storageKey={`mom-scratched-${coupon.id}`}
          onRevealed={() => setRevealed(true)}
        >
          <div
            className="w-full h-full rounded-3xl flex items-center justify-center px-6 text-center shadow-2xl"
            style={{ backgroundColor: coupon.color, color: "#1a1a1a" }}
          >
            <span className="text-2xl font-semibold tracking-tight leading-tight">
              {coupon.title}
            </span>
          </div>
        </ScratchCard>

        <div className="mt-10 text-center max-w-sm">
          <h1
            className={`text-3xl font-semibold tracking-tight transition-opacity duration-700 ${
              revealed ? "opacity-100" : "opacity-30"
            }`}
          >
            {revealed ? coupon.title : "Not yet…"}
          </h1>
          <p
            className={`mt-4 text-white/70 leading-relaxed transition-opacity duration-700 ${
              revealed ? "opacity-100" : "opacity-0"
            }`}
          >
            {coupon.detail}
          </p>
          {!revealed && (
            <p className="mt-4 text-white/40 text-sm">
              Drag your finger across the card to scratch it off.
            </p>
          )}
        </div>
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
