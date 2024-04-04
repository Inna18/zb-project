'use client';

import { Inter } from 'next/font/google';
import NavbarTemplate from '@/app/components/templates/NavbarTemplate';
import { SessionProvider } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SessionProvider>
        <NavbarTemplate />
        {children}
      </SessionProvider>
    </>
  );
}
