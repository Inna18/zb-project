import styles from './organisms.module.css';

import React, { useEffect, useState } from 'react';
import Editor from '../atoms/editor/Editor';
import Button from '../atoms/button/Button';
import productSchema from '@/sanity/schemas/product';
import Modal from '../atoms/modal/Modal';
import Spinner from '../atoms/spinner/Spinner';
import ProductImages from '../molecules/ProductImages';
import ProductForm from '../molecules/ProductForm';

import { Schema } from '@sanity/schema';
import { toHTML } from '@portabletext/to-html';
import { useProduct } from '@/app/queries/queryHooks/product/useProduct';
import { htmlToBlocks } from '@sanity/block-tools';
import { useModal } from '@/app/hooks/useModal';
import { modalMsgConstants } from '@/app/constants/modalMsg';
import { useProductStore } from '@/app/stores/useProductStore';
import { useProductIdStore } from '@/app/stores/useProductIdStore';
import { useImgCancelCountStore } from '@/app/stores/useImgCancelCountStore';
import { useImgLimitCountStore } from '@/app/stores/useImgLimitCountStore';
import { useModalStore } from '@/app/stores/useModalStore';

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
  const { product, setProduct } = useProductStore((state) => state);
  const productId = useProductIdStore((state) => state.productId);
  const imgCancelCount = useImgCancelCountStore(
    (state) => state.imgCancleCount
  );
  const setImgLimitCount = useImgLimitCountStore(
    (state) => state.setImgLimitCount
  );
  const { modal, setModal } = useModalStore((state) => state);

  const { renderSubMenu, formType } = productProps;
  const {
    mutate: mutateProductUpdate,
    isPending: pendingProductUpdate,
    isSuccess: isProductUpdateSuccess,
  } = useProduct().useProductUpdate();
  const {
    mutate: mutateProductDelete,
    isPending: pendingProductDelete,
    isSuccess: isProductDeleteSuccess,
  } = useProduct().useProductDeleteById();
  const { mutate: mutateImgsDelete, isPending: pendingImgsDelete } =
    useProduct().useProductDeleteImgs();
  const { isLoading: isLoadingProduct, data: existingProduct } =
    useProduct().useProductGetById(productId);

  const isLoadingOrPending =
    isLoadingProduct ||
    pendingProductUpdate ||
    pendingProductDelete ||
    pendingImgsDelete;
  const [emptyName, setEmptyName] = useState<boolean>(false);
  const { open, close, isOpen } = useModal();

  useEffect(() => {
    if (isProductUpdateSuccess) {
      let content =
        formType === 'create' ? PRODUCT_CREATE_SUCCESS : PRODUCT_UPDATE_SUCCESS;

      setModal({
        type: 'alert',
        content: content,
        onClose: routeBack,
      });
      open();
    }
  }, [isProductUpdateSuccess]);

  useEffect(() => {
    if (isProductDeleteSuccess) renderSubMenu('list', '');
  }, [isProductDeleteSuccess]);

  useEffect(() => {
    // move data from db to product object
    if (existingProduct) {
      setProduct(existingProduct);
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
    setProduct({ ...product, content: blocks });
  };

  const handleSave = () => {
    if (product.name === '') setEmptyName(true);
    else mutateProductUpdate({ id: productId, product: product });
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
      mutateProductDelete(productId);
    } else {
      // if update product -> cancel -> delete attached images
      if (imgCancelCount > 0)
        mutateImgsDelete({ id: productId, numToDelete: imgCancelCount });
      renderSubMenu('list', '');
    }
  };

  return (
    <>
      {isLoadingOrPending && <Spinner />}
      {!isLoadingProduct && (
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
