import styles from './organisms.module.css';
import removeIcon from '@/public/icons/minus-solid.svg';

import React, { useState } from 'react';
import Input from '@/app/components/atoms/input/Input';
import Category from '@/app/service/useCategoryApi';
import Button from '@/app/components/atoms/button/Button';
import Image from 'next/image';

import { useCategoryCreate } from '@/app/queries/queryHooks/category/useCategoryCreate';
import { useCategoryList } from '@/app/queries/queryHooks/category/useCategoryList';
import { useCategoryDelete } from '@/app/queries/queryHooks/category/useCategoryDelete';
import { useQueryClient } from '@tanstack/react-query';
import Spinner from '../atoms/spinner/Spinner';

const Categories = () => {
  const queryClient = useQueryClient();
  const [category, setCategory] = useState<Category>({ name: '' });
  const {
    mutate,
    isPending: pendingCreate,
    isError: errorCreate,
    data: addedCategory,
    status,
  } = useCategoryCreate();
  const {
    isLoading: loadingList,
    isError: errorList,
    data: categories,
  } = useCategoryList();
  const {
    mutate: mutateDelete,
    isPending: pendingDelete,
    isError: errorDelete,
  } = useCategoryDelete();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const handleAdd = () => {
    mutate(category, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['categories'] });
        setCategory((prevState) => {
          return { ...prevState, name: '' };
        });
      },
    });
  };

  const handleRemove = (id: string | undefined) => {
    id
      ? mutateDelete(id, {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
          },
        })
      : null;
  };

  return (
    <>
      {(loadingList || pendingCreate || pendingDelete) && <Spinner />}
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
                <a onClick={() => handleRemove(categoryEl._id)}>
                  <Image
                    className={styles.icon}
                    src={removeIcon}
                    alt={'youtube-icon'}
                  />
                </a>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Categories;
