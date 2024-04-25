'use client';
import styles from './organisms.module.css';

import React, { useEffect, useState } from 'react';
import Links from '@/app/components/molecules/Links';
import Link from 'next/link';
import Dropdown from '@/app/components/atoms/dropdown/Dropdown';
import { usePageChangeListener } from '@/app/hooks/usePageChangeListener';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const MENU_LIST = ['home', 'shop', 'blog', 'about', 'contact'];

const Navbar = () => {
  const session = useSession();
  const router = useRouter();

  const [profileMenu, setProfileMenu] = useState<string[]>([]);
  const [openUser, setOpenUser] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [username, setUsername] = useState<string | null | undefined>('');

  const changed = usePageChangeListener;

  useEffect(() => {
    setOpenUser(false);
    setOpenMenu(false);
  }, [changed]);

  useEffect(() => {
    console.log('sessionInfo: ', session);
    if (session.status === 'authenticated') {
      setUsername(session.data.user?.name);
      setProfileMenu(['logout', 'myPage', 'cart']);
    } else {
      setUsername('Guest');
      setProfileMenu(['login', 'signup', 'cart']);
    }
  }, [session]);

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
    }
    return new URL(`${process.env.NEXT_PUBLIC_BASE_PATH}/${selectedElem}`);
  };

  const handleLogout = () => {
    signOut();
  };

  return (
    <div className={styles.navbar} onMouseLeave={handleClose}>
      <div>
        <Link href={'/home'}>LOGO</Link>
      </div>
      <div>
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
              key={'user'}
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
