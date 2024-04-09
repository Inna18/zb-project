'use client';
import styles from "../../page.module.css"

import { Inter } from 'next/font/google';
import NavbarTemplate from '@/app/components/templates/NavbarTemplate';
import { SessionProvider } from 'next-auth/react';
import Footer from '@/app/components/templates/Footer';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.container}>
      <SessionProvider>
        <NavbarTemplate />
        {children}
        <Footer />
      </SessionProvider>
    </div>
  );
}
