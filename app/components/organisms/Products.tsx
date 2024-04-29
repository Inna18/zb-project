import styles from './organisms.module.css';

import { Schema } from '@sanity/schema';
import React, { useEffect, useState } from 'react';
import Editor from '../atoms/editor/Editor';
import Input from '../atoms/input/Input';
import Button from '../atoms/button/Button';
import productSchema from '@/sanity/schemas/product';

import Product from '@/app/service/useProductApi';
import { useProductCreate } from '@/app/queries/queryHooks/product/useProductCreate';
import { useProductUpdate } from '@/app/queries/queryHooks/product/useProductUpdate';
import { useProductGetImages } from '@/app/queries/queryHooks/product/useProductGetImages';
import { useQueryClient } from '@tanstack/react-query';
import { htmlToBlocks } from '@sanity/block-tools';

const Products = () => {
  const queryClient = useQueryClient();
  const [product, setProduct] = useState<Product>({
    category: '',
    brand: '',
    name: '',
    price: '',
    quantity: 0,
    content: []
  });
  const productValues = [
    product.category,
    product.brand,
    product.name,
    product.price,
    product.quantity,
  ];
  const productTitles = ['category', 'brand', 'name', 'price', 'quantity'];

  const { mutate } = useProductCreate();
  const { mutate: mutateUpdate } = useProductUpdate();
  const { data: images } = useProductGetImages(product._id);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    let imgArr = [];
    if (images) imgArr.push([...images]);
    imgArr.push(e.currentTarget.files?.[0]);
    setProduct({ ...product, images: imgArr });
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
    // mutateUpdate(product, {
    //   onSuccess: () => {
    //     queryClient.invalidateQueries({ queryKey: ['products'] });
    //   },
    // });
  };

  return (
    <div className={styles['product-section']}>
      <div className={styles['product-details']}>
        <div className={styles['product-images']}>
          <div className={styles['images-section']}>
            {product && !product.images && (
              <div className={styles.centered}>No Images</div>
            )}
            {/* {images && images.map((image: string) => (
              <span>{ image }</span>
            ))} */}
          </div>
          <Input
            type='file'
            id='profile-img'
            className='image'
            labelText='Add Image'
            hasLabel={true}
            name='profileImg'
            changeFunc={handleImageUpload}
          />
        </div>
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
        <Editor
          onChange={(newContent: string) => handleContentChange(newContent)}
        />
      </div>
      <div className={styles['button-section']}>
        <Button value={'Save'} onClick={handleSave} />
      </div>
    </div>
  );
};

export default Products;
