'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const authRoutes = ['/myPage', '/cart', '/logout'];
const noAuthRoutes = ['/login', '/signup'];

export default function withAuth(Component: React.ElementType) {
  return function withAuth(props: any) {
    const router = useRouter();
    const session = useSession();

    useEffect(() => {
      if (session.status === 'unauthenticated') {
        router.replace('/');
      }
    }, [session]);

    if (session.status === 'unauthenticated') {
      return null;
    }

    return <Component {...props} />;
  };
}
