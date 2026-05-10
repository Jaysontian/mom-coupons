"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Coupon } from "../../data";
import ScratchCard from "../../ScratchCard";

export default function Detail({ coupon }: { coupon: Coupon }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="min-h-dvh flex flex-col bg-black text-white">
      {revealed && (
        <header className="px-4 pt-14 pb-2">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-white/80 -ml-1 px-2 py-1"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span className="text-base">Back to Coupons</span>
          </Link>
        </header>
      )}

      <main className="flex-1 flex flex-col items-center justify-center px-6">
        <ScratchCard
          width={320}
          height={220}
          storageKey={`mom-scratched-${coupon.id}`}
          onRevealed={() => setRevealed(true)}
        >
          {coupon.image ? (
            <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl relative bg-white ring-1 ring-white/15">
              <Image
                src={coupon.image}
                alt={coupon.title}
                fill
                sizes="320px"
                className="object-contain"
                priority
              />
            </div>
          ) : (
            <div
              className="w-full h-full rounded-3xl flex items-center justify-center px-6 text-center shadow-2xl ring-1 ring-white/15"
              style={{ backgroundColor: coupon.color, color: "#1a1a1a" }}
            >
              <span className="text-2xl font-semibold tracking-tight leading-tight">
                {coupon.title}
              </span>
            </div>
          )}
        </ScratchCard>

        {revealed && (
          <div className="mt-10 text-center max-w-sm animate-[fade_700ms_ease]">
            <h1 className="text-3xl font-semibold tracking-tight">
              {coupon.title}
            </h1>
            <p className="mt-4 text-white/70 leading-relaxed">
              {coupon.detail}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
