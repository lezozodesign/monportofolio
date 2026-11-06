import React from "react";
import { motion } from "framer-motion";

/**
 * Simple animated badge component.
 *
 * Props:
 * - children: content inside the badge (text or icon).
 * - className: optional additional classes.
 * - color: background color (default: "#ff3e00").
 * - size: badge size in px (default: 24).
 */
export default function AnimatedBadge({
  children,
  className = "",
  color = "#ff3e00",
  size = 24,
}) {
  return (
    <motion.div
      className={`inline-flex items-center justify-center rounded-full ${className}`}
      style={{
        backgroundColor: color,
        width: size,
        height: size,
        fontSize: size * 0.6,
        color: "white",
        lineHeight: 1,
      }}
      whileHover={{ scale: 1.2, rotate: 10 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {children}
    </motion.div>
  );
}
