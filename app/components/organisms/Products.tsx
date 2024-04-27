import styles from './organisms.module.css'

import React, { useState } from 'react';
import Editor from '../atoms/editor/Editor';
import Input from '../atoms/input/Input';
import Button from '../atoms/button/Button';

import Product from '@/app/service/useProductApi';
import { useProductCreate } from '@/app/queries/queryHooks/product/useProductCreate';
import { useQueryClient } from '@tanstack/react-query';

const Products = () => {
  const queryClient = useQueryClient();
  const [product, setProduct] = useState<Product>({
    category: '',
    brand: '',
    name: '',
    price: '',
    quantity: 0
  });
  const productValues = [
    product.category, 
    product.brand, 
    product.name, 
    product.price, 
    product.quantity
  ]
  const productTitles = [
    'category', 'brand', 'name', 'price', 'quantity'
  ]

  const { mutate } = useProductCreate();
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSave = () => {
    mutate(product, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['products'] });
      }
    })
  }
  
  return (
    <div className={styles['product-section']}>
      <div className={styles['product-details']}>
        <div className={styles.titles}>
          <div>
            Category: <span className={styles['required-mark']}>*</span>
          </div>
          <div>
            Brand: <span className={styles['required-mark']}>*</span>
          </div>
          <div>
            Name: <span className={styles['required-mark']}>*</span>
          </div>
          <div>
            Price: <span className={styles['required-mark']}>*</span>
          </div>
          <div>
            Quantity: <span className={styles['required-mark']}>*</span>
          </div>
        </div>
        <div className={styles.updates}>
          {productTitles.map((title, idx) => (
            <div key={title}>
              <Input
                type={title}
                changeFunc={handleInputChange}
                hasLabel={false}
                value={productValues[idx]}
                className='input'
                name={title}
              />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.editor}>
        <Editor />
      </div>
      <Button value={'Save'} onClick={handleSave} />
    </div>
  );
};

export default Products;
