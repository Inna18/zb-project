import styles from './organisms.module.css';
import removeIcon from '@/public/icons/minus-solid.svg';

import React, { useState } from 'react';
import Input from '@/app/components/atoms/input/Input';
import Category from '@/app/service/useCategoryApi';
import Button from '@/app/components/atoms/button/Button';
import Image from 'next/image';
import Spinner from '../atoms/spinner/Spinner';
import Modal from '../atoms/modal/Modal';

import { useCategoryCreate } from '@/app/queries/queryHooks/category/useCategoryCreate';
import { useCategoryList } from '@/app/queries/queryHooks/category/useCategoryList';
import { useCategoryDelete } from '@/app/queries/queryHooks/category/useCategoryDelete';
import { useQueryClient } from '@tanstack/react-query';
import { useModal } from '@/app/hooks/useModal';

const Categories = () => {
  const queryClient = useQueryClient();
  const [category, setCategory] = useState<Category>({ name: '' });
  const [error, setError] = useState<string>('');
  const { mutate: mutateCreate } = useCategoryCreate();
  const { isLoading, data: categories } = useCategoryList();
  const { mutate: mutateDelete } = useCategoryDelete();
  const { open, close, isOpen } = useModal();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const handleAdd = () => {
    mutateCreate(category, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['categories'] });
        setCategory((prevState) => {
          return { ...prevState, name: '' };
        });
      },
      onError: (e) => {
        setError(e.message);
        open();
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
      {isLoading && <Spinner />}
      {!isLoading && (
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
                    <div className={styles['icons-section']}>
                      <a onClick={() => handleRemove(categoryEl._id)}>
                        <Image
                          className={styles.icon}
                          src={removeIcon}
                          alt={'remove-icon'}
                        />
                      </a>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <Modal
            selector={'portal'}
            show={isOpen}
            type={'alert'}
            content={error}
            onClose={close}
          />
        </>
      )}
    </>
  );
};

export default Categories;
