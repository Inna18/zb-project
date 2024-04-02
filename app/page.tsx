'use client';

import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <style jsx global>
        {`
          html {
            font-family: ${inter.style.fontFamily};
          }
        `}
      </style>
      <main>
        <div>Welcome</div>
        {/* <ThemeModeProvider>
          <AppContainer />
        </ThemeModeProvider> */}
      </main>
    </>
  );
}
