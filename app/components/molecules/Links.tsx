'use client';

import styles from './molecules.module.css';

import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import { capitalize } from '@/app/utils/text';

interface LinksProps {
  list: string[];
  isMenu: boolean;
}

const Links = (linksProps: LinksProps) => {
  const pathname = usePathname();
  const { list, isMenu } = linksProps;

  return (
    <div className={styles['links-section']}>
      {list.map((el) => (
        <Link
          key={el}
          className={
            isMenu ? `link ${pathname === `/${el}` ? 'active' : ''}` : ''
          }
          href={`/${el}`}
        >
          {capitalize(el)}
        </Link>
      ))}
    </div>
  );
};

export default Links;
