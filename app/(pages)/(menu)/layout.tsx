'use client';
import styles from '@/app/page.module.css';

import Navbar from '@/app/components/organisms/Navbar';
import Footer from '@/app/components/organisms/Footer';
import { Inter } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import UrlChange from '@/app/components/UrlChange';

const inter = Inter({ subsets: ['latin'] });

// Create a client
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <div className={styles.container}>
          <SessionProvider>
            <UrlChange />
            <Navbar />
            <div className={styles.overflow}>{children}</div>
            <Footer />
          </SessionProvider>
        </div>
        <div id='portal'></div>
        <div id='portal2'></div>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
