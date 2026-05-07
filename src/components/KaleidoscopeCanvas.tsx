"use client";

import { useEffect, useRef } from "react";

type KaleidoscopeCanvasProps = {
  text: string;
};

const accents = [
  "#eb0045",
  "#ab63f2",
  "#11d1ee",
  "#ffb400",
  "#07f285",
  "#05dbf2",
];

function hashText(text: string) {
  return Array.from(text).reduce((acc, char) => acc + char.charCodeAt(0), 0);
}

export function KaleidoscopeCanvas({ text }: KaleidoscopeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let animationId = 0;
    const seed = hashText(text || "kairox");
    const shardCount = 9 + (seed % 9);
    const accent = accents[seed % accents.length];
    const direction = seed % 2 === 0 ? 1 : -1;
    const speed = 0.003 + (seed % 11) / 2000;
    const particles = Array.from({ length: 180 }, (_, index) => ({
      x: Math.random(),
      y: Math.random(),
      r: 1 + Math.random() * 2.4,
      drift: 0.001 + Math.random() * 0.003,
      phase: index * 0.37,
    }));

    const draw = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      const width = Math.max(1, Math.floor(rect.width));
      const height = Math.max(1, Math.floor(rect.height));

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = "rgba(3, 5, 8, 0.28)";
      ctx.fillRect(0, 0, width, height);

      for (const particle of particles) {
        particle.x = (particle.x + particle.drift) % 1;
        const px = particle.x * width;
        const py =
          (particle.y + Math.sin(frame * 0.008 + particle.phase) * 0.04) *
          height;
        ctx.beginPath();
        ctx.fillStyle = `${accent}55`;
        ctx.arc(px, py, particle.r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.save();
      ctx.translate(width / 2, height / 2);
      const radius = Math.min(width, height) * 0.48;
      const step = (Math.PI * 2) / shardCount;

      for (let i = 0; i < shardCount; i += 1) {
        ctx.save();
        ctx.rotate(i * step + frame * speed * direction);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(radius, -radius * 0.18);
        ctx.lineTo(radius, radius * 0.18);
        ctx.closePath();
        ctx.clip();

        const gradient = ctx.createLinearGradient(0, -radius, radius, radius);
        gradient.addColorStop(0, `${accent}22`);
        gradient.addColorStop(0.5, `${accent}bb`);
        gradient.addColorStop(1, "rgba(255, 255, 255, 0.08)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, -radius, radius, radius * 2);

        ctx.rotate(-i * step * 0.35);
        ctx.fillStyle = accent;
        ctx.globalAlpha = 0.78;
        ctx.font = `600 ${Math.max(14, Math.min(18, width / 44))}px Arial, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        wrapText(
          ctx,
          text || "GaIA espera tu recuerdo",
          radius * 0.5,
          0,
          radius * 0.9,
          Math.max(18, Math.min(23, width / 36)),
        );
        ctx.restore();
      }

      ctx.restore();
      frame += 1;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animationId);
  }, [text]);

  return (
    <canvas
      ref={canvasRef}
      className="block h-[32dvh] min-h-56 w-full bg-transparent sm:h-[38dvh] md:h-[48dvh] lg:h-[50dvh] xl:h-[min(54dvh,32rem)]"
    />
  );
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
) {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";

  for (const word of words) {
    const testLine = line ? `${line} ${word}` : word;
    if (ctx.measureText(testLine).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = testLine;
    }
  }

  lines.push(line);
  const visibleLines = lines.slice(0, 7);

  visibleLines.forEach((currentLine, index) => {
    ctx.fillText(
      currentLine,
      x,
      y + (index - (visibleLines.length - 1) / 2) * lineHeight,
    );
  });
}
