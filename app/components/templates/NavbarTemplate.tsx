import styles from './templates.module.css';

import React from 'react';
import Links from '../molecules/Links';
import Link from 'next/link';

const MENU_LIST = ['home', 'shop', 'blog', 'about', 'contact'];

const NavbarTemplate = () => {
  return (
    <div className={styles.navbar}>
      <div>
        <Link href={'/home'}>LOGO</Link>
      </div>
      <div>
        <Links list={MENU_LIST} isMenu={true} />
      </div>
      <div>MY</div>
    </div>
  );
};

export default NavbarTemplate;
