'use client';

import styles from './molecules.module.css';

import Link from 'next/link';
import React, { useEffect } from 'react';
import Dropdown from '@/app/components/atoms/dropdown/Dropdown';
import { usePathname } from 'next/navigation';
import { capitalize } from '@/app/utils/text';
import { usePageChangeListener } from '@/app/hooks/usePageChangeListener';

const SHOP = ['all', 'category A', 'category B'];

interface LinksProps {
  list: string[];
  isMenu: boolean;
  openMenu: boolean;
  handleOpenMenu: (param: boolean) => void;
}

const Links = (linksProps: LinksProps) => {
  const pathname = usePathname();
  const { list, isMenu, openMenu, handleOpenMenu } = linksProps;

  const changed = usePageChangeListener;

  useEffect(() => {
    handleOpenMenu(false);
  }, [changed]);

  const handleOpen = (link: string) => {
    if (link !== 'shop') {
      handleOpenMenu(false);
      return;
    }
    handleOpenMenu(true);
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
            <div className={styles['dropdown-section']}>
              <Dropdown
                key={'menu'}
                list={SHOP}
                open={openMenu}
                handleOpen={handleOpenMenu}
              />
            </div>
          )}
        </span>
      ))}
    </div>
  );
};

export default Links;
