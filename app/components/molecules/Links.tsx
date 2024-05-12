'use client';

import styles from './molecules.module.css';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { toUpper } from '@/app/utils/text';
import { usePageChangeListener } from '@/app/hooks/usePageChangeListener';
import { useCategoryList } from '@/app/queries/queryHooks/category/useCategoryList';
import Dropdown from '@/app/components/atoms/dropdown/Dropdown';
import Link from 'next/link';
import Category from '@/app/service/useCategoryApi';

interface LinksProps {
  list: { id: number; value: string }[];
  isMenu: boolean;
  openMenu?: boolean;
  handleOpenMenu?: (param: boolean) => void;
}

const Links = (linksProps: LinksProps) => {
  const pathname = usePathname();
  const { list, isMenu, openMenu, handleOpenMenu } = linksProps;
  const { isLoading, data: categoryList } = useCategoryList();
  const [shopList, setShopList] = useState<{ id: number; value: string }[]>([]);

  useEffect(() => {
    if (categoryList) {
      setShopList([
        ...categoryList.map((category: Category) => {
          return {
            id: category._id,
            value: category.name,
            link: `shop?category=${category.name}`,
          };
        }),
      ]);
    }
  }, [categoryList]);

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
    <>
      {!isLoading && (
        <div className={styles['links-section']}>
          {list.map((link) => (
            <span key={link.id} className={styles.link}>
              <Link
                key={link.value}
                className={
                  isMenu && pathname === `/${link.value}` ? styles.active : ''
                }
                href={`/${link.value}`}
                onMouseEnter={() => handleOpen(link.value)}
              >
                {toUpper(link.value)}
              </Link>
              {openMenu && link.value === 'shop' && (
                <div className={styles['dropdown-section']}>
                  {shopList.length > 0 && (
                    <Dropdown
                      key={'menu'}
                      list={shopList}
                      open={openMenu}
                      handleClose={handleOpenMenu}
                      handlePath={handlePath}
                    />
                  )}
                </div>
              )}
            </span>
          ))}
        </div>
      )}
    </>
  );
};

export default Links;
