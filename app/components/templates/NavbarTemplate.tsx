'use client';

import styles from './templates.module.css';

import React, { useEffect, useState } from 'react';
import Links from '../molecules/Links';
import Link from 'next/link';
import Dropdown from '../atoms/Dropdown';
import { usePageChangeListener } from '@/app/hooks/usePageChangeListener';

const MENU_LIST = ['home', 'shop', 'blog', 'about', 'contact'];
const MY = ['login', 'signup', 'cart'];

const NavbarTemplate = () => {
  const [openUser, setOpenUser] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [username, setUsername] = useState<string>('Guest')

  useEffect(() => {
    setOpenUser(false);
    setOpenMenu(false);
  }, [usePageChangeListener]);

  const handleMouseLeave = () => {
    setOpenUser(false);
    setOpenMenu(false);
  };

  return (
    <div className={styles.navbar} onMouseLeave={handleMouseLeave}>
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
        <Link href={'#'} onMouseEnter={() => setOpenUser(true)}>
          { username }
        </Link>
        {openUser && (
          <Dropdown
            key={'user'}
            list={MY}
            open={openUser}
            setOpen={setOpenUser}
          />
        )}
      </div>
    </div>
  );
};

export default NavbarTemplate;
