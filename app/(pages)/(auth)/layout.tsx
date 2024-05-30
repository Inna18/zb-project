'use client';

import { SessionProvider } from 'next-auth/react';
import { Inter } from 'next/font/google';
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
      <div className={`${inter.className}`}>
        <SessionProvider>
          <UrlChange />
          {children}
        </SessionProvider>
        <div id='portal'></div>
        <div id='portal2'></div>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
