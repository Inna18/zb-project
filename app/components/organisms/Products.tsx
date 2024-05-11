import styles from './organisms.module.css';

import { Schema } from '@sanity/schema';
import React, { useEffect, useState } from 'react';
import Editor from '../atoms/editor/Editor';
import Button from '../atoms/button/Button';
import productSchema from '@/sanity/schemas/product';
import Modal from '../atoms/modal/Modal';
import Spinner from '../atoms/spinner/Spinner';
import ProductImages from '../molecules/ProductImages';
import ProductForm from '../molecules/ProductForm';

import { toHTML } from '@portabletext/to-html';
import { useProductUpdate } from '@/app/queries/queryHooks/product/useProductUpdate';
import { useProductGetById } from '@/app/queries/queryHooks/product/useProductGetById';
import { useProductDeleteImgs } from '@/app/queries/queryHooks/product/useProductDeleteImgs';
import { useQueryClient } from '@tanstack/react-query';
import { htmlToBlocks } from '@sanity/block-tools';
import { useModal } from '@/app/hooks/useModal';
import { modalMsgConstants } from '@/app/constants/modalMsg';
import { useProductDeleteById } from '@/app/queries/queryHooks/product/useProductDeleteById';
import { useProductStore } from '@/app/stores/useProductStore';
import { useProductIdStore } from '@/app/stores/useProductIdStore';
import { useImgCancelCountStore } from '@/app/stores/useImgCancelCountStore';
import { useImgLimitCountStore } from '@/app/stores/useImgLimitCountStore';
import { useModalStore } from '@/app/stores/useModalStore';
import { useProductUpdateImages } from '@/app/queries/queryHooks/product/useProductUpdateImages';

interface ProductsProps {
  renderSubMenu: (subMenu: string, id: string) => void;
  formType: string;
}
const {
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_CREATE_CANCEL,
} = modalMsgConstants;

const Products = (productProps: ProductsProps) => {
  const { product, updateProduct } = useProductStore((state) => state);
  const productId = useProductIdStore((state) => state.productId);
  const imgCancelCount = useImgCancelCountStore(
    (state) => state.imgCancleCount
  );
  const setImgLimitCount = useImgLimitCountStore(
    (state) => state.setImgLimitCount
  );
  const { modal, setModal } = useModalStore((state) => state);

  const queryClient = useQueryClient();
  const { renderSubMenu, formType } = productProps;
  const { mutate: mutateUpdate } = useProductUpdate();
  const { data: updatedImages } = useProductUpdateImages();
  const { mutate: mutateDelete, isPending: pendingDelete } =
    useProductDeleteById();
  const { mutate: mutateDeleteImgs, isPending: pendingDeleteImgs } =
    useProductDeleteImgs();
  const { isLoading: loadingProduct, data: existingProduct } =
    useProductGetById(productId!);

  const [emptyName, setEmptyName] = useState<boolean>(false);
  const { open, close, isOpen } = useModal();

  useEffect(() => {
    // move data from db to product object
    if (existingProduct) {
      updateProduct(existingProduct);
      setImgLimitCount(existingProduct.productImages.length);
    }
  }, [existingProduct]);

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
    updateProduct({ ...product, content: blocks });
  };

  const handleSave = () => {
    let content =
      formType === 'create' ? PRODUCT_CREATE_SUCCESS : PRODUCT_UPDATE_SUCCESS;
    if (product.name === '') setEmptyName(true);
    else {
      mutateUpdate(
        { id: productId, product: product },
        {
          onSuccess: () => {
            queryClient.refetchQueries({ queryKey: ['products'] });
            setModal({
              type: 'alert',
              content: content,
              onClose: routeBack,
            });
            open();
          },
        }
      );
    }
  };

  const handleCancel = () => {
    setModal({
      type: 'confirm',
      content: PRODUCT_CREATE_CANCEL,
      onOk: cancelModal,
      onClose: close,
    });
    open();
  };

  const routeBack = () => {
    close();
    renderSubMenu('list', '');
  };

  const cancelModal = () => {
    close();
    if (formType === 'create') {
      // if create new -> cancel -> delete whole product
      mutateDelete(productId!, {
        onSuccess: () => renderSubMenu('list', ''),
      });
    } else {
      // if update product -> cancel -> delete attached images
      if (imgCancelCount > 0) {
        mutateDeleteImgs(
          { id: productId!, numToDelete: imgCancelCount },
          {
            onSuccess: () =>
              updateProduct({ ...product, productImages: updatedImages }),
          }
        );
      }
      renderSubMenu('list', '');
    }
  };

  return (
    <>
      {(loadingProduct || pendingDelete || pendingDeleteImgs) && <Spinner />}
      {!loadingProduct && (
        <>
          <div className={styles['product-details']}>
            <ProductImages />
            <ProductForm
              emptyName={emptyName}
              checkName={(result: boolean) => setEmptyName(result)}
            />
          </div>
          <div className={styles.editor}>
            <Editor
              content={toHTML(product.content)}
              onChange={(newContent: string) => handleContentChange(newContent)}
            />
          </div>
          <div className={styles['button-section']}>
            <Button value={'Save'} onClick={handleSave} />
            <Button
              value={'Cancel'}
              className='button2'
              onClick={handleCancel}
            />
          </div>
          <Modal
            selector={'portal'}
            show={isOpen}
            type={modal.type}
            content={modal.content}
            onOk={modal.onOk}
            onClose={modal.onClose}
          />
        </>
      )}
    </>
  );
};

export default Products;
