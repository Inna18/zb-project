'use client';
import styles from '@/app/page.module.css';

import React from 'react';

import { useThemeModeContext } from '@/app/hooks/useThemeModeContext';

const ChangeModeBtn = () => {
  const { mode, changeMode } = useThemeModeContext();

  const handleToggleButton = () => {
    changeMode(mode === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={styles.btn}>
      <label className={styles.switch}>
        <input type='checkbox' onClick={handleToggleButton} />
        <span className={styles.sliderRound}></span>
      </label>
    </div>
  );
};

export default ChangeModeBtn;
