// themeContext.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { themes } from "@/utils/theme";
interface Theme {
  name: string;
  value: string;
  timelineBg: string;
  buttonBg: string;
  buttonText: string;
}

interface ThemeContextProps {
  selectedTheme: Theme;
  setSelectedTheme: (theme: Theme) => void;
}


const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [selectedTheme, setSelectedTheme] = useState<Theme>(themes[0]);

  return (
    <ThemeContext.Provider value={{ selectedTheme, setSelectedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
