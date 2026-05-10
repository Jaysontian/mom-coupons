"use client";

import { Water } from "@paper-design/shaders-react";
import Image from "next/image";
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
          image={`${BASE_PATH}/pool_floor.png`}
          colorBack="#ffffff"
          colorHighlight="#ffffff"
          highlights={1.0}
          layering={0.5}
          edges={0.8}
          waves={0.3}
          caustic={0.1}
          size={0.6}
          speed={0.7}
          scale={1.15}
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
      className="w-32 h-20 shadow-2xl ring-1 ring-black/10 overflow-hidden relative"
      style={{
        background: "#f5ecd9",
        transform: "rotate(var(--rot, 0deg))",
      }}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 128 80"
        preserveAspectRatio="none"
      >
        <path
          d="M0 0 L64 40 L128 0"
          stroke="rgba(0,0,0,0.18)"
          strokeWidth="0.6"
          fill="none"
        />
        <path
          d="M0 80 L64 40 L128 80"
          stroke="rgba(0,0,0,0.18)"
          strokeWidth="0.6"
          fill="none"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="#dc2626"
          className="drop-shadow"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </span>
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/5" />
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
