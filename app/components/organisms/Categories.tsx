import styles from './organisms.module.css';

import React, { useState } from 'react';
import Input from '@/app/components/atoms/input/Input';
import Category from '@/app/service/useCategoryApi';
import Button from '@/app/components/atoms/button/Button';

import { useCategoryCreate } from '@/app/queries/queryHooks/category/useCategoryCreate';
import { useCategoryList } from '@/app/queries/queryHooks/category/useCategoryList';

const Categories = () => {
  const [category, setCategory] = useState<Category>({ name: '' });
  const {
    mutate,
    isLoading: loadingCreate,
    isError: errorCreate,
    data: addedCategory,
    status,
  } = useCategoryCreate(category);
  const {
    isLoading: loadingList,
    isError: errorList,
    data: categories,
  } = useCategoryList();
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const handleAdd = () => {
    mutate();
    setCategory((prevState) => {
      return { ...prevState, name: '' };
    });
  };

  return (
    <>
      <div className={styles['categories-section']}>
        <div className={styles['category-add']}>
          <Input
            type='text'
            placeholder='Insert category'
            id='category'
            hasLabel={true}
            labelText='Category'
            name='name'
            value={category?.name}
            className='input'
            changeFunc={handleInput}
          />
          <Button value='Add' onClick={handleAdd} />
        </div>
        <div className={styles['category-list']}>
          {categories &&
            categories.map((categoryEl: Category) => (
              <div key={categoryEl._id} className={styles['category-card']}>
                {categoryEl.name}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Categories;
