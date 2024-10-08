'use client';
import styles from './organisms.module.css';

import React, { useEffect, useState } from 'react';
import Links from '@/app/components/molecules/Links';
import Link from 'next/link';
import Dropdown from '@/app/components/atoms/dropdown/Dropdown';
import logo from '@/public/icons/dog-solid.svg';

import { usePageChangeListener } from '@/app/hooks/usePageChangeListener';
import { signOut, useSession } from 'next-auth/react';
import { useUserStore } from '@/app/stores/useUserStore';
import { useTotalCostStore } from '@/app/stores/useTotalCostStore';
import { useCart } from '@/app/queries/queryHooks/cart/useCart';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useBuyListStore } from '@/app/stores/useBuyListStore';

const MENU_LIST = [
  { id: 1, value: 'home' },
  { id: 2, value: 'shop' },
  { id: 3, value: 'blog' },
  { id: 4, value: 'about' },
  { id: 5, value: 'contact' },
];

const Navbar = () => {
  const session = useSession();
  const router = useRouter();
  const { user, resetUser } = useUserStore((state) => state);
  const { totalCost, resetTotalCost } = useTotalCostStore((state) => state);
  const resetBuyList = useBuyListStore((state) => state.resetBuyList);
  const { mutate: mutateUpdateCart } = useCart().useCartTotalCostSet();

  const [profileMenu, setProfileMenu] = useState<
    { id: number; value: string }[]
  >([]);
  const [openUser, setOpenUser] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [username, setUsername] = useState<string | null | undefined>('');

  const changed = usePageChangeListener;

  useEffect(() => {
    setOpenUser(false);
    setOpenMenu(false);
  }, [changed]);

  useEffect(() => {
    console.log('sessionInfo: ', session.status);
    if (session.status === 'loading') {
      setProfileMenu([
        { id: 1, value: 'login' },
        { id: 2, value: 'signup' },
      ]);
    }
    if (session.status === 'authenticated') {
      setUsername(session.data.user?.name);
      if (user.role === 'ADMIN') {
        setProfileMenu([
          { id: 1, value: 'logout' },
          { id: 2, value: 'myPage' },
        ]);
      }
      if (user.role === 'USER') {
        setProfileMenu([
          { id: 1, value: 'logout' },
          { id: 2, value: 'myPage' },
          { id: 3, value: 'cart' },
        ]);
      }
    }
    if (session.status === 'unauthenticated') {
      resetUser();
      setUsername('Guest');
      setProfileMenu([
        { id: 1, value: 'login' },
        { id: 2, value: 'signup' },
      ]);
    }
  }, [session.status, user.role]);

  const handleOpenMenu = (e: boolean) => {
    setOpenMenu(e);
  };

  const handleOpenUser = (e: boolean) => {
    setOpenUser(e);
  };

  const handleClose = () => {
    setOpenUser(false);
    setOpenMenu(false);
  };

  const handlePath = (selectedElem: string) => {
    if (selectedElem === 'logout') {
      return new URL(`${process.env.NEXT_PUBLIC_BASE_PATH}/home`);
    } else
      return new URL(`${process.env.NEXT_PUBLIC_BASE_PATH}/${selectedElem}`);
  };

  const handleLogout = () => {
    if (user._id) {
      mutateUpdateCart(
        // when logout, save totalCost from Store -> Cart
        { userId: user._id, productTotalCost: totalCost }
      );
    }
    signOut();
    resetTotalCost(); // reset Stores
    resetUser();
    resetBuyList();
    console.log('home');
    router.push('/home');
  };

  return (
    <div className={styles.navbar} onMouseLeave={handleClose}>
      <div className={styles['home-icon']}>
        <Link href={'/home'}>
          <Image src={logo} alt='logo' width={40} height={40} />
        </Link>
      </div>
      <div className={styles.links}>
        <Links
          list={MENU_LIST}
          isMenu={true}
          openMenu={openMenu}
          handleOpenMenu={handleOpenMenu}
        />
      </div>
      <div className={styles.profile}>
        <div>Hello, </div>
        <Link href={'#'} onMouseEnter={() => handleOpenUser(true)}>
          {username}
        </Link>
        {openUser && (
          <div className={styles['dropdown-section']}>
            <Dropdown
              key={session.status}
              list={profileMenu}
              open={openUser}
              handleClose={handleOpenUser}
              handlePath={handlePath}
              handleLogout={handleLogout}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
