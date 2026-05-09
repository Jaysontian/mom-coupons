"use client";

import { useEffect, useState } from "react";

type Coupon = {
  id: string;
  title: string;
  description: string;
  emoji: string;
};

const COUPONS: Coupon[] = [
  {
    id: "breakfast",
    title: "Breakfast in Bed",
    description: "One morning of pancakes, fruit, and coffee — served right to your pillow.",
    emoji: "🥞",
  },
  {
    id: "dinner",
    title: "Home-Cooked Dinner",
    description: "Pick the menu. I'll cook it (and clean up after).",
    emoji: "🍝",
  },
  {
    id: "movie",
    title: "Movie Night, Your Pick",
    description: "Snacks included. No complaints from me — even for the rom-coms.",
    emoji: "🎬",
  },
  {
    id: "chores",
    title: "A Day Off From Chores",
    description: "I'll handle dishes, laundry, and whatever else is on the list.",
    emoji: "🧺",
  },
  {
    id: "drive",
    title: "Personal Chauffeur",
    description: "Wherever you need to go — I'm driving.",
    emoji: "🚗",
  },
  {
    id: "walk",
    title: "Long Walk Together",
    description: "A slow walk, good conversation, and maybe ice cream after.",
    emoji: "🍦",
  },
  {
    id: "hug",
    title: "Unlimited Hugs",
    description: "Never expires. Redeem as many times as you want.",
    emoji: "🤗",
  },
  {
    id: "wildcard",
    title: "Wildcard Wish",
    description: "Anything you want. Within reason. (Mostly.)",
    emoji: "✨",
  },
];

const STORAGE_KEY = "mom-coupons-redeemed-v1";

export default function Home() {
  const [redeemed, setRedeemed] = useState<Record<string, boolean>>({});
  const [loaded, setLoaded] = useState(false);
  const [celebrating, setCelebrating] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setRedeemed(JSON.parse(raw));
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(STORAGE_KEY, JSON.stringify(redeemed));
  }, [redeemed, loaded]);

  const toggle = (id: string) => {
    setRedeemed((prev) => ({ ...prev, [id]: !prev[id] }));
    if (!redeemed[id]) {
      setCelebrating(id);
      setTimeout(() => setCelebrating((c) => (c === id ? null : c)), 1200);
    }
  };

  const reset = () => setRedeemed({});
  const count = Object.values(redeemed).filter(Boolean).length;

  return (
    <main className="flex-1 px-6 py-12 sm:py-16 max-w-6xl mx-auto w-full">
      <header className="text-center mb-12 sm:mb-16">
        <p className="uppercase tracking-[0.3em] text-xs sm:text-sm text-rose-500 mb-4">
          Happy Mother&apos;s Day
        </p>
        <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight text-rose-900">
          Mom Coupons <span aria-hidden>💐</span>
        </h1>
        <p className="mt-5 max-w-xl mx-auto text-rose-700/80 text-base sm:text-lg leading-relaxed">
          A little book of coupons, made just for you. Tap one to redeem it —
          I&apos;ll be ready whenever you are.
        </p>
        <p className="mt-3 text-sm text-rose-500">
          {count} of {COUPONS.length} redeemed
        </p>
      </header>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {COUPONS.map((coupon) => {
          const isRedeemed = !!redeemed[coupon.id];
          const isCelebrating = celebrating === coupon.id;
          return (
            <li key={coupon.id}>
              <button
                onClick={() => toggle(coupon.id)}
                aria-pressed={isRedeemed}
                className={`group relative w-full text-left rounded-2xl p-6 border-2 border-dashed transition-all duration-300 overflow-hidden ${
                  isRedeemed
                    ? "bg-rose-100/50 border-rose-300 opacity-60"
                    : "bg-white/70 border-rose-300 hover:border-rose-400 hover:-translate-y-1 hover:shadow-xl shadow-rose-200/40 shadow-lg"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="text-4xl" aria-hidden>
                    {coupon.emoji}
                  </div>
                  <span
                    className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded-full border ${
                      isRedeemed
                        ? "border-rose-400 text-rose-500"
                        : "border-rose-300 text-rose-600 bg-rose-50"
                    }`}
                  >
                    {isRedeemed ? "Redeemed" : "Valid"}
                  </span>
                </div>
                <h2
                  className={`mt-5 text-xl font-semibold text-rose-900 ${
                    isRedeemed ? "line-through decoration-rose-400/70" : ""
                  }`}
                >
                  {coupon.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-rose-700/80">
                  {coupon.description}
                </p>
                <div className="mt-6 pt-4 border-t border-dashed border-rose-200 flex items-center justify-between text-xs text-rose-500">
                  <span>For: Mom 💖</span>
                  <span>No expiration</span>
                </div>
                {isCelebrating && (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 flex items-center justify-center text-6xl animate-ping"
                  >
                    💖
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      <footer className="mt-16 text-center">
        {count > 0 && (
          <button
            onClick={reset}
            className="text-xs uppercase tracking-widest text-rose-500 hover:text-rose-700 underline underline-offset-4"
          >
            Reset all coupons
          </button>
        )}
        <p className="mt-8 text-sm text-rose-700/70">
          Made with love. <span aria-hidden>❤️</span>
        </p>
      </footer>
    </main>
  );
}
