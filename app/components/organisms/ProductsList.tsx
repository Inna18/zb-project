import styles from './organisms.module.css';

import React from 'react';
import Image from 'next/image';
import Spinner from '../atoms/spinner/Spinner';
import statusUp from '@/public/icons/status-up.svg';
import statusDown from '@/public/icons/status-down.svg';
import Product from '@/app/service/useProductApi';
import Pagination from '../atoms/pagination/Pagination';
import { useProductList } from '@/app/queries/queryHooks/product/useProductList';
import { commonConstants } from '@/app/constants/common';
import { useSearchParams } from 'next/navigation';
import moment from 'moment';
import ProductListIcons from '../molecules/ProductListIcons';

interface ProductsListProps {
  renderSubMenu: (subMenu: string, id: string) => void;
}
const { LIST_EMPTY } = commonConstants;

const ProductsList = (productsListProps: ProductsListProps) => {
  const searchParams = useSearchParams();
  const { renderSubMenu } = productsListProps;
  const { isLoading, data: productList } = useProductList('_createdAt');

  const page = searchParams?.get('page') ?? '1';
  const perPage = searchParams?.get('per_page') ?? '5';
  const totalPage =
    productList && Math.ceil(productList.length / Number(perPage));
  const start = (Number(page) - 1) * Number(perPage);
  const end = start + Number(perPage);
  const list = productList && productList.slice(start, end);

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
        <div className={styles['product-list']}>
          {productList && productList.length <= 0 && (
            <div className={styles.centered}>{LIST_EMPTY}</div>
          )}
          {list &&
            list.map((product: Product) => (
              <div className={styles['product-card']} key={product._id}>
                <div className={styles.status}>
                  {product.posted === true ? (
                    <Image
                      className={styles['icon']}
                      src={statusUp}
                      alt={'status-icon'}
                    />
                  ) : (
                    <Image
                      className={styles['icon']}
                      src={statusDown}
                      alt={'status-icon'}
                    />
                  )}
                </div>
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
                <ProductListIcons
                  renderSubMenu={renderSubMenu}
                  productId={product._id!}
                />
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
