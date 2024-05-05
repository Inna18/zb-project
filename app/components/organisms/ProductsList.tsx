import styles from './organisms.module.css';

import Image from 'next/image';
import Spinner from '../atoms/spinner/Spinner';
import updateIcon from '@/public/icons/pen-to-square-solid.svg';
import removeIcon from '@/public/icons/delete-left-solid.svg';

import React from 'react';
import { useProductList } from '@/app/queries/queryHooks/product/useProductList';
import { useProductDeleteById } from '@/app/queries/queryHooks/product/useProductDeleteById';
import { commonConstants } from '@/app/constants/common';
import Product from '@/app/service/useProductApi';

interface ProductsListProps {
  renderSubMenu: (subMenu: string, id: string) => void;
}

const { LIST_EMPTY } = commonConstants;

const ProductsList = (productsListProps: ProductsListProps) => {
  const { renderSubMenu } = productsListProps;
  const { isLoading, data: productList } = useProductList();
  const { mutate: mutateDelete } = useProductDeleteById();

  const handleUpdate = (id: string) => {
    renderSubMenu('details', id);
  };

  const handleRemove = (id: string) => {
    mutateDelete(id);
  };

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
        <div className={styles['product-list']}>
          {productList && productList.length <= 0 && (
            <div className={styles.centered}>{LIST_EMPTY}</div>
          )}
          {productList &&
            productList.map((product: Product) => (
              <div className={styles['product-card']} key={product._id}>
                {product.productImages.length === 0 && (
                  <div className={styles.centered}>No Image</div>
                )}
                {product.productImages.length > 0 &&
                  product.productImages[0] && (
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
    </>
  );
};

export default ProductsList;
