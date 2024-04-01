import AppContainer from "./components/AppContainer";
import { ThemeModeProvider } from "./context/ThemeModeContext";
import styles from "./page.module.css";
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}
      </style>
      <main className={styles.main}>
        <ThemeModeProvider>
          <AppContainer />
        </ThemeModeProvider>
      </main>
    </>
  
  );
}
