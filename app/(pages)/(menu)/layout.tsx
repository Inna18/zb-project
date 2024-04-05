import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NavbarTemplate from '@/app/components/templates/NavbarTemplate';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavbarTemplate />
      {children}
    </>
  );
}
