import styles from './molecules.module.css';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { useProductStore } from '@/app/stores/useProductStore';

const DescriptionImages = () => {
  const product = useProductStore((state) => state.product);
  const [mainImage, setMainImage] = useState<string>('');

  useEffect(() => {
    if (product.productImages) {
      if (product.productImages.length <= 0) return;
      else setMainImage(product.productImages[0]);
    }
  }, [product]);

  const handleShowImage = (image: string) => {
    setMainImage(image);
  };

  return (
    <div className={styles['description-images']}>
      {product.productImages && product.productImages.length <= 0 && (
        <div className={styles.centered}>No Images</div>
      )}
      <div className={styles['images-section']}>
        {product.productImages &&
          product.productImages.length > 0 &&
          mainImage && (
            <Image
              key={mainImage}
              src={mainImage}
              alt={'product-img'}
              width={250}
              height={250}
            />
          )}
        {product.productImages &&
          product.productImages.map((image: string) => (
            <span key={image}>
              <a onClick={() => handleShowImage(image)}>
                <Image
                  key={image}
                  src={image}
                  alt={'product-img'}
                  width={100}
                  height={100}
                />
              </a>
            </span>
          ))}
      </div>
    </div>
  );
};

export default DescriptionImages;
