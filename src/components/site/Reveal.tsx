"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export type RevealPreset = "up" | "down" | "left" | "right" | "scale" | "blur";

export function Reveal({
  children,
  delay = 0,
  className = "",
  preset = "up",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  preset?: RevealPreset;
}) {
  const variants = {
    up: { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } },
    down: { hidden: { opacity: 0, y: -50 }, visible: { opacity: 1, y: 0 } },
    left: { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } },
    scale: { hidden: { opacity: 0, scale: 0.85 }, visible: { opacity: 1, scale: 1 } },
    blur: { hidden: { opacity: 0, filter: "blur(16px)", y: 20 }, visible: { opacity: 1, filter: "blur(0px)", y: 0 } },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
      transition={{ 
        duration: 1.4, 
        ease: [0.22, 1, 0.36, 1], 
        delay: delay / 1000 
      }}
      variants={variants[preset]}
    >
      {children}
    </motion.div>
  );
}
