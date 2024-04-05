'use client';

import styles from './molecules.module.css';

import Link from 'next/link';
import React, { useEffect } from 'react';
import Dropdown from '@/app/components/atoms/Dropdown';
import { usePathname } from 'next/navigation';
import { capitalize } from '@/app/utils/text';
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

  const changed = usePageChangeListener;

  useEffect(() => {
    setOpenMenu(false);
  }, [changed]);

  const handleOpen = (link: string) => {
    if (link !== 'shop') {
      setOpenMenu(false);
      return;
    }
    setOpenMenu(true);
  };

  return (
    <div className={styles['links-section']}>
      {list.map((link) => (
        <span key={link} className={styles.link}>
          <Link
            key={link}
            className={
              isMenu ? `link ${pathname === `/${link}` ? 'active' : ''}` : ''
            }
            href={`/${link}`}
            onMouseEnter={() => handleOpen(link)}
          >
            {capitalize(link)}
          </Link>
          {openMenu && link === 'shop' && (
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
