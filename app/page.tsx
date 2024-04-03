'use client';

import { Inter } from 'next/font/google';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const { push } = useRouter();

  useEffect(() => {
    push('/home');
 }, []);
  
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
      </main>
    </>
  );
}
