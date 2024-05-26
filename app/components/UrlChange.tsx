import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

const UrlChange = () => {
  const router = useRouter();
  const pathname = usePathname();
  const session = useSession();

  useEffect(() => {
    console.log(`The page is now: ${pathname}`);

    if (
      (session.data?.user?.role === 'ADMIN' ||
        session.status === 'unauthenticated') &&
      pathname === '/cart'
    )
      router.replace('/'); // if ADMIN or GUEST - deny access to /cart
    if (
      (session.status === 'authenticated' && pathname === '/login') ||
      pathname === '/signup'
    )
      router.replace('/'); // if user authorized - deny access to /login & /signup, need to logout first
  }, [pathname, session]);

  return <></>;
};

export default UrlChange;
