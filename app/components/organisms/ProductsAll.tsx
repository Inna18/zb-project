import styles from './organisms.module.css';

import React, { useState } from 'react';
import Button from '../atoms/button/Button';
import ProductsList from './ProductsList';
import Products from './Products';
import Spinner from '../atoms/spinner/Spinner';
import { useProductStore } from '@/app/stores/useProductStore';
import { useProductCreate } from '@/app/queries/queryHooks/product/useProductCreate';

const ProductsAll = () => {
  const product = useProductStore((state) => state.product);
  const resetProduct = useProductStore((state) => state.resetProduct);
  const {
    mutate,
    data: createdProduct,
    isPending: pendingCreate,
  } = useProductCreate();

  const [subMenu, setSubMenu] = useState<string>('list');
  const [productId, setProductId] = useState<string>('');

  const subMenuRenderer = (subMenuType: string, id: string) => {
    resetProduct();
    setSubMenu(subMenuType);
    setProductId(id);
  };

  const handleAddProduct = () => {
    resetProduct();
    mutate(product, {
      onSuccess: () => {
        setSubMenu('details');
      },
    });
  };

  return (
    <div className={styles['product-section']}>
      {pendingCreate && <Spinner />}
      {subMenu === 'list' && (
        <>
          <div className={styles['list-btn']}>
            <Button
              value='Add Product'
              className='button-long'
              onClick={handleAddProduct}
            />
          </div>
          <ProductsList renderSubMenu={subMenuRenderer} />
        </>
      )}
      {subMenu === 'details' && (
        <Products
          renderSubMenu={subMenuRenderer}
          productId={productId !== '' ? productId : createdProduct?._id}
          updateOrCreate={productId !== '' ? 'update' : 'create'}
        />
      )}
    </div>
  );
};

export default ProductsAll;
