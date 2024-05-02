import styles from './organisms.module.css';

import { Schema } from '@sanity/schema';
import React, { useEffect, useState } from 'react';
import Editor from '../atoms/editor/Editor';
import Input from '../atoms/input/Input';
import Button from '../atoms/button/Button';
import productSchema from '@/sanity/schemas/product';

import Product from '@/app/service/useProductApi';
import { useProductCreate } from '@/app/queries/queryHooks/product/useProductCreate';
import { useQueryClient } from '@tanstack/react-query';
import { htmlToBlocks } from '@sanity/block-tools';
import { limit } from '@/app/utils/text';
import Modal from '../atoms/modal/Modal';
import { useModal } from '@/app/hooks/useModal';
import { modalMsgConstants } from '@/app/constants/modalMsg';

interface ProductsProps {
  renderSubMenu: (param: string) => void;
}

const Products = (productProps: ProductsProps) => {
  const { renderSubMenu } = productProps;

  const queryClient = useQueryClient();
  const [product, setProduct] = useState<Product>({
    category: '',
    brand: '',
    name: '',
    price: '',
    quantity: 0,
    content: [],
    productImages: [],
  });
  const productValues = [
    product.category,
    product.brand,
    product.name,
    product.price,
    product.quantity,
  ];
  const productTitles = ['category', 'brand', 'name', 'price', 'quantity'];
  const [imgArr, setImgArr] = useState<File[]>([]);
  const [imgNames, setImgNames] = useState<string[]>([]);
  const [modalType, setModalType] = useState<string>('');
  const { open, close, isOpen } = useModal();
  const {
    PRODUCT_IMAGE_LIMIT_ERROR,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_CANCEL,
  } = modalMsgConstants();

  const { mutate } = useProductCreate();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (imgArr.length >= 5) {
      setModalType('error');
      open();
    } else {
      let file = e.currentTarget.files;
      setImgArr((prevState) => [...prevState, file?.[0]!]);
      setImgNames((prevState) => [...prevState, file?.[0].name!]);
      setProduct({
        ...product,
        productImages: [...product.productImages, ...imgArr],
      });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleContentChange = (contentDescription: string) => {
    contentDescription = '<html>' + contentDescription + '</html>';
    const schema = Schema.compile({
      name: 'schema',
      types: [productSchema],
    });
    const blockContentType = schema
      .get('product')
      .fields.find((field: any) => field.name === 'content').type;
    const blocks = htmlToBlocks(contentDescription, blockContentType);
    setProduct({ ...product, content: blocks });
  };

  const handleSave = () => {
    mutate(product, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['products'] });
        setModalType('success');
        open();
      },
    });
  };

  const handleCancel = () => {
    setModalType('cancel');
    open();
  };

  const routeBack = () => {
    close();
    renderSubMenu('list');
  };

  return (
    <>
      <div className={styles['product-details']}>
        <div className={styles['product-images']}>
          <div className={styles['images-section']}>
            {imgNames.length <= 0 && (
              <div className={styles.centered}>No Images</div>
            )}
            {imgNames &&
              imgNames.map((imgName) => (
                <div key={imgName}>{limit(imgName, 30)}</div>
              ))}
          </div>
          <Input
            type='file'
            id='product-img'
            className='image'
            labelText='Add Image'
            hasLabel={true}
            name='productImg'
            changeFunc={handleImageUpload}
          />
        </div>
        <div className={styles.titles}>
          <div>Category:</div>
          <div>Brand:</div>
          <div>Name:</div>
          <div>Price:</div>
          <div>Quantity:</div>
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
        <Editor
          onChange={(newContent: string) => handleContentChange(newContent)}
        />
      </div>
      <div className={styles['button-section']}>
        <Button value={'Save'} onClick={handleSave} />
        <Button value={'Cancel'} className='button2' onClick={handleCancel} />
      </div>
      {modalType === 'success' && (
        <Modal
          selector={'portal'}
          show={isOpen}
          type={'alert'}
          content={PRODUCT_CREATE_SUCCESS}
          onClose={routeBack}
        />
      )}
      {modalType === 'cancel' && (
        <Modal
          selector={'portal'}
          show={isOpen}
          type={'confirm'}
          content={PRODUCT_CREATE_CANCEL}
          onOk={routeBack}
          onClose={close}
        />
      )}
      {modalType === 'error' && (
        <Modal
          selector={'portal'}
          show={isOpen}
          type={'alert'}
          content={PRODUCT_IMAGE_LIMIT_ERROR}
          onClose={close}
        />
      )}
    </>
  );
};

export default Products;
