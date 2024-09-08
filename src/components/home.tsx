"use client";

import React from 'react'
import ThemeSelecter from './theme-selecter';
import { useTheme } from './themeContext';

function Homepage() {
    const { selectedTheme } = useTheme();

    return (
    <>
    <div className={`${selectedTheme.value}`}>
      <ThemeSelecter />
    </div>
    </>
  );
}

export default Homepage;