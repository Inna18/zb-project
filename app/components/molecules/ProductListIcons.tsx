import styles from './molecules.module.css';

import React from 'react';
import Image from 'next/image';
import Spinner from '../atoms/spinner/Spinner';
import updateIcon from '@/public/icons/pen-to-square-solid.svg';
import removeIcon from '@/public/icons/delete-left-solid.svg';
import uploadIcon from '@/public/icons/file-arrow-up-solid.svg';
import hideIcon from '@/public/icons/file-arrow-down-solid.svg';

import { useProductDeleteById } from '@/app/queries/queryHooks/product/useProductDeleteById';
import { useProductUpdateStatus } from '@/app/queries/queryHooks/product/useProductUpdateStatus';

interface ProductsListIconsProps {
  renderSubMenu: (subMenu: string, id: string) => void;
  productId: string;
}

const ProductListIcons = (productsListIconsProps: ProductsListIconsProps) => {
  const { renderSubMenu, productId } = productsListIconsProps;
  const { isPending: pendingDeleteProduct, mutate: mutateDeleteProduct } =
    useProductDeleteById();
  const { isPending: pendingUpdateStatus, mutate: mutateUpdateStatus } =
    useProductUpdateStatus();
  const isPending = pendingDeleteProduct || pendingUpdateStatus;

  const handleUpdate = (id: string) => renderSubMenu('details', id);
  const handleRemove = (id: string) => mutateDeleteProduct(id);
  const handleUpload = (id: string) =>
    mutateUpdateStatus({ id: id, posted: true });
  const handleHide = (id: string) =>
    mutateUpdateStatus({ id: id, posted: false });

  return (
    <>
      {isPending && <Spinner />}
      <div className={styles['icons-section']}>
        <a onClick={() => handleUpdate(productId)}>
          <Image
            className={styles['icon']}
            src={updateIcon}
            alt={'update-icon'}
          />
        </a>
        <a onClick={() => handleRemove(productId)}>
          <Image
            className={styles['icon']}
            src={removeIcon}
            alt={'remove-icon'}
          />
        </a>
        <a onClick={() => handleUpload(productId)}>
          <Image
            className={styles['icon']}
            src={uploadIcon}
            alt={'upload-icon'}
          />
        </a>
        <a onClick={() => handleHide(productId)}>
          <Image className={styles['icon']} src={hideIcon} alt={'hide-icon'} />
        </a>
      </div>
    </>
  );
};

export default ProductListIcons;
