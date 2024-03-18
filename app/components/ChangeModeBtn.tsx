'use client';

import React from 'react'
import styles from '../page.module.css'

interface Props {
  toggleMode: () => void
}

const ChangeModeBtn = ({toggleMode}: Props) => {

  return (
    <div className={styles.btn}>
      <label className={styles.switch}>
        <input type="checkbox" onClick={() => toggleMode()}/>
        <span className={styles.sliderRound}></span>
      </label>
    </div>
  )
}

export default ChangeModeBtn