'use client';

import styles from './molecules.module.css';

import Link from 'next/link';
import React, { useEffect } from 'react';
import Dropdown from '@/app/components/atoms/dropdown/Dropdown';
import { usePathname } from 'next/navigation';
import { toUpper } from '@/app/utils/text';
import { usePageChangeListener } from '@/app/hooks/usePageChangeListener';
import { generateUuid } from '@/app/utils/uuid';

const SHOP = ['all', 'category A', 'category B'];

interface LinksProps {
  list: string[];
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
        <span key={generateUuid()} className={styles.link}>
          <Link
            key={link}
            className={isMenu && pathname === `/${link}` ? styles.active : ''}
            href={`/${link}`}
            onMouseEnter={() => handleOpen(link)}
          >
            {toUpper(link)}
          </Link>
          {openMenu && link === 'shop' && (
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
