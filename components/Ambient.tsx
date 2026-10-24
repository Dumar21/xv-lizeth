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

const STARS = Array.from({ length: 28 }, () => ({
  x: round(rand() * 100),
  y: round(rand() * 100),
  s: round(1 + rand() * 2),
  d: round(3 + rand() * 5),
  l: round(rand() * 5),
}));

const ORBS = [
  { x: "8%", y: "15%", w: "38vmax", bg: "radial-gradient(circle, rgba(124,58,237,0.3), transparent 70%)", blur: 60, op: 0.2, fd: 22, fx: 20, fy: -30, fs: 1.1 },
  { x: "75%", y: "8%", w: "30vmax", bg: "radial-gradient(circle, rgba(212,175,55,0.15), transparent 70%)", blur: 50, op: 0.22, fd: 28, fx: -25, fy: 20, fs: 1.2 },
  { x: "55%", y: "60%", w: "34vmax", bg: "radial-gradient(circle, rgba(139,92,246,0.2), transparent 70%)", blur: 55, op: 0.15, fd: 25, fx: 15, fy: -35, fs: 1.08 },
];

const rand2 = seeded(99);
const PETALS = Array.from({ length: 6 }, () => ({
  x: round(rand2() * 100),
  s: round(8 + rand2() * 10),
  f: round(14 + rand2() * 12),
  d: round(rand2() * 18),
  px: round(-60 + rand2() * 120),
  pr: round(360 + rand2() * 540),
}));

export default function Ambient() {
  return (
    <>
      <div className="aurora" aria-hidden>
        {/* Floating orbs for depth */}
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

        {/* Falling petals */}
        {PETALS.map((p, i) => (
          <span
            key={`petal-${i}`}
            className="petal"
            style={
              {
                left: `${p.x}%`,
                top: "-20px",
                "--ps": `${p.s}px`,
                "--pf": `${p.f}s`,
                "--pd": `${p.d}s`,
                "--px": `${p.px}px`,
                "--pr": `${p.pr}deg`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
      <div className="grain" aria-hidden />
    </>
  );
}