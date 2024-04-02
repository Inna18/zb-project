'use client';

import { useContext } from 'react';
import { ThemeModeContext } from '../context/ThemeModeContext';

export const useThemeModeContext = () => {
  const context = useContext(ThemeModeContext);

  if (context === undefined) {
    console.log('Error. Use this context inside ThemeProvider scope...');
  }

  return context;
};
