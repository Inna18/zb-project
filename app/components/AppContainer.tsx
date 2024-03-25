import styles from '../page.module.css'

import React from 'react'
import ThemeModeSelector from './ThemeModeSelector'
import { useThemeModeContext } from "../hooks/useThemeModeContext";

const AppContainer = () => {
  const { mode } = useThemeModeContext();

  return (
    <div className={styles[mode]}>
      <ThemeModeSelector />
    </div>
  )
}

export default AppContainer
