'use client';
import styles from '../../page.module.css';

import { Inter } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import Navbar from '@/app/components/organisms/Navbar';
import Footer from '@/app/components/organisms/Footer';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.container}>
      <SessionProvider>
        <Navbar />
        {children}
        <Footer />
      </SessionProvider>
    </div>
  );
}
