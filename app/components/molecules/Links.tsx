'use client';

import styles from './molecules.module.css';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { capitalize } from '@/app/utils/text';
import Dropdown from '../atoms/Dropdown';
import { usePageChangeListener } from '@/app/hooks/usePageChangeListener';

const SHOP = ['all', 'category A', 'category B'];

interface LinksProps {
  list: string[];
  isMenu: boolean;
  openMenu: boolean;
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const Links = (linksProps: LinksProps) => {
  const pathname = usePathname();
  const { list, isMenu, openMenu, setOpenMenu } = linksProps;

  useEffect(() => {
    setOpenMenu(false);
  }, [usePageChangeListener]);

  return (
    <div className={styles['links-section']}>
      {list.map((el) => (
        <span key={el} className={styles.link}>
          <Link
            key={el}
            className={
              isMenu ? `link ${pathname === `/${el}` ? 'active' : ''}` : ''
            }
            href={`/${el}`}
            onMouseEnter={
              el === 'shop' ? () => setOpenMenu(true) : () => setOpenMenu(false)
            }
          >
            {capitalize(el)}
          </Link>
          {openMenu && el === 'shop' && (
            <Dropdown
              key={'menu'}
              list={SHOP}
              open={openMenu}
              setOpen={setOpenMenu}
            />
          )}
        </span>
      ))}
    </div>
  );
};

export default Links;
