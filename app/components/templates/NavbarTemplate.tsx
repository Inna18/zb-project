'use client';
import styles from './templates.module.css';

import React, { useEffect, useState } from 'react';
import Links from '@/app/components/molecules/Links';
import Link from 'next/link';
import Dropdown from '@/app/components/atoms/dropdown/Dropdown';
import { usePageChangeListener } from '@/app/hooks/usePageChangeListener';
import { useSession } from 'next-auth/react';

const MENU_LIST = ['home', 'shop', 'blog', 'about', 'contact'];
const MY = ['login', 'signup', 'cart'];

const NavbarTemplate = () => {
  const session = useSession();

  const [openUser, setOpenUser] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [username, setUsername] = useState<string | null | undefined>('Guest');

  const changed = usePageChangeListener;

  useEffect(() => {
    setOpenUser(false);
    setOpenMenu(false);
  }, [changed]);

  useEffect(() => {
    console.log('sessionInfo: ', session);
    if (session.status === 'authenticated') {
      setUsername(session.data.user?.name);
    } else {
      setUsername('Guest');
    }
  }, [session]);

  const handleOpen = () => setOpenUser(true);

  const handleClose = () => {
    setOpenUser(false);
    setOpenMenu(false);
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
          setOpenMenu={setOpenMenu}
        />
      </div>
      <div className={styles.profile}>
        <div>Hello, </div>
        <Link href={'#'} onMouseEnter={handleOpen}>
          {username}
        </Link>
        {openUser && (
          <div className={styles['dropdown-section']}>
            <Dropdown
              key={'user'}
              list={MY}
              open={openUser}
              setOpen={setOpenUser}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default NavbarTemplate;
