"use client";

import React from "react";
import { motion, type Variants } from "motion/react";
import { SparkleIcon } from "./Ornaments";

// ─── 1. Royal Tiara ────────────────────────────────────────────────────────
export function RoyalTiara({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 80"
      fill="none"
      aria-hidden="true"
      className={`inline-block drop-shadow-[0_4px_16px_rgba(212,175,55,0.45)] ${className}`}
    >
      <defs>
        <linearGradient id="tiara-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff6cf" />
          <stop offset="35%" stopColor="#f6e7a8" />
          <stop offset="65%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#9a7a1e" />
        </linearGradient>
        <radialGradient id="tiara-gem" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="40%" stopColor="#ede4ff" />
          <stop offset="100%" stopColor="#c4b5fd" />
        </radialGradient>
      </defs>

      {/* Headband base curve */}
      <path
        d="M 12 72 Q 80 62 148 72"
        stroke="url(#tiara-gold)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M 16 75 Q 80 65 144 75"
        stroke="url(#tiara-gold)"
        strokeWidth="1"
        strokeDasharray="2 3"
        strokeLinecap="round"
      />

      {/* Pearls along base */}
      {[24, 40, 56, 72, 80, 88, 104, 120, 136].map((cx, i) => (
        <circle key={i} cx={cx} cy={66 - Math.sin((cx / 160) * Math.PI) * 4} r="1.8" fill="url(#tiara-gem)" />
      ))}

      {/* Outer arches */}
      <path
        d="M 22 70 Q 28 48 38 46 Q 48 48 54 68"
        stroke="url(#tiara-gold)"
        strokeWidth="1.4"
        fill="none"
      />
      <path
        d="M 106 68 Q 112 48 122 46 Q 132 48 138 70"
        stroke="url(#tiara-gold)"
        strokeWidth="1.4"
        fill="none"
      />

      {/* Mid arches */}
      <path
        d="M 44 68 Q 54 36 66 32 Q 78 36 84 66"
        stroke="url(#tiara-gold)"
        strokeWidth="1.6"
        fill="none"
      />
      <path
        d="M 76 66 Q 82 36 94 32 Q 106 36 116 68"
        stroke="url(#tiara-gold)"
        strokeWidth="1.6"
        fill="none"
      />

      {/* Center Grand Peak */}
      <path
        d="M 64 66 Q 74 20 80 14 Q 86 20 96 66"
        stroke="url(#tiara-gold)"
        strokeWidth="2"
        fill="none"
      />

      {/* Fleur-de-lis / Heart motif in center */}
      <path
        d="M 80 20 C 72 26 72 38 80 44 C 88 38 88 26 80 20 Z"
        fill="url(#tiara-gold)"
        fillOpacity="0.25"
        stroke="url(#tiara-gold)"
        strokeWidth="1"
      />

      {/* Inner swirls */}
      <path
        d="M 75 42 Q 80 34 85 42 Q 80 48 75 42"
        stroke="url(#tiara-gold)"
        strokeWidth="0.8"
        fill="none"
      />
      <path
        d="M 50 56 Q 60 48 66 58"
        stroke="url(#tiara-gold)"
        strokeWidth="0.9"
        fill="none"
      />
      <path
        d="M 110 56 Q 100 48 94 58"
        stroke="url(#tiara-gold)"
        strokeWidth="0.9"
        fill="none"
      />

      {/* Jewels on peaks */}
      {/* Center Crown Teardrop Jewel */}
      <path
        d="M 80 8 L 84 14 L 80 20 L 76 14 Z"
        fill="url(#tiara-gem)"
        stroke="url(#tiara-gold)"
        strokeWidth="1"
      />
      <circle cx="80" cy="8" r="2" fill="#ffffff" />

      {/* Secondary peak jewels */}
      <circle cx="66" cy="31" r="2.5" fill="url(#tiara-gem)" stroke="url(#tiara-gold)" strokeWidth="0.8" />
      <circle cx="94" cy="31" r="2.5" fill="url(#tiara-gem)" stroke="url(#tiara-gold)" strokeWidth="0.8" />

      {/* Outer peak jewels */}
      <circle cx="38" cy="45" r="2" fill="url(#tiara-gem)" stroke="url(#tiara-gold)" strokeWidth="0.8" />
      <circle cx="122" cy="45" r="2" fill="url(#tiara-gem)" stroke="url(#tiara-gold)" strokeWidth="0.8" />

      {/* Far ends */}
      <circle cx="16" cy="68" r="2" fill="url(#tiara-gold)" />
      <circle cx="144" cy="68" r="2" fill="url(#tiara-gold)" />

      {/* Center heart gem */}
      <circle cx="80" cy="32" r="2.5" fill="#ffffff" />
    </svg>
  );
}

// ─── 2. Mis 15 Años Centerpiece Emblem ────────────────────────────────────
interface Mis15Props {
  className?: string;
  calm?: boolean | null;
  variants?: Variants;
}

export function Mis15Display({ className = "", calm = false, variants }: Mis15Props) {
  return (
    <motion.div
      variants={variants}
      className={`relative my-2 flex flex-col items-center justify-center ${className}`}
    >
      {/* Warm Golden Halo Glow behind the 15 */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 m-auto h-44 w-72 rounded-full opacity-40 blur-3xl sm:h-56 sm:w-96"
        style={{
          background: "radial-gradient(ellipse at center, rgba(212,175,55,0.45) 0%, rgba(124,58,237,0.25) 50%, transparent 75%)",
        }}
        aria-hidden="true"
      />

      {/* Floating Tiara on Top */}
      <motion.div
        animate={calm ? undefined : { y: [0, -4, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 -mb-1 sm:-mb-2"
      >
        <RoyalTiara className="h-8 w-20 sm:h-10 sm:w-26 lg:h-12 lg:w-30" />
        <SparkleIcon className="twinkle absolute -top-1 right-2 h-3.5 w-3.5 text-oro-claro" />
      </motion.div>

      {/* Top Banner: "M I S" */}
      <div className="relative z-10 flex items-center gap-2.5">
        <span className="h-px w-6 bg-linear-to-r from-transparent to-oro/70 sm:w-10" />
        <span className="font-serif text-xs font-medium tracking-[0.45em] text-oro-claro sm:text-sm sm:tracking-[0.55em]">
          MIS
        </span>
        <span className="h-px w-6 bg-linear-to-l from-transparent to-oro/70 sm:w-10" />
      </div>

      {/* Monumental "15" with Wing Flourishes */}
      <div className="relative z-10 flex items-center justify-center">
        {/* Left Wing Flourish */}
        <svg
          viewBox="0 0 70 50"
          fill="none"
          aria-hidden="true"
          className="hidden h-8 w-11 text-oro/60 sm:block sm:h-10 sm:w-14"
        >
          <path
            d="M 68 25 Q 40 10 10 20 Q 30 35 68 25 Z"
            fill="currentColor"
            fillOpacity="0.08"
            stroke="currentColor"
            strokeWidth="0.8"
          />
          <path
            d="M 68 25 Q 35 5 2 28 Q 25 45 68 25"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="1 3"
          />
          <circle cx="6" cy="24" r="2.5" fill="currentColor" fillOpacity="0.7" />
          <circle cx="20" cy="15" r="1.5" fill="currentColor" fillOpacity="0.5" />
        </svg>

        {/* The 15 Number */}
        <div className="relative px-2 sm:px-3">
          <span
            className="gold-text inline-block font-serif text-5xl font-extralight tracking-tight italic select-none sm:text-6xl md:text-7xl lg:text-8xl leading-none"
            style={{
              textShadow: "0 0 35px rgba(212,175,55,0.4), 0 8px 24px rgba(0,0,0,0.5)",
              filter: "drop-shadow(0 2px 6px rgba(154,122,30,0.5))",
            }}
          >
            15
          </span>
          <SparkleIcon
            className="twinkle absolute -top-1 right-1 h-4 w-4 text-oro-claro sm:h-5 sm:w-5"
            style={{ "--l": "0.7s" } as React.CSSProperties}
          />
          <SparkleIcon
            className="twinkle absolute bottom-2 -left-2 h-3.5 w-3.5 text-lila sm:h-4 sm:w-4"
            style={{ "--l": "1.9s" } as React.CSSProperties}
          />
        </div>

        {/* Right Wing Flourish */}
        <svg
          viewBox="0 0 70 50"
          fill="none"
          aria-hidden="true"
          className="hidden h-8 w-11 -scale-x-100 text-oro/60 sm:block sm:h-10 sm:w-14"
        >
          <path
            d="M 68 25 Q 40 10 10 20 Q 30 35 68 25 Z"
            fill="currentColor"
            fillOpacity="0.08"
            stroke="currentColor"
            strokeWidth="0.8"
          />
          <path
            d="M 68 25 Q 35 5 2 28 Q 25 45 68 25"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="1 3"
          />
          <circle cx="6" cy="24" r="2.5" fill="currentColor" fillOpacity="0.7" />
          <circle cx="20" cy="15" r="1.5" fill="currentColor" fillOpacity="0.5" />
        </svg>
      </div>

      {/* Bottom Subtitle: "A Ñ O S" */}
      <div className="relative z-10 -mt-1 flex items-center gap-3 sm:-mt-2">
        <span className="h-px w-10 bg-linear-to-r from-transparent via-oro/60 to-oro sm:w-20" />
        <span className="font-serif text-sm font-light tracking-[0.45em] text-orquidea sm:text-base sm:tracking-[0.6em]">
          AÑOS
        </span>
        <span className="h-px w-10 bg-linear-to-l from-transparent via-oro/60 to-oro sm:w-20" />
      </div>
    </motion.div>
  );
}

// ─── 3. Animated Iridescent Butterfly ─────────────────────────────────────
interface ButterflyProps {
  className?: string;
  size?: number;
  rotation?: number;
  flip?: boolean;
}

export function Butterfly({ className = "", size = 48, rotation = -15, flip = false }: ButterflyProps) {
  return (
    <div
      className={`pointer-events-none inline-block select-none ${className}`}
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
      aria-hidden="true"
    >
      <div
        className="flutter-anim"
        style={{ "--rot": `${rotation}deg` } as React.CSSProperties}
      >
        <svg
          viewBox="0 0 80 70"
          width={size}
          height={(size * 70) / 80}
          fill="none"
          className="overflow-visible drop-shadow-[0_4px_12px_rgba(124,58,237,0.45)]"
        >
        <defs>
          {/* Wing Gradients */}
          <linearGradient id="bf-wing-l" x1="1" y1="0.5" x2="0" y2="0.5">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#c4b5fd" stopOpacity="0.85" />
            <stop offset="85%" stopColor="#f6e7a8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#d4af37" stopOpacity="0.95" />
          </linearGradient>
          <linearGradient id="bf-wing-r" x1="0" y1="0.5" x2="1" y2="0.5">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#c4b5fd" stopOpacity="0.85" />
            <stop offset="85%" stopColor="#f6e7a8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#d4af37" stopOpacity="0.95" />
          </linearGradient>
          <linearGradient id="bf-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fff6cf" />
            <stop offset="100%" stopColor="#d4af37" />
          </linearGradient>
        </defs>

        {/* Left Wing Group (Flaps via CSS 3D perspective) */}
        <g className="wing-l">
          {/* Forewing */}
          <path
            d="M 40 32 C 34 18 18 2 4 14 C -6 22 4 44 40 38 Z"
            fill="url(#bf-wing-l)"
            stroke="url(#bf-gold)"
            strokeWidth="0.8"
          />
          {/* Wing filigree veins */}
          <path
            d="M 40 34 C 28 26 14 16 6 18 M 40 34 C 22 30 10 32 6 36"
            stroke="#ffffff"
            strokeOpacity="0.5"
            strokeWidth="0.6"
          />
          {/* Hindwing */}
          <path
            d="M 40 36 C 30 42 12 44 14 58 C 16 68 36 62 40 42 Z"
            fill="url(#bf-wing-l)"
            fillOpacity="0.85"
            stroke="url(#bf-gold)"
            strokeWidth="0.7"
          />
          {/* Spots */}
          <circle cx="12" cy="22" r="1.5" fill="#ffffff" />
          <circle cx="20" cy="54" r="1.2" fill="#fff6cf" />
        </g>

        {/* Right Wing Group (Flaps opposite via CSS 3D perspective) */}
        <g className="wing-r">
          {/* Forewing */}
          <path
            d="M 40 32 C 46 18 62 2 76 14 C 86 22 76 44 40 38 Z"
            fill="url(#bf-wing-r)"
            stroke="url(#bf-gold)"
            strokeWidth="0.8"
          />
          {/* Wing filigree veins */}
          <path
            d="M 40 34 C 52 26 66 16 74 18 M 40 34 C 58 30 70 32 74 36"
            stroke="#ffffff"
            strokeOpacity="0.5"
            strokeWidth="0.6"
          />
          {/* Hindwing */}
          <path
            d="M 40 36 C 50 42 68 44 66 58 C 64 68 44 62 40 42 Z"
            fill="url(#bf-wing-r)"
            fillOpacity="0.85"
            stroke="url(#bf-gold)"
            strokeWidth="0.7"
          />
          {/* Spots */}
          <circle cx="68" cy="22" r="1.5" fill="#ffffff" />
          <circle cx="60" cy="54" r="1.2" fill="#fff6cf" />
        </g>

        {/* Center Body & Antennae */}
        <g>
          {/* Antennae */}
          <path
            d="M 39 24 Q 34 14 28 10 M 41 24 Q 46 14 52 10"
            stroke="url(#bf-gold)"
            strokeWidth="0.9"
            strokeLinecap="round"
          />
          <circle cx="28" cy="10" r="1" fill="#fff6cf" />
          <circle cx="52" cy="10" r="1" fill="#fff6cf" />
          {/* Slender thorax & abdomen */}
          <ellipse cx="40" cy="28" rx="2" ry="4" fill="url(#bf-gold)" />
          <ellipse cx="40" cy="38" rx="1.6" ry="7" fill="#9a7a1e" />
        </g>
      </svg>
      </div>
    </div>
  );
}

// ─── 4. Floral Bouquet Corner & Swag ──────────────────────────────────────
export function FloralCorner({ className = "", position = "top-left" }: { className?: string; position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) {
  const transformMap = {
    "top-left": "none",
    "top-right": "scaleX(-1)",
    "bottom-left": "scaleY(-1)",
    "bottom-right": "scale(-1, -1)",
  };

  return (
    <svg
      viewBox="0 0 140 140"
      fill="none"
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
      style={{ transform: transformMap[position] }}
    >
      <defs>
        <linearGradient id="rose-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ede4ff" />
          <stop offset="50%" stopColor="#c4b5fd" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <linearGradient id="leaf-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f6e7a8" />
          <stop offset="100%" stopColor="#9a7a1e" />
        </linearGradient>
      </defs>

      {/* Botanical Vines */}
      <path
        d="M 6 120 C 18 80 40 40 120 6"
        stroke="url(#leaf-gold)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M 2 70 C 20 50 50 20 70 2"
        stroke="url(#leaf-gold)"
        strokeWidth="0.8"
        strokeDasharray="2 3"
      />

      {/* Gold & Violet Leaves */}
      <path
        d="M 24 90 C 14 80 18 64 30 70 C 42 76 34 94 24 90 Z"
        fill="url(#leaf-gold)"
        fillOpacity="0.25"
        stroke="url(#leaf-gold)"
        strokeWidth="0.8"
      />
      <path
        d="M 70 30 C 64 18 80 14 86 26 C 92 38 76 42 70 30 Z"
        fill="url(#leaf-gold)"
        fillOpacity="0.25"
        stroke="url(#leaf-gold)"
        strokeWidth="0.8"
      />
      <path
        d="M 94 14 C 104 8 114 18 108 28 C 102 38 88 24 94 14 Z"
        fill="url(#leaf-gold)"
        fillOpacity="0.2"
        stroke="url(#leaf-gold)"
        strokeWidth="0.7"
      />

      {/* Big Main Rose at Corner Hub */}
      <g transform="translate(42, 42)">
        {/* Outer petals */}
        <circle cx="0" cy="0" r="22" fill="url(#rose-grad)" fillOpacity="0.3" stroke="url(#leaf-gold)" strokeWidth="0.6" />
        <path
          d="M -16 -6 C -18 -18 6 -20 16 -10 C 24 0 14 16 0 18 C -14 18 -18 6 -16 -6 Z"
          fill="url(#rose-grad)"
          fillOpacity="0.5"
          stroke="url(#leaf-gold)"
          strokeWidth="0.8"
        />
        {/* Mid petals */}
        <path
          d="M -10 -4 C -12 -12 4 -14 10 -6 C 14 2 8 12 0 12 C -8 12 -12 4 -10 -4 Z"
          fill="url(#rose-grad)"
          fillOpacity="0.8"
          stroke="url(#leaf-gold)"
          strokeWidth="0.7"
        />
        {/* Rose core spiral */}
        <path
          d="M -4 -2 C -5 -6 3 -7 5 -3 C 7 1 3 5 0 5 C -3 5 -5 1 -4 -2"
          fill="none"
          stroke="#fff6cf"
          strokeWidth="1.2"
        />
        {/* Gold pearl center */}
        <circle cx="0" cy="0" r="2" fill="#fff6cf" />
      </g>

      {/* Secondary Flower */}
      <g transform="translate(18, 30)">
        <circle cx="0" cy="0" r="11" fill="url(#rose-grad)" fillOpacity="0.4" stroke="url(#leaf-gold)" strokeWidth="0.6" />
        <circle cx="0" cy="0" r="6" fill="url(#rose-grad)" fillOpacity="0.7" />
        <circle cx="0" cy="0" r="2" fill="#fff6cf" />
      </g>

      {/* Third Flower */}
      <g transform="translate(30, 18)">
        <circle cx="0" cy="0" r="11" fill="url(#rose-grad)" fillOpacity="0.4" stroke="url(#leaf-gold)" strokeWidth="0.6" />
        <circle cx="0" cy="0" r="6" fill="url(#rose-grad)" fillOpacity="0.7" />
        <circle cx="0" cy="0" r="2" fill="#fff6cf" />
      </g>

      {/* Tiny Gold Dewdrops */}
      <circle cx="56" cy="18" r="1.5" fill="#f6e7a8" />
      <circle cx="18" cy="56" r="1.5" fill="#f6e7a8" />
      <circle cx="90" cy="8" r="1.2" fill="#f6e7a8" />
      <circle cx="8" cy="90" r="1.2" fill="#f6e7a8" />
    </svg>
  );
}

// ─── 5. Luxury Metallic Balloon Cluster ───────────────────────────────────
export function BalloonCluster({ className = "" }: { className?: string }) {
  return (
    <div
      className={`balloon-float pointer-events-none relative inline-block select-none ${className}`}
      style={{ "--b-dur": "5.5s", "--b-tilt": "2.2deg" } as React.CSSProperties}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 160 260"
        fill="none"
        className="h-full w-full overflow-visible drop-shadow-[0_12px_28px_rgba(0,0,0,0.5)]"
      >
        <defs>
          {/* 3D Pearl White Balloon 1 */}
          <radialGradient id="balloon-white-1" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="25%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#f4f1f9" />
            <stop offset="85%" stopColor="#ded8ea" />
            <stop offset="100%" stopColor="#c5bdd3" />
          </radialGradient>

          {/* 3D Pearl White Balloon 2 */}
          <radialGradient id="balloon-white-2" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="30%" stopColor="#faf8fd" />
            <stop offset="65%" stopColor="#ebe6f4" />
            <stop offset="88%" stopColor="#d4cde2" />
            <stop offset="100%" stopColor="#b9b0ca" />
          </radialGradient>

          {/* 3D Pearl White Balloon 3 (Front Center) */}
          <radialGradient id="balloon-white-3" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="20%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#f8f6fc" />
            <stop offset="80%" stopColor="#e2dceb" />
            <stop offset="100%" stopColor="#cbbfdb" />
          </radialGradient>

          {/* Gold ribbon stroke */}
          <linearGradient id="ribbon-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f6e7a8" />
            <stop offset="100%" stopColor="#d4af37" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* ── Balloon 1 (Rear Left: Pure Pearl White) ── */}
        <g transform="translate(15, 20)">
          <path
            d="M 45 78 C 15 78 5 50 5 28 C 5 10 22 0 45 0 C 68 0 85 10 85 28 C 85 50 75 78 45 78 Z"
            fill="url(#balloon-white-1)"
            stroke="rgba(255,255,255,0.8)"
            strokeWidth="0.8"
          />
          <polygon points="45,78 41,83 49,83" fill="#b9b0ca" />
          <ellipse cx="26" cy="18" rx="7" ry="12" transform="rotate(-25 26 18)" fill="#ffffff" fillOpacity="0.9" />
          <circle cx="20" cy="13" r="2.5" fill="#ffffff" />
        </g>

        {/* ── Balloon 2 (Rear Right: Pure Pearl White) ── */}
        <g transform="translate(65, 10)">
          <path
            d="M 42 76 C 14 76 4 48 4 27 C 4 9 20 0 42 0 C 64 0 80 9 80 27 C 80 48 70 76 42 76 Z"
            fill="url(#balloon-white-2)"
            stroke="rgba(255,255,255,0.8)"
            strokeWidth="0.8"
          />
          <polygon points="42,76 38,81 46,81" fill="#b9b0ca" />
          <ellipse cx="24" cy="17" rx="6" ry="11" transform="rotate(-25 24 17)" fill="#ffffff" fillOpacity="0.9" />
          <circle cx="19" cy="12" r="2" fill="#ffffff" />
        </g>

        {/* ── Balloon 3 (Center Front: Pure Pearl White with Gold Trim) ── */}
        <g transform="translate(36, 45)">
          <path
            d="M 46 84 C 16 84 5 54 5 30 C 5 11 22 0 46 0 C 70 0 87 11 87 30 C 87 54 76 84 46 84 Z"
            fill="url(#balloon-white-3)"
            stroke="rgba(246,231,168,0.7)"
            strokeWidth="0.8"
          />
          <polygon points="46,84 41,90 51,90" fill="#a89ebd" />
          <ellipse cx="28" cy="20" rx="9" ry="16" transform="rotate(-28 28 20)" fill="#ffffff" fillOpacity="0.95" />
          <circle cx="20" cy="12" r="3.5" fill="#ffffff" />
        </g>

        {/* ── Tied Gold Ribbons & Strings (Swaying) ── */}
        <g className="ribbon-sway">
          {/* String 1 */}
          <path
            d="M 60 103 Q 72 135 80 165 Q 88 195 82 230"
            stroke="url(#ribbon-grad)"
            strokeWidth="1.2"
            fill="none"
          />
          {/* String 2 */}
          <path
            d="M 107 91 Q 95 125 84 165 Q 75 200 86 240"
            stroke="url(#ribbon-grad)"
            strokeWidth="1"
            fill="none"
          />
          {/* String 3 (from center front) */}
          <path
            d="M 82 135 Q 80 150 82 165 Q 84 185 80 250"
            stroke="url(#ribbon-grad)"
            strokeWidth="1.4"
            fill="none"
          />

          {/* Ribbon Bow / Knot at convergence */}
          <circle cx="82" cy="165" r="3.5" fill="#d4af37" />
          {/* Curly ribbon tails */}
          <path
            d="M 82 165 Q 98 175 88 190 Q 75 205 92 215 Q 102 222 96 235"
            stroke="#f6e7a8"
            strokeWidth="1.4"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 82 165 Q 68 180 78 195 Q 88 208 72 225"
            stroke="#d4af37"
            strokeWidth="1.1"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* Floating sparkles around balloons */}
        <g>
          <path d="M 28 6 L 30 10 L 34 12 L 30 14 L 28 18 L 26 14 L 22 12 L 26 10 Z" fill="#fff6cf" />
          <path d="M 135 40 L 136 43 L 139 44 L 136 45 L 135 48 L 134 45 L 131 44 L 134 43 Z" fill="#f6e7a8" />
        </g>
      </svg>
    </div>
  );
}
