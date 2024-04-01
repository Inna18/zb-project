'use client'

import AppContainer from "./components/AppContainer";
import { ThemeModeProvider } from "./context/ThemeModeContext";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <ThemeModeProvider>
        <AppContainer />
      </ThemeModeProvider>
    </main>
  );
}
