"use client";

import { Water } from "@paper-design/shaders-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { COUPONS, type Coupon } from "../data";
import ScratchCard from "../ScratchCard";

const BASE_PATH =
  process.env.NODE_ENV === "production" ? "/mom-coupons" : "";

const ENV_W = 128;
const ENV_H = 80;
const DUCK_SIZE = 64;

type Item = {
  id: string;
  kind: "envelope" | "duck";
  coupon?: Coupon;
  w: number;
  h: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  vAngle: number;
  el: HTMLDivElement | null;
};

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function buildItems(width: number, height: number): Item[] {
  const items: Item[] = COUPONS.map((c) => ({
    id: c.id,
    kind: "envelope",
    coupon: c,
    w: ENV_W,
    h: ENV_H,
    x: 0,
    y: 0,
    vx: rand(-0.18, 0.18),
    vy: rand(-0.18, 0.18),
    angle: rand(-12, 12),
    vAngle: rand(-0.06, 0.06),
    el: null,
  }));
  items.push({
    id: "duck",
    kind: "duck",
    w: DUCK_SIZE,
    h: DUCK_SIZE,
    x: 0,
    y: 0,
    vx: rand(-0.14, 0.14),
    vy: rand(-0.14, 0.14),
    angle: rand(-10, 10),
    vAngle: rand(-0.04, 0.04),
    el: null,
  });

  for (const it of items) {
    let tries = 0;
    while (tries++ < 80) {
      it.x = rand(8, Math.max(8, width - it.w - 8));
      it.y = rand(8, Math.max(8, height - it.h - 8));
      let ok = true;
      for (const other of items) {
        if (other === it || !other.x) continue;
        if (
          it.x < other.x + other.w &&
          it.x + it.w > other.x &&
          it.y < other.y + other.h &&
          it.y + it.h > other.y
        ) {
          ok = false;
          break;
        }
      }
      if (ok) break;
    }
  }
  return items;
}

export default function Pond() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [items, setItems] = useState<Item[]>([]);
  const [selected, setSelected] = useState<Coupon | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const ids = new Set<string>();
    for (const c of COUPONS) {
      if (localStorage.getItem(`mom-scratched-${c.id}`) === "1") {
        ids.add(c.id);
      }
    }
    setRevealedIds(ids);
  }, []);

  useEffect(() => {
    const update = () => {
      const el = containerRef.current;
      if (el) setSize({ w: el.clientWidth, h: el.clientHeight });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (items.length > 0 || size.w === 0) return;
    setItems(buildItems(size.w, size.h));
  }, [size, items.length]);

  useEffect(() => {
    if (size.w === 0 || items.length === 0) return;

    const tick = () => {
      const w = size.w;
      const h = size.h;

      for (const it of items) {
        it.x += it.vx;
        it.y += it.vy;
        it.angle += it.vAngle;

        if (it.x < 0) {
          it.x = 0;
          it.vx = Math.abs(it.vx) * 0.9;
        } else if (it.x + it.w > w) {
          it.x = w - it.w;
          it.vx = -Math.abs(it.vx) * 0.9;
        }
        if (it.y < 0) {
          it.y = 0;
          it.vy = Math.abs(it.vy) * 0.9;
        } else if (it.y + it.h > h) {
          it.y = h - it.h;
          it.vy = -Math.abs(it.vy) * 0.9;
        }

        it.vx += (Math.random() - 0.5) * 0.006;
        it.vy += (Math.random() - 0.5) * 0.006;

        const speed = Math.hypot(it.vx, it.vy);
        const max = 0.4;
        if (speed > max) {
          it.vx = (it.vx / speed) * max;
          it.vy = (it.vy / speed) * max;
        }
        const min = 0.03;
        if (speed < min) {
          it.vx += (Math.random() - 0.5) * 0.02;
          it.vy += (Math.random() - 0.5) * 0.02;
        }

        it.vAngle *= 0.99;
        if (Math.abs(it.vAngle) < 0.02) {
          it.vAngle += (Math.random() - 0.5) * 0.02;
        }
      }

      for (let i = 0; i < items.length; i++) {
        for (let j = i + 1; j < items.length; j++) {
          const a = items[i];
          const b = items[j];
          const ox =
            Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
          const oy =
            Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
          if (ox <= 0 || oy <= 0) continue;

          if (ox < oy) {
            const push = ox / 2 + 0.5;
            if (a.x < b.x) {
              a.x -= push;
              b.x += push;
            } else {
              a.x += push;
              b.x -= push;
            }
            const t = a.vx;
            a.vx = b.vx * 0.85;
            b.vx = t * 0.85;
          } else {
            const push = oy / 2 + 0.5;
            if (a.y < b.y) {
              a.y -= push;
              b.y += push;
            } else {
              a.y += push;
              b.y -= push;
            }
            const t = a.vy;
            a.vy = b.vy * 0.85;
            b.vy = t * 0.85;
          }
          a.vAngle += (Math.random() - 0.5) * 0.1;
          b.vAngle += (Math.random() - 0.5) * 0.1;
        }
      }

      for (const it of items) {
        if (it.el) {
          it.el.style.transform = `translate(${it.x}px, ${it.y}px) rotate(${it.angle}deg)`;
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [size, items]);

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

      <header className="absolute top-0 inset-x-0 z-20 px-6 pt-14 text-center pointer-events-none">
        <h1 className="text-3xl font-semibold tracking-tight text-white drop-shadow-lg">
          Happy Mother&apos;s Day
        </h1>
        <p className="mt-1 text-sm text-white/80 drop-shadow">
          Tap a coupon to fish it out
        </p>
      </header>

      <div className="absolute inset-0 z-10">
        {items.map((it) => (
          <div
            key={it.id}
            ref={(el) => {
              it.el = el;
              if (el) {
                el.style.transform = `translate(${it.x}px, ${it.y}px) rotate(${it.angle}deg)`;
              }
            }}
            onClick={
              it.kind === "envelope" && it.coupon
                ? () => {
                    setSelected(it.coupon!);
                    setRevealed(
                      typeof window !== "undefined" &&
                        localStorage.getItem(
                          `mom-scratched-${it.coupon!.id}`,
                        ) === "1",
                    );
                  }
                : undefined
            }
            className={`absolute top-0 left-0 will-change-transform ${
              it.kind === "envelope" ? "cursor-pointer" : "pointer-events-none"
            }`}
            style={{ width: it.w, height: it.h }}
          >
            {it.kind === "duck" ? (
              <Duck />
            ) : it.coupon && revealedIds.has(it.coupon.id) ? (
              <RevealedCard coupon={it.coupon} />
            ) : (
              <Envelope />
            )}
          </div>
        ))}
      </div>

      {selected && (
        <Modal
          coupon={selected}
          revealed={revealed}
          onReveal={() => {
            setRevealed(true);
            setRevealedIds((prev) => {
              if (prev.has(selected.id)) return prev;
              const next = new Set(prev);
              next.add(selected.id);
              return next;
            });
          }}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}

function Envelope() {
  return (
    <div
      className="w-full h-full shadow-2xl ring-1 ring-black/10 overflow-hidden relative"
      style={{ background: "#f5ecd9" }}
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

function RevealedCard({ coupon }: { coupon: Coupon }) {
  if (coupon.image) {
    return (
      <div className="w-full h-full overflow-hidden bg-white ring-4 ring-white shadow-2xl relative">
        <Image
          src={coupon.image}
          alt={coupon.title}
          fill
          sizes={`${ENV_W}px`}
          className="object-cover"
        />
      </div>
    );
  }
  return (
    <div
      className="w-full h-full flex items-center justify-center px-3 text-center shadow-2xl ring-1 ring-black/10"
      style={{ backgroundColor: coupon.color, color: "#1a1a1a" }}
    >
      <span className="text-[11px] font-semibold leading-tight tracking-tight">
        {coupon.title}
      </span>
    </div>
  );
}

function Duck() {
  return (
    <div className="w-full h-full relative drop-shadow-2xl">
      <Image
        src={`${BASE_PATH}/duck.png`}
        alt="duck"
        fill
        sizes={`${DUCK_SIZE}px`}
        className="object-contain"
        priority
      />
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
