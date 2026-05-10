"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { COUPONS } from "./data";

const SPACING_DEG = 26;
const RADIUS = 380;
const AXIS_X = -300;
const TICK = 220;

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
      <header className="flex items-center justify-between px-6 pt-14 pb-2 z-30">
        <button className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/80">
          ←
        </button>
        <p className="text-sm text-white/60">
          Memory — {active + 1} of {COUPONS.length}
        </p>
        <button className="px-3 h-9 rounded-full bg-white/10 text-white/80 text-sm">
          Skip
        </button>
      </header>

      <section className="px-6 pt-6 pb-4 z-30 relative">
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
            className="absolute top-0 left-0 will-change-transform"
            style={{ transformOrigin: "0 50%" }}
          >
            <Ticket coupon={c} />
          </div>
        ))}

        <div
          ref={scrollRef}
          className="absolute inset-0 overflow-y-scroll snap-y snap-mandatory no-scrollbar z-20"
        >
          {COUPONS.map((c, i) => (
            <div key={c.id} className="snap-start" style={{ height: TICK }} />
          ))}
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black to-transparent z-10" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent z-10" />
      </div>

      <div className="px-6 pb-8 pt-4 z-30">
        <Link
          href={`/coupon/${current.id}`}
          className="block w-full text-center py-4 rounded-full bg-white text-black font-medium tracking-tight active:scale-[0.98] transition-transform"
        >
          {current.surprise ? "Reveal Surprise" : "Open Memory"}
        </Link>
      </div>
    </div>
  );
}

function Ticket({
  coupon,
}: {
  coupon: { title: string; color: string; surprise?: boolean };
}) {
  return (
    <div
      className="w-64 h-24 rounded-2xl flex items-center px-5 shadow-2xl -translate-y-1/2"
      style={{ backgroundColor: coupon.color, color: "#1a1a1a" }}
    >
      <span className="text-lg font-semibold leading-tight tracking-tight">
        {coupon.surprise ? "?" : coupon.title}
      </span>
      <span className="ml-auto w-10 h-10 rounded-full bg-black/10 shrink-0" />
    </div>
  );
}
