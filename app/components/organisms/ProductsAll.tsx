import styles from './organisms.module.css';

import React, { useState } from 'react';
import Button from '../atoms/button/Button';
import ProductsList from './ProductsList';
import Products from './Products';
import Spinner from '../atoms/spinner/Spinner';

import { useProductStore } from '@/app/stores/useProductStore';
import { useProductIdStore } from '@/app/stores/useProductIdStore';
import { useImgCancelCountStore } from '@/app/stores/useImgCancelCountStore';
import { useProductCreate } from '@/app/queries/queryHooks/product/useProductCreate';

const ProductsAll = () => {
  const { product, resetProduct } = useProductStore((state) => state);
  const setProductId = useProductIdStore((state) => state.setProductId);
  const resetImageCount = useImgCancelCountStore(
    (state) => state.resetCancelCount
  );

  const { mutate: mutateCreate, isPending: pendingCreate } = useProductCreate();

  const [subMenu, setSubMenu] = useState<string>('list');
  const [formType, setFormType] = useState<string>('');

  const subMenuRenderer = (subMenuType: string, id: string) => {
    resetImageCount();
    resetProduct();
    setSubMenu(subMenuType);
    setProductId(id);
    setFormType('update');
  };

  const handleAddProduct = () => {
    mutateCreate(product, {
      onSuccess: (data) => {
        resetImageCount();
        resetProduct();
        setProductId(data._id);
        setFormType('create');
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
        <Products renderSubMenu={subMenuRenderer} formType={formType} />
      )}
    </div>
  );
};

export default ProductsAll;
