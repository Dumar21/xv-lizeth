"use client";

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { SparkleIcon } from "./Ornaments";

interface HandwritingTextProps {
  text: string;
  className?: string;
  delay?: number;
  trigger?: boolean;
  duration?: number;
}

export function HandwritingText({
  text,
  className = "",
  delay = 0.5,
  trigger = true,
  duration = 2.4,
}: HandwritingTextProps) {
  const prefersReduced = useReducedMotion();
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!trigger) {
      setFinished(false);
      return;
    }
    const timer = setTimeout(() => {
      setFinished(true);
    }, (delay + duration) * 1000);
    return () => clearTimeout(timer);
  }, [trigger, delay, duration]);

  if (prefersReduced) {
    return (
      <span className={`gold-text inline-block px-4 py-2 ${className}`}>
        {text}
      </span>
    );
  }

  return (
    <span className="relative inline-block max-w-full overflow-visible">
      {/* 
        Single continuous text element:
        Keeps all cursive swashes, ligatures and font curves perfectly intact
        without chopping or dividing into individual letters.
      */}
      <motion.span
        initial={{ clipPath: "inset(0% 100% 0% 0%)", opacity: 0.2 }}
        animate={
          trigger
            ? {
                clipPath: finished ? "none" : "inset(0% 0% 0% 0%)",
                opacity: 1,
              }
            : { clipPath: "inset(0% 100% 0% 0%)", opacity: 0.2 }
        }
        transition={{
          duration: duration,
          delay: delay,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        className={`gold-text inline-block whitespace-nowrap px-4 py-2 select-none ${className}`}
        style={{
          // Generous padding ensures italic swashes and ascenders are completely unclipped
          WebkitBoxDecorationBreak: "clone",
          boxDecorationBreak: "clone",
        }}
      >
        {text}
      </motion.span>

      {/* Floating Magic Gold Sparkle Quill Tip following the writing flow */}
      {trigger && !finished && (
        <motion.span
          initial={{ left: "0%", opacity: 0 }}
          animate={{
            left: "100%",
            opacity: [0, 1, 1, 0.8, 0],
          }}
          transition={{
            duration: duration,
            delay: delay,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="pointer-events-none absolute -bottom-2 z-20 -translate-x-1/2 text-oro-claro"
          aria-hidden="true"
        >
          <SparkleIcon className="h-6 w-6 animate-spin text-oro-claro drop-shadow-[0_0_14px_#fff6cf]" />
        </motion.span>
      )}
    </span>
  );
}
