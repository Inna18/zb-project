'use client';

import styles from './molecules.module.css';

import Link from 'next/link';
import React, { useEffect } from 'react';
import Dropdown from '@/app/components/atoms/dropdown/Dropdown';
import { usePathname } from 'next/navigation';
import { toUpper } from '@/app/utils/text';
import { usePageChangeListener } from '@/app/hooks/usePageChangeListener';

const SHOP = [{id: 1, value: 'all'}, {id: 2, value: 'category A'}, {id: 3, value: 'category B'}];

interface LinksProps {
  list: {id: number, value: string}[];
  isMenu: boolean;
  openMenu?: boolean;
  handleOpenMenu?: (param: boolean) => void;
}

const Links = (linksProps: LinksProps) => {
  const pathname = usePathname();
  const { list, isMenu, openMenu, handleOpenMenu } = linksProps;

  const changed = usePageChangeListener;

  useEffect(() => {
    if (handleOpenMenu) handleOpenMenu(false);
  }, [changed]);

  const handleOpen = (link: string) => {
    if (link !== 'shop') {
      if (handleOpenMenu) handleOpenMenu(false);
      return;
    }
    if (handleOpenMenu) handleOpenMenu(true);
  };

  const handlePath = (selectedElem: string) => {
    return new URL(`${process.env.NEXT_PUBLIC_BASE_PATH}/${selectedElem}`);
  };

  return (
    <div className={styles['links-section']}>
      {list.map((link) => (
        <span key={link.id} className={styles.link}>
          <Link
            key={link.value}
            className={isMenu && pathname === `/${link.value}` ? styles.active : ''}
            href={`/${link.value}`}
            onMouseEnter={() => handleOpen(link.value)}
          >
            {toUpper(link.value)}
          </Link>
          {openMenu && link.value === 'shop' && (
            <div className={styles['dropdown-section']}>
              <Dropdown
                key={'menu'}
                list={SHOP}
                open={openMenu}
                handleClose={handleOpenMenu}
                handlePath={handlePath}
              />
            </div>
          )}
        </span>
      ))}
    </div>
  );
};

export default Links;
