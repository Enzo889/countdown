"use client";

import React, {  useState } from "react";
import { motion } from "framer-motion";

const themes = [
  { name: 'Default', value: 'bg-background text-foreground', timelineBg: 'bg-white', buttonBg: 'bg-primary hover:bg-primary/90', buttonText: 'text-primary-foreground' },
  { name: 'Dark', value: 'bg-slate-950 text-slate-50', timelineBg: 'bg-slate-800', buttonBg: 'bg-slate-700 hover:bg-slate-600', buttonText: 'text-slate-50' },
  { name: 'Light', value: 'bg-slate-50 text-slate-950', timelineBg: 'bg-slate-200', buttonBg: 'bg-slate-200 hover:bg-slate-300', buttonText: 'text-slate-950' },
  { name: 'Forest', value: 'bg-emerald-900 text-emerald-50', timelineBg: 'bg-emerald-800', buttonBg: 'bg-emerald-700 hover:bg-emerald-600', buttonText: 'text-emerald-50' },
  { name: 'Ocean', value: 'bg-blue-900 text-blue-50', timelineBg: 'bg-blue-800', buttonBg: 'bg-blue-700 hover:bg-blue-600', buttonText: 'text-blue-50' },
  { name: 'Sunset', value: 'bg-orange-900 text-orange-50', timelineBg: 'bg-orange-800', buttonBg: 'bg-orange-700 hover:bg-orange-600', buttonText: 'text-orange-50' }
]; 

export default function ThemeSelecter() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selected, setSelected] = useState(themes[0]);

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
              onClick={() => setSelected(theme)}
              onTouchStart={() => handleMouseEnter(i)}
              onTouchEnd={handleMouseLeave}
            >
              <motion.div
                key={i}
                className={`h-1 w-10 rounded-[4px] ${
                    selected === theme
                    ? "bg-yellow-400"
                    : `${selected.timelineBg}`
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
                    selected === theme
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
