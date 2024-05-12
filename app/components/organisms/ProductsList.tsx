import styles from './organisms.module.css';

import React from 'react';
import Image from 'next/image';
import Spinner from '../atoms/spinner/Spinner';
import updateIcon from '@/public/icons/pen-to-square-solid.svg';
import removeIcon from '@/public/icons/delete-left-solid.svg';
import Product from '@/app/service/useProductApi';
import Pagination from '../atoms/pagination/Pagination';
import { useProductList } from '@/app/queries/queryHooks/product/useProductList';
import { useProductDeleteById } from '@/app/queries/queryHooks/product/useProductDeleteById';
import { commonConstants } from '@/app/constants/common';
import { useSearchParams } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import moment from 'moment';

interface ProductsListProps {
  renderSubMenu: (subMenu: string, id: string) => void;
}
const { LIST_EMPTY } = commonConstants;

const ProductsList = (productsListProps: ProductsListProps) => {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const { renderSubMenu } = productsListProps;
  const { isLoading, data: productList } = useProductList('_createdAt');
  const { mutate: mutateDelete, isPending: pendingDelete } =
    useProductDeleteById();
  const isLoadingOrPending = isLoading || pendingDelete;
  
  const page = searchParams?.get('page') ?? '1';
  const perPage = searchParams?.get('per_page') ?? '5';
  const totalPage =
    productList && Math.ceil(productList.length / Number(perPage));
  const start = (Number(page) - 1) * Number(perPage);
  const end = start + Number(perPage);
  const list = productList && productList.slice(start, end);

  const handleUpdate = (id: string) => {
    renderSubMenu('details', id);
  };

  const handleRemove = (id: string) => {
    mutateDelete(id, {
      onSuccess: () => {
        const prevProducts = queryClient.getQueryData(['products']);
        queryClient.setQueryData(['products'], (old: Product[]) =>
          old.filter((p) => p._id !== id)
        );
        return { prevProducts };
      },
    });
  };

  return (
    <>
      {isLoadingOrPending && <Spinner />}
      {!isLoading && (
        <div className={styles['product-list']}>
          {productList && productList.length <= 0 && (
            <div className={styles.centered}>{LIST_EMPTY}</div>
          )}
          {list &&
            list.map((product: Product) => (
              <div className={styles['product-card']} key={product._id}>
                {product.productImages &&
                  product.productImages.length === 0 && (
                    <div className={styles.centered}>No Image</div>
                  )}
                {product.productImages && product.productImages.length > 0 && (
                  <Image
                    src={product.productImages[0]}
                    alt={'user-profile'}
                    width={100}
                    height={100}
                  />
                )}
                <div className={styles['list-product-details']}>
                  <div>Name: {product.name}</div>
                  <div>Category: {product.category}</div>
                  <div>Brand: {product.brand}</div>
                  <div>
                    Created at:{' '}
                    {moment(product._createdAt).format('YYYY-MM-DD, HH:mm')}
                  </div>
                </div>
                <div className={styles['icons-section']}>
                  <a onClick={() => handleUpdate(product._id!)}>
                    <Image
                      className={styles['icon']}
                      src={updateIcon}
                      alt={'update-icon'}
                    />
                  </a>
                  <a onClick={() => handleRemove(product._id!)}>
                    <Image
                      className={styles['icon']}
                      src={removeIcon}
                      alt={'remove-icon'}
                    />
                  </a>
                </div>
              </div>
            ))}
        </div>
      )}
      {productList && totalPage > 0 && (
        <Pagination
          totalPage={totalPage}
          page={Number(page)}
          perPage={Number(perPage)}
          hasPrev={start > 0}
          hasNext={end < productList.length}
        />
      )}
    </>
  );
};

export default ProductsList;
