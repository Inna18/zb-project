import styles from './molecules.module.css';

import Product from '@/app/service/useProductApi';
import React from 'react';
import Image from 'next/image';
import starIcon from '@/public/icons/star-solid.svg';
import { useRouter } from 'next/navigation';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { push } = useRouter();

  const handleShopDetails = (productId: string) => {
    push(`/shop/details?productId=${productId}`);
  };

  return (
    <div>
      <div
        className={styles['product-card']}
        onClick={() => handleShopDetails(product._id!)}
      >
        <div className={styles['image-section']}>
          {product.productImages && ((product.productImages?.length <= 0) ? (
            <div className={styles.centered}>No Image</div>
          ) : (
            <Image
              src={product.productImages[0]}
              alt={'item-image'}
              width={200}
              height={200}
            />
          ))}
        </div>
        <div className={styles['decription-section']}>
          <div className={styles.name}>{product.name}</div>
          <div>{product.brand}</div>
          <div>
            <span className={styles.category}>#{product.category}</span>
          </div>
          <div>{product.price}won</div>
          <div className={styles.rating}>
            <Image src={starIcon} alt={'item-image'} width={18} height={18} />
            <span>{product.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
