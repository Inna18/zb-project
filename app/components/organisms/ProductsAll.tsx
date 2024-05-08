import styles from './organisms.module.css';
import React, { useState } from 'react';
import Button from '../atoms/button/Button';

import ProductsList from './ProductsList';
import Products from './Products';
import { useProductCreate } from '@/app/queries/queryHooks/product/useProductCreate';
import Product from '@/app/service/useProductApi';
import Spinner from '../atoms/spinner/Spinner';
import { useQueryClient } from '@tanstack/react-query';

const ProductsAll = () => {
  const queryClient = useQueryClient();
  const [product, setProduct] = useState<Product>({
    category: '',
    brand: '',
    name: '',
    price: '',
    quantity: '',
    content: [],
    productImages: [],
  });
  const [subMenu, setSubMenu] = useState<string>('list');
  const [productId, setProductId] = useState<string>('');
  const {
    mutate,
    data: createdProduct,
    isPending: pendingCreate,
  } = useProductCreate();

  const subMenuRenderer = (subMenuType: string, id: string) => {
    setSubMenu(subMenuType);
    setProductId(id);
  };

  const handleAddProduct = () => {
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
          productId={productId}
          newProductId={productId === '' ? createdProduct?._id : ''}
        />
      )}
    </div>
  );
};

export default ProductsAll;
