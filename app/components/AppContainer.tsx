import styles from '../page.module.css'

import React from 'react'
import ModeSelector from './ModeSelector'
import { useMode } from "../hooks/useMode";

const AppContainer = () => {
  const { mode } = useMode();

  return (
    <div className={styles[mode]}>
      <ModeSelector />
      <div className={styles.description}>Study Next.js, React & TypeScript</div>
    </div>
  )
}

export default AppContainer
