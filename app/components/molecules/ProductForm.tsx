import styles from './molecules.module.css';

import React, { useEffect, useState } from 'react';
import Select from '../atoms/select/Select';
import Input from '../atoms/input/Input';
import { useProductStore } from '@/app/stores/useProductStore';
import { useCategoryList } from '@/app/queries/queryHooks/category/useCategoryList';
import { commonConstants } from '@/app/constants/common';

const PRODUCT_TITLES = [
  { id: 1, value: 'brand' },
  { id: 2, value: 'name' },
  { id: 3, value: 'price' },
  { id: 4, value: 'quantity' },
];
const { FIELD_EMPTY } = commonConstants;

interface ProductFormProps {
  emptyName: boolean;
  checkName: (result: boolean) => void;
}

const ProductForm = (productFormProps: ProductFormProps) => {
  const { emptyName, checkName } = productFormProps;

  const { product, updateProduct } = useProductStore((state) => state);
  const { isLoading: loadingCategories, data: categories } = useCategoryList();
  const [categoryList, setCategoryList] = useState<
    { id: number; value: string }[] | null
  >(null);

  const productValues = [
    product?.brand,
    product?.name,
    product?.price,
    product?.quantity,
  ];

  useEffect(() => {
    // load categories
    if (!loadingCategories) {
      setCategoryList(
        categories.map((category: { _id: ''; name: '' }) => {
          return { id: category._id, value: category.name };
        })
      );
    }
  }, [loadingCategories]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'name' && value !== '') checkName(false);
    updateProduct({ ...product, [name]: value });
  };

  return (
    <>
      <div className={styles.titles}>
        <div>Category:</div>
        <div>Brand:</div>
        <div>
          Name: <span className={styles['required-mark']}>*</span>
        </div>
        <div>Price:</div>
        <div>Quantity:</div>
      </div>
      <div className={styles.updates}>
        {categoryList && (
          <Select
            className={'category-select'}
            type={'category'}
            optionList={categoryList}
            changeFunc={handleInputChange}
            hasLabel={false}
            value={product.category}
          />
        )}
        {PRODUCT_TITLES.map((title, idx) => (
          <div key={title.id}>
            <>
              <Input
                type={title.value}
                changeFunc={handleInputChange}
                hasLabel={false}
                value={productValues[idx]}
                className='input'
                name={title.value}
              />
              {emptyName && title.value === 'name' && (
                <span className={styles.error}>{FIELD_EMPTY}</span>
              )}
            </>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductForm;
