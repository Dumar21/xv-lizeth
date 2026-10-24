"use client";

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const rand = seeded(42);
const round = (n: number) => Number(n.toFixed(2));

const STARS = Array.from({ length: 12 }, () => ({
  x: round(rand() * 100),
  y: round(rand() * 100),
  s: round(1.5 + rand() * 2),
  d: round(4 + rand() * 4),
  l: round(rand() * 4),
}));

const ORBS = [
  { x: "10%", y: "15%", w: "40vmax", bg: "radial-gradient(circle, rgba(124,58,237,0.25), transparent 70%)", blur: 40, op: 0.15, fd: 25, fx: 15, fy: -20, fs: 1.1 },
  { x: "70%", y: "10%", w: "35vmax", bg: "radial-gradient(circle, rgba(212,175,55,0.12), transparent 70%)", blur: 40, op: 0.18, fd: 30, fx: -15, fy: 15, fs: 1.1 },
];

const PETALS: { x: number; s: number; f: number; d: number; px: number; pr: number }[] = [];

export default function Ambient() {
  return (
    <>
      <div className="aurora" aria-hidden>
        {/* Simplified background for performance */}
        {ORBS.map((o, i) => (
          <div
            key={`orb-${i}`}
            className="orb"
            style={
              {
                left: o.x,
                top: o.y,
                width: o.w,
                height: o.w,
                background: o.bg,
                "--blur": `${o.blur}px`,
                "--op": o.op,
                "--fd": `${o.fd}s`,
                "--fx": `${o.fx}px`,
                "--fy": `${o.fy}px`,
                "--fs": o.fs,
              } as React.CSSProperties
            }
          />
        ))}

        {/* Stars */}
        {STARS.map((t, i) => (
          <span
            key={i}
            className="star"
            style={
              {
                left: `${t.x}%`,
                top: `${t.y}%`,
                width: t.s,
                height: t.s,
                "--d": `${t.d}s`,
                "--l": `${t.l}s`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
      <div className="grain" aria-hidden />
    </>
  );
}