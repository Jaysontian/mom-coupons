"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { COUPONS } from "./data";

export default function Wheel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let raf = 0;
    const update = () => {
      const center = container.scrollTop + container.clientHeight / 2;
      let bestIdx = 0;
      let bestDist = Infinity;

      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const itemCenter = el.offsetTop + el.offsetHeight / 2;
        const delta = itemCenter - center;
        const absDelta = Math.abs(delta);

        const angle = Math.max(-80, Math.min(80, delta * 0.6));
        const opacity = Math.max(0, 1 - absDelta / 280);

        el.style.transform = `rotateX(${angle}deg) translateZ(${-absDelta * 0.4}px)`;
        el.style.opacity = `${opacity}`;

        if (absDelta < bestDist) {
          bestDist = absDelta;
          bestIdx = i;
        }
      });

      setActive(bestIdx);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      container.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const current = COUPONS[active];

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-black text-white flex flex-col">
      <header className="flex items-center justify-between px-6 pt-14 pb-2 z-20">
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

      <section className="px-6 pt-6 pb-4 z-20 relative">
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

      <div className="relative flex-1 min-h-0" style={{ perspective: "1100px" }}>
        <div
          ref={containerRef}
          className="absolute inset-0 overflow-y-scroll snap-y snap-mandatory no-scrollbar"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="h-[40%]" />
          {COUPONS.map((c, i) => (
            <div
              key={c.id}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              className="snap-center h-32 flex items-center justify-center px-10 will-change-transform"
              style={{ transformOrigin: "center center" }}
            >
              <Ticket coupon={c} />
            </div>
          ))}
          <div className="h-[55%]" />
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-black via-black/85 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </div>

      <div className="px-6 pb-8 pt-4 z-20">
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

function Ticket({ coupon }: { coupon: { title: string; color: string; surprise?: boolean } }) {
  return (
    <div
      className="relative w-full max-w-xs h-24 rounded-2xl flex items-center px-5 shadow-2xl"
      style={{ backgroundColor: coupon.color, color: "#1a1a1a" }}
    >
      <span className="text-xl font-semibold leading-tight tracking-tight">
        {coupon.surprise ? "?" : coupon.title}
      </span>
      <span className="ml-auto w-12 h-12 rounded-full bg-black/10" />
    </div>
  );
}
