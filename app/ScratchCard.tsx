"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  width: number;
  height: number;
  storageKey?: string;
  threshold?: number;
  brushRadius?: number;
  children: React.ReactNode;
  onRevealed?: () => void;
};

export default function ScratchCard({
  width,
  height,
  storageKey,
  threshold = 0.5,
  brushRadius = 18,
  children,
  onRevealed,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (storageKey && localStorage.getItem(storageKey) === "1") {
      setRevealed(true);
      onRevealed?.();
    }
  }, [storageKey, onRevealed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    ctx.fillStyle = "#f5ecd9";
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = "rgba(0,0,0,0.18)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(width / 2, height / 2);
    ctx.lineTo(width, 0);
    ctx.moveTo(0, height);
    ctx.lineTo(width / 2, height / 2);
    ctx.lineTo(width, height);
    ctx.stroke();

    ctx.fillStyle = "#dc2626";
    ctx.font = "700 64px var(--font-geist-sans), system-ui";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("♥", width / 2, height / 2);
  }, [width, height, revealed]);

  const reveal = () => {
    if (revealed) return;
    setRevealed(true);
    if (storageKey) localStorage.setItem(storageKey, "1");
    onRevealed?.();
  };

  const checkRatio = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let cleared = 0;
    let total = 0;
    for (let i = 3; i < data.length; i += 64) {
      total++;
      if (data[i] < 32) cleared++;
    }
    if (cleared / total >= threshold) reveal();
  };

  const localPoint = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const drawAt = (x: number, y: number) => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.globalCompositeOperation = "destination-out";
    const last = lastPoint.current;
    if (last) {
      ctx.lineWidth = brushRadius * 2;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(last.x, last.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc(x, y, brushRadius, 0, Math.PI * 2);
    ctx.fill();
    lastPoint.current = { x, y };
  };

  return (
    <div className="relative" style={{ width, height }}>
      <div className="absolute inset-0">{children}</div>
      {!revealed && (
        <canvas
          ref={canvasRef}
          style={{
            width,
            height,
            touchAction: "none",
            borderRadius: "inherit",
          }}
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
          onPointerDown={(e) => {
            (e.target as Element).setPointerCapture(e.pointerId);
            drawing.current = true;
            const p = localPoint(e);
            lastPoint.current = null;
            drawAt(p.x, p.y);
          }}
          onPointerMove={(e) => {
            if (!drawing.current) return;
            const p = localPoint(e);
            drawAt(p.x, p.y);
          }}
          onPointerUp={() => {
            drawing.current = false;
            lastPoint.current = null;
            checkRatio();
          }}
          onPointerCancel={() => {
            drawing.current = false;
            lastPoint.current = null;
          }}
        />
      )}
    </div>
  );
}
