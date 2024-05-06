import styles from './organisms.module.css';
import React, { useState } from 'react';
import Button from '../atoms/button/Button';

import ProductsList from './ProductsList';
import Products from './Products';

const ProductsAll = () => {
  const [subMenu, setSubMenu] = useState<string>('list');
  const [productId, setProductId] = useState<string>('');

  const subMenuRenderer = (subMenuType: string, id: string) => {
    setSubMenu(subMenuType);
    setProductId(id);
  };

  return (
    <div className={styles['product-section']}>
      {subMenu === 'list' && (
        <>
          <div className={styles['list-btn']}>
            <Button
              value='Add Product'
              className='button-long'
              onClick={() => setSubMenu('details')}
            />
          </div>
          <ProductsList renderSubMenu={subMenuRenderer} />
        </>
      )}
      {subMenu === 'details' && (
        <Products renderSubMenu={subMenuRenderer} productId={productId} />
      )}
    </div>
  );
};

export default ProductsAll;
