import styles from '@/app/components/atoms/atoms.module.css';

import React, { useEffect, useState } from 'react';
import Button from '../button/Button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface PaginationProps {
  totalPage: number;
  page: number;
  perPage: number;
  hasPrev: boolean;
  hasNext: boolean;
}

const Pagination = (paginationProps: PaginationProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { totalPage, hasPrev, hasNext } = paginationProps;
  const [pages, setPages] = useState<number[]>([]);

  let page = Number(searchParams?.get('page') ?? '1');

  useEffect(() => {
    let arr = [];
    for (let i = 1; i <= totalPage; i++) arr.push(i);
    setPages(arr);

    if (page > totalPage) {
      page = totalPage;
      router.push(`${pathname}/?page=${page}`);
    }
  }, [totalPage]);

  const handlePage = (pageNum: number) => {
    router.push(`${pathname}/?page=${Number(pageNum)}`);
  };

  return (
    <div className={styles.pagination}>
      <Button
        value='<'
        className='button-small'
        onClick={() => handlePage(page - 1)}
        disabled={!hasPrev}
      />
      {totalPage &&
        pages &&
        pages.map((pageEl) => (
          <Button
            key={pageEl}
            value={pageEl}
            onClick={() => handlePage(pageEl)}
            className={page === pageEl ? 'pg-btn-active' : 'pg-btn'}
          />
        ))}
      <Button
        value='>'
        className='button-small'
        onClick={() => handlePage(page + 1)}
        disabled={!hasNext}
      />
    </div>
  );
};

export default Pagination;
