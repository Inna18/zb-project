'use client'

import AppContainer from "./components/AppContainer";
import { ModeProvider } from "./context/ModeContext";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <ModeProvider>
        <AppContainer />
      </ModeProvider>
    </main>
  );
}
