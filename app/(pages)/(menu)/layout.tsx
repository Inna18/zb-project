'use client';
import styles from '../../page.module.css';

import { Inter } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import NavbarOrganism from '@/app/components/organisms/NavbarOrganism';
import FooterOrganism from '@/app/components/organisms/FooterOrganism';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.container}>
      <SessionProvider>
        <NavbarOrganism />
        {children}
        <FooterOrganism />
      </SessionProvider>
    </div>
  );
}
