"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { RoyalTiara } from "./Decorations";

interface EnvelopeCoverProps {
  guestName: string;
  shortName: string;
  onOpen: () => void;
  calm?: boolean | null;
}

const ease: [number, number, number, number] = [0.65, 0, 0.35, 1];

export function EnvelopeCover({ guestName, shortName, onOpen, calm }: EnvelopeCoverProps) {
  const [opening, setOpening] = useState(false);

  function handleClick() {
    if (opening) return;
    setOpening(true);
    onOpen();
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-7 overflow-hidden bg-linear-to-b from-noche via-[#1e0a45] to-medianoche px-5">
      <div className="damask pointer-events-none absolute inset-0 opacity-50" />
      <div className="pointer-events-none absolute inset-0 bg-radial from-vivo/25 via-transparent to-black/60" />

      {/* Destinatario */}
      <motion.div
        animate={{ opacity: opening ? 0 : 1, y: opening ? -12 : 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex flex-col items-center gap-1 text-center"
      >
        <RoyalTiara className="h-9 w-24 opacity-85 sm:h-11 sm:w-28" />
        <p className="font-serif text-xl italic text-lila sm:text-2xl">Invitación para</p>
        <p className="gold-text max-w-xs break-words px-3 py-1 font-script text-5xl leading-[1.2] sm:text-6xl">
          {guestName}
        </p>
      </motion.div>

      {/* Sobre */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.95 }}
        animate={
          opening
            ? calm
              ? { opacity: 0 }
              : { opacity: 0, scale: 4.5 }
            : { opacity: 1, y: 0, scale: 1 }
        }
        transition={
          opening
            ? calm
              ? { duration: 0.5, delay: 0.6 }
              : {
                  scale: { duration: 1.2, delay: 0.9, ease: [0.55, 0, 0.3, 1] },
                  opacity: { duration: 0.5, delay: 1.6 },
                }
            : { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
        }
        style={{ transformOrigin: "50% 50%" }}
        className="relative z-10 aspect-[3/2] w-full max-w-[460px] drop-shadow-[0_30px_40px_rgba(0,0,0,0.55)]"
      >
        {/* Cuerpo (aquí sí va overflow-hidden) */}
        <div className="absolute inset-0 overflow-hidden rounded-xl border border-oro/50 bg-linear-to-b from-[#3b1380] to-[#1e0a45]">
          <div className="damask absolute inset-0 opacity-40" />

          {/* La carta, asoma al abrir */}
          <motion.div
            animate={{ y: opening ? "-8%" : 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease }}
            className="absolute inset-x-[6%] top-[10%] bottom-[8%] z-10 flex flex-col items-center justify-center gap-1 rounded-md border border-oro/60 bg-linear-to-b from-claro to-orquidea shadow-[0_4px_16px_rgba(0,0,0,0.3)]"
          >
            <p className="font-serif text-[10px] tracking-[0.4em] text-noche uppercase sm:text-xs">Mis XV años</p>
            <p className="font-script text-4xl leading-none text-oro-oscuro sm:text-5xl">{shortName}</p>
          </motion.div>

          {/* Pliegues frontales: lados y fondo */}
          <svg
            viewBox="0 0 300 200"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-20 h-full w-full"
          >
            <defs>
              <linearGradient id="env-side" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#2a0f5c" />
                <stop offset="100%" stopColor="#1a0840" />
              </linearGradient>
              <linearGradient id="env-bottom" x1="0.5" y1="0" x2="0.5" y2="1">
                <stop offset="0%" stopColor="#34136f" />
                <stop offset="100%" stopColor="#16052f" />
              </linearGradient>
            </defs>
            <path d="M 0 0 L 150 112 L 0 200 Z" fill="url(#env-side)" stroke="#d4af37" strokeOpacity="0.35" vectorEffect="non-scaling-stroke" />
            <path d="M 300 0 L 150 112 L 300 200 Z" fill="url(#env-side)" stroke="#d4af37" strokeOpacity="0.35" vectorEffect="non-scaling-stroke" />
            <path d="M 0 200 L 150 112 L 300 200 Z" fill="url(#env-bottom)" stroke="#d4af37" strokeOpacity="0.45" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>

        {/* Solapa: fuera del cuerpo para que el 3D no se recorte */}
        <motion.div
          style={{ transformOrigin: "top center", transformPerspective: 1200 }}
          animate={{ rotateX: opening ? 180 : 0 }}
          transition={{ duration: 0.9, ease, delay: 0.15 }}
          className="pointer-events-none absolute inset-x-0 top-0 z-30 h-[58%] overflow-hidden rounded-t-xl"
        >
          <svg
            viewBox="0 0 100 58"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
            className="h-full w-full"
          >
            <defs>
              <linearGradient id="flap-fill" x1="0.5" y1="0" x2="0.5" y2="1">
                <stop offset="0%" stopColor="#4a189a" />
                <stop offset="100%" stopColor="#2e1065" />
              </linearGradient>
            </defs>
            <polygon points="0,0 100,0 50,58" fill="url(#flap-fill)" stroke="#f6e7a8" strokeOpacity="0.7" vectorEffect="non-scaling-stroke" />
          </svg>
        </motion.div>

        {/* Sello en la punta de la solapa */}
        <div className="absolute top-[58%] left-1/2 z-40 -translate-x-1/2 -translate-y-1/2">
          <motion.button
            type="button"
            onClick={handleClick}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.93 }}
            aria-label="Toca el sello para abrir la carta"
            className="relative flex h-20 w-20 items-center justify-center focus:outline-none sm:h-24 sm:w-24"
          >
            <motion.div
              animate={
                opening
                  ? { scale: [1, 1.2, 0], opacity: [1, 1, 0] }
                  : calm
                  ? undefined
                  : { scale: [1, 1.04, 1] }
              }
              transition={
                opening
                  ? { duration: 0.6, ease: "easeIn" }
                  : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
              }
              className="relative flex h-full w-full items-center justify-center"
            >
              <motion.span
                aria-hidden="true"
                animate={calm ? undefined : { scale: [1, 1.4], opacity: [0.6, 0] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: "easeOut" }}
                className="absolute inset-1 rounded-full border border-oro/70"
              />
              <svg viewBox="0 0 100 100" className="h-full w-full drop-shadow-[0_6px_14px_rgba(0,0,0,0.6)]" aria-hidden="true">
                <defs>
                  <radialGradient id="wax-body" cx="35%" cy="30%" r="65%">
                    <stop offset="0%" stopColor="#c084fc" />
                    <stop offset="40%" stopColor="#7e22ce" />
                    <stop offset="75%" stopColor="#581c87" />
                    <stop offset="100%" stopColor="#2e1065" />
                  </radialGradient>
                  <linearGradient id="wax-edge" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#fff6cf" />
                    <stop offset="100%" stopColor="#9a7a1e" />
                  </linearGradient>
                </defs>
                <path
                  d="M 50 5 C 63 3 74 11 83 20 C 93 30 97 44 94 57 C 92 71 83 83 71 90 C 59 97 41 98 29 92 C 17 86 6 74 5 60 C 4 46 11 31 21 20 C 31 10 41 6 50 5 Z"
                  fill="url(#wax-body)"
                  stroke="url(#wax-edge)"
                  strokeWidth="1.5"
                />
                <circle cx="50" cy="50" r="32" fill="none" stroke="#f6e7a8" strokeOpacity="0.7" strokeWidth="0.8" strokeDasharray="3 2" />
                <text
                  x="50"
                  y="64"
                  textAnchor="middle"
                  fill="url(#wax-edge)"
                  style={{ fontFamily: "var(--font-pinyon)", fontSize: "44px" }}
                >
                  {shortName.charAt(0)}
                </text>
              </svg>
            </motion.div>
          </motion.button>
        </div>
      </motion.div>

      <motion.p
        animate={{ opacity: opening ? 0 : 1 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 animate-pulse font-serif text-base tracking-widest text-lila/80 italic sm:text-lg"
      >
        ✦ Toca el sello para abrir ✦
      </motion.p>

      {/* Luz dorada que envuelve la pantalla al entrar en la carta */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: opening ? 1 : 0 }}
        transition={{ duration: 0.7, delay: opening ? 1.3 : 0 }}
        className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(circle_at_50%_50%,#fff6cf_0%,#f6e7a8_40%,#a78bfa_100%)]"
      />
    </div>
  );
}