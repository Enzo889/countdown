"use client";

import React, {  useState } from "react";
import { motion } from "framer-motion";
import { themes } from "@/utils/theme";
import { useTheme } from "./themeContext";

 

export default function ThemeSelecter() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { selectedTheme, setSelectedTheme } = useTheme();

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const calculateScale = (index: number) => {
    if (hoveredIndex === null) return 0.4;
    const distance = Math.abs(index - hoveredIndex);
    return Math.max(1 - distance * 0.2, 0.4);
  };

  return (
    <div className={`flex h-screen w-fit items-center justify-start ml-4`}>
      <div className="flex flex-col">
        {themes.map((theme, i) => { // Cambiar years por themes

          return (
            <button
              key={i}
              className="relative inline-flex items-end justify-center py-1"
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={handleMouseLeave}
              onClick={() => setSelectedTheme(theme)}
              onTouchStart={() => handleMouseEnter(i)}
              onTouchEnd={handleMouseLeave}
            >
              <motion.div
                key={i}
                className={`h-1 w-10 rounded-[4px] ${
                    selectedTheme === theme
                    ? "bg-yellow-400"
                    : `${selectedTheme.timelineBg}`
                }`}
                animate={{
                  scale: calculateScale(i),
                }}
                initial={{ scale: 0.4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
              {hoveredIndex === i ? (
                <motion.span
                  className={`absolute -top-0.5 left-12 text-[11px] ${
                    selectedTheme === theme
                      ? "text-yellow-400"
                      : "text-white dark:text-black"
                  }`}
                  initial={{ opacity: 0, filter: `blur(4px)`, scale: 0.4 }}
                  animate={{ opacity: 1, filter: `blur(0px)`, scale: 1 }}
                  transition={{ duration: 0.15, delay: 0.1 }}
                >
                  {theme.name} {/* Cambiar year por theme */}
                </motion.span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}