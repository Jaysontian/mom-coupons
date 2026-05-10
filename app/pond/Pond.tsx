"use client";

import { Water } from "@paper-design/shaders-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { COUPONS, type Coupon } from "../data";
import ScratchCard from "../ScratchCard";

const BASE_PATH =
  process.env.NODE_ENV === "production" ? "/mom-coupons" : "";

type CardSeed = {
  left: number;
  top: number;
  rotation: number;
  duration: number;
  delay: number;
  drift: number;
};

function seedFor(i: number, n: number): CardSeed {
  const cols = 3;
  const rows = Math.ceil(n / cols);
  const col = i % cols;
  const row = Math.floor(i / cols);
  const jitterX = ((i * 37) % 60) / 10 - 3;
  const jitterY = ((i * 53) % 60) / 10 - 3;
  return {
    left: 12 + col * (76 / Math.max(1, cols - 1)) + jitterX,
    top: 18 + row * (60 / Math.max(1, rows - 1)) + jitterY,
    rotation: ((i * 41) % 18) - 9,
    duration: 8 + ((i * 17) % 50) / 10,
    delay: ((i * 11) % 30) / 10,
    drift: 14 + ((i * 7) % 12),
  };
}

export default function Pond() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [selected, setSelected] = useState<Coupon | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const update = () => {
      const el = containerRef.current;
      if (el) setSize({ w: el.clientWidth, h: el.clientHeight });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden bg-black"
    >
      {size.w > 0 && (
        <Water
          width={size.w}
          height={size.h}
          image={`${BASE_PATH}/mom_and_i.webp`}
          colorBack="#000000"
          colorHighlight="#ffffff"
          highlights={0.07}
          layering={0.5}
          edges={0.8}
          waves={0.3}
          caustic={0.1}
          size={1}
          speed={0.7}
          scale={0.9}
          fit="cover"
        />
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />

      <header className="absolute top-0 inset-x-0 z-20 px-6 pt-14 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-white drop-shadow-lg">
          Happy Mother&apos;s Day
        </h1>
        <p className="mt-1 text-sm text-white/80 drop-shadow">
          Tap a coupon to fish it out
        </p>
      </header>

      <div className="absolute inset-0 z-10">
        {COUPONS.map((c, i) => {
          const s = seedFor(i, COUPONS.length);
          return (
            <button
              key={c.id}
              onClick={() => {
                setSelected(c);
                setRevealed(
                  typeof window !== "undefined" &&
                    localStorage.getItem(`mom-scratched-${c.id}`) === "1",
                );
              }}
              className="absolute will-change-transform animate-[float_var(--dur)_ease-in-out_infinite]"
              style={
                {
                  left: `${s.left}%`,
                  top: `${s.top}%`,
                  "--dur": `${s.duration}s`,
                  "--delay": `${s.delay}s`,
                  "--drift": `${s.drift}px`,
                  "--rot": `${s.rotation}deg`,
                  animationDelay: `${s.delay}s`,
                } as React.CSSProperties
              }
            >
              <FoilTicket />
            </button>
          );
        })}
      </div>

      <Link
        href="/"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-white/80 text-xs uppercase tracking-[0.2em] px-4 py-2 rounded-full bg-white/10 backdrop-blur-md ring-1 ring-white/20"
      >
        Back to wheel
      </Link>

      {selected && (
        <Modal
          coupon={selected}
          revealed={revealed}
          onReveal={() => setRevealed(true)}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}

function FoilTicket() {
  return (
    <div
      className="w-32 h-20 flex items-center justify-center shadow-2xl ring-1 ring-white/30 overflow-hidden relative"
      style={{
        background:
          "linear-gradient(135deg, #a3a3a3 0%, #e5e5e5 40%, #d4d4d4 60%, #737373 100%)",
        color: "#1a1a1a",
        transform: "rotate(var(--rot, 0deg))",
      }}
    >
      <span className="text-[10px] font-semibold tracking-[0.2em] uppercase opacity-70">
        Scratch
      </span>
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-white/10" />
    </div>
  );
}

function Modal({
  coupon,
  revealed,
  onReveal,
  onClose,
}: {
  coupon: Coupon;
  revealed: boolean;
  onReveal: () => void;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center p-6 animate-[fade_300ms_ease]"
      onClick={onClose}
    >
      <div
        className="animate-[lift_500ms_cubic-bezier(0.2,0.9,0.2,1.1)] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <ScratchCard
          width={320}
          height={220}
          storageKey={`mom-scratched-${coupon.id}`}
          onRevealed={onReveal}
        >
          {coupon.image ? (
            <div className="w-full h-full overflow-hidden bg-white ring-1 ring-white/20 shadow-2xl relative">
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
              className="w-full h-full flex items-center justify-center px-6 text-center shadow-2xl ring-1 ring-white/20"
              style={{ backgroundColor: coupon.color, color: "#1a1a1a" }}
            >
              <span className="text-2xl font-semibold tracking-tight leading-tight">
                {coupon.title}
              </span>
            </div>
          )}
        </ScratchCard>

        {revealed && (
          <div className="mt-8 text-center max-w-sm animate-[fade_700ms_ease]">
            <h2 className="text-2xl font-semibold tracking-tight text-white">
              {coupon.title}
            </h2>
            <p className="mt-3 text-white/80 leading-relaxed">{coupon.detail}</p>
          </div>
        )}

        <button
          onClick={onClose}
          className="mt-8 text-white/70 text-xs uppercase tracking-[0.2em]"
        >
          Tap to close
        </button>
      </div>
    </div>
  );
}
