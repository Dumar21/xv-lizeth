"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

function split(target: number, now: number) {
  const diff = Math.max(0, target - now);
  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff % 86400000) / 3600000),
    m: Math.floor((diff % 3600000) / 60000),
    s: Math.floor((diff % 60000) / 1000),
    over: diff === 0,
  };
}

export default function Countdown({ target }: { target: string }) {
  const end = new Date(target).getTime();
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const p = split(end, now);

  if (p.over) {
    return <p className="gold-text inline-block px-3 py-1 font-script text-5xl">¡Hoy es el gran día!</p>;
  }

  const items: [string, number][] = [
    ["días", p.d],
    ["horas", p.h],
    ["min", p.m],
    ["seg", p.s],
  ];

  return (
    <div role="timer" aria-label="Cuenta regresiva" className="flex items-center justify-center gap-3 sm:gap-5">
      {items.map(([label, value], i) => (
        <div key={label} className="flex items-center gap-3 sm:gap-5">
          <div className="flex flex-col items-center">
            <div className="glass-card flex w-20 flex-col items-center justify-center pb-5 pt-1.5 sm:w-28 sm:pb-7 sm:pt-3">
              <div className="relative flex items-center justify-center ">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={value}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="gold-text font-serif text-5xl font-light leading-none tabular-nums sm:text-7xl"
                  >
                    {String(value).padStart(2, "0")}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
            <span className="mt-2 font-serif text-lg italic text-lila sm:text-xl">{label}</span>
          </div>
          {i < 3 && <span className="font-serif text-3xl text-oro/50 sm:text-5xl">:</span>}
        </div>
      ))}
    </div>
  );
}