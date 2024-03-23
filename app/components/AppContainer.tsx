import styles from '../page.module.css'

import React from 'react'
import ThemeModeSelector from './ThemeModeSelector'
import { useThemeModeContext } from "../hooks/useThemeModeContext";
import PhotoList from './PhotoList';

const AppContainer = () => {
  const { mode } = useThemeModeContext();

  return (
    <div className={styles[mode]}>
      <ThemeModeSelector />
      <PhotoList />
    </div>
  )
}

export default AppContainer
