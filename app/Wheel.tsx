"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { COUPONS } from "./data";

const SPACING_DEG = 18;
const RADIUS = 380;
const AXIS_X = -300;
const TICK = 160;

export default function Wheel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const scroller = scrollRef.current;
    const wheel = wheelRef.current;
    if (!scroller || !wheel) return;

    let raf = 0;
    const update = () => {
      const idx = scroller.scrollTop / TICK;
      const cy = wheel.clientHeight / 2;

      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const offset = i - idx;
        const angle = offset * SPACING_DEG;
        const rad = (angle * Math.PI) / 180;
        const x = AXIS_X + RADIUS * Math.cos(rad);
        const y = cy + RADIUS * Math.sin(rad);

        const abs = Math.abs(angle);
        const visible = abs < 70;
        const opacity = visible ? Math.max(0, 1 - abs / 80) : 0;

        el.style.transform = `translate(${x}px, ${y}px) rotate(${angle}deg)`;
        el.style.opacity = `${opacity}`;
        el.style.zIndex = `${100 - Math.round(abs)}`;
      });

      setActive(Math.max(0, Math.min(COUPONS.length - 1, Math.round(idx))));
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      scroller.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const current = COUPONS[active];

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-black text-white flex flex-col">
      <section className="px-6 pt-14 pb-2 z-30 relative">
        <h1
          key={`t-${current.id}`}
          className="text-4xl font-semibold tracking-tight leading-[1.05] animate-[fade_400ms_ease]"
        >
          {current.title}
        </h1>
        <p
          key={`d-${current.id}`}
          className="mt-3 text-white/60 leading-relaxed max-w-sm animate-[fade_500ms_ease]"
        >
          {current.description}
        </p>
      </section>

      <div ref={wheelRef} className="relative flex-1 min-h-0 overflow-hidden isolate">
        {COUPONS.map((c, i) => (
          <div
            key={c.id}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="absolute top-0 left-0 will-change-transform pointer-events-none"
            style={{ transformOrigin: "0 50%" }}
          >
            <Ticket />
          </div>
        ))}

        <div
          ref={scrollRef}
          className="absolute inset-0 overflow-y-scroll snap-y snap-mandatory no-scrollbar z-20"
        >
          {COUPONS.map((c) => (
            <div key={c.id} className="snap-start" style={{ height: TICK }} />
          ))}
          <div style={{ height: "100%" }} />
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black via-black/90 to-transparent z-[200]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black via-black/90 to-transparent z-[200]" />
      </div>

      <div className="px-6 pb-8 pt-4 z-30">
        <Link
          href={`/coupon/${current.id}`}
          className="block w-full text-center py-4 rounded-full bg-white text-black font-medium tracking-tight active:scale-[0.98] transition-transform"
        >
          Scratch to Reveal
        </Link>
      </div>
    </div>
  );
}

function Ticket() {
  return (
    <div
      className="w-64 h-24 rounded-2xl flex items-center justify-center px-5 shadow-2xl -translate-y-1/2 overflow-hidden relative"
      style={{
        background:
          "linear-gradient(135deg, #a3a3a3 0%, #e5e5e5 40%, #d4d4d4 60%, #737373 100%)",
        color: "#1a1a1a",
      }}
    >
      <span className="text-sm font-semibold tracking-[0.2em] uppercase opacity-70">
        Scratch
      </span>
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-white/10" />
    </div>
  );
}
