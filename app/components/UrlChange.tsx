import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { useUserStore } from '../stores/useUserStore';

const UrlChange = () => {
  const user = useUserStore((state) => state.user);
  const router = useRouter();
  const pathname = usePathname();
  const session = useSession();

  useEffect(() => {
    console.log(`The page is now: ${pathname}`);

    if (
      (user.role === 'ADMIN' || session.status === 'unauthenticated') &&
      (pathname === '/cart' || pathname === '/checkout')
    )
      router.replace('/'); // if ADMIN or GUEST - deny access to /cart
    if (
      session.status === 'authenticated' &&
      (pathname === '/login' || pathname === '/signup')
    )
      router.replace('/'); // if user authorized - deny access to /login & /signup, need to logout first
  }, [pathname, session]);

  return <></>;
};

export default UrlChange;
