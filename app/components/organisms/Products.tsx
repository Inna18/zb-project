import styles from './organisms.module.css';

import { Schema } from '@sanity/schema';
import React, { useEffect, useState } from 'react';
import Editor from '../atoms/editor/Editor';
import Input from '../atoms/input/Input';
import Button from '../atoms/button/Button';
import productSchema from '@/sanity/schemas/product';
import Modal from '../atoms/modal/Modal';
import Spinner from '../atoms/spinner/Spinner';
import Select from '../atoms/select/Select';
import ProductImages from '../molecules/ProductImages';

import { toHTML } from '@portabletext/to-html';
import { useProductUpdate } from '@/app/queries/queryHooks/product/useProductUpdate';
import { useProductGetById } from '@/app/queries/queryHooks/product/useProductGetById';
import { useProductDeleteImgs } from '@/app/queries/queryHooks/product/useProductDeleteImgs';
import { useQueryClient } from '@tanstack/react-query';
import { htmlToBlocks } from '@sanity/block-tools';
import { useModal } from '@/app/hooks/useModal';
import { modalMsgConstants } from '@/app/constants/modalMsg';
import { commonConstants } from '@/app/constants/common';
import { useCategoryList } from '@/app/queries/queryHooks/category/useCategoryList';
import { useProductDeleteById } from '@/app/queries/queryHooks/product/useProductDeleteById';
import { useProductStore } from '@/app/stores/useProductStore';
import { useProductIdStore } from '@/app/stores/useProductIdStore';
import { useImgCancelCount } from '@/app/stores/useImgCancelCount';
import { useProductUpdateImages } from '@/app/queries/queryHooks/product/useProductUpdateImages';

interface ProductsProps {
  renderSubMenu: (subMenu: string, id: string) => void;
  formType: string;
}
const { PRODUCT_CREATE_SUCCESS, PRODUCT_CREATE_CANCEL } = modalMsgConstants;
const { FIELD_EMPTY } = commonConstants;
const PRODUCT_TITLES = [
  { id: 1, value: 'brand' },
  { id: 2, value: 'name' },
  { id: 3, value: 'price' },
  { id: 4, value: 'quantity' },
];

const Products = (productProps: ProductsProps) => {
  const { product, updateProduct } = useProductStore((state) => state);
  const productId = useProductIdStore((state) => state.productId);
  const imgCancelCount = useImgCancelCount((state) => state.imgCancleCount);

  const queryClient = useQueryClient();
  const { renderSubMenu, formType } = productProps;
  const { mutate: mutateUpdate } = useProductUpdate();
  const { data: updatedImages } = useProductUpdateImages();
  const { mutate: mutateDelete, isPending: pendingDelete } =
    useProductDeleteById();
  const { mutate: mutateDeleteImgs, isPending: pendingDeleteImgs } =
    useProductDeleteImgs();
  const { isLoading: loadingCategories, data: categories } = useCategoryList();
  const { isLoading: loadingProduct, data: existingProduct } =
    useProductGetById(productId!);

  const productValues = [
    product?.brand,
    product?.name,
    product?.price,
    product?.quantity,
  ];
  const [modalDetails, setModalDetails] = useState<{
    type: string;
    content: string;
    onOk?: () => void;
    onClose?: () => void;
  }>({ type: '', content: '' });
  const [error, setError] = useState<boolean>(false);
  const [countImages, setCountImages] = useState<number>(0);
  const [categoryList, setCategoryList] = useState<
    { id: number; value: string }[] | null
  >(null);
  const { open, close, isOpen } = useModal();

  useEffect(() => {
    // load categories
    if (!loadingCategories) {
      setCategoryList(
        categories.map((category: { _id: ''; name: '' }) => {
          return { id: category._id, value: category.name };
        })
      );
    }
  }, [loadingCategories]);

  useEffect(() => {
    // move data from db to product object
    if (existingProduct) {
      updateProduct(existingProduct);
      setCountImages(existingProduct.productImages.length);
    }
  }, [existingProduct]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'name' && value === '') setError(true);
    else setError(false);
    updateProduct({ ...product, [name]: value });
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
    updateProduct({ ...product, content: blocks });
  };

  const handleSave = () => {
    if (product.name === '') setError(true);
    else if (productId) {
      mutateUpdate(
        { id: productId, product: product },
        {
          onSuccess: () => {
            queryClient.refetchQueries({ queryKey: ['products'] });
            setModalDetails({
              type: 'alert',
              content: PRODUCT_CREATE_SUCCESS,
              onClose: routeBack,
            });
            open();
          },
        }
      );
    } else {
      mutateUpdate(
        { id: productId!, product: product },
        {
          onSuccess: () => {
            queryClient.refetchQueries({ queryKey: ['products'] });
            setModalDetails({
              type: 'alert',
              content: PRODUCT_CREATE_SUCCESS,
              onClose: routeBack,
            });
            open();
          },
        }
      );
    }
  };

  const handleCancel = () => {
    setModalDetails({
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
            <div className={styles.titles}>
              <div>Category:</div>
              <div>Brand:</div>
              <div>
                Name: <span className={styles['required-mark']}>*</span>
              </div>
              <div>Price:</div>
              <div>Quantity:</div>
            </div>
            <div className={styles.updates}>
              {categoryList && (
                <Select
                  className={'category-select'}
                  type={'category'}
                  optionList={categoryList}
                  changeFunc={handleInputChange}
                  hasLabel={false}
                  value={product.category}
                />
              )}
              {PRODUCT_TITLES.map((title, idx) => (
                <div key={title.id}>
                  <>
                    <Input
                      type={title.value}
                      changeFunc={handleInputChange}
                      hasLabel={false}
                      value={productValues[idx]}
                      className='input'
                      name={title.value}
                    />
                    {error && title.value === 'name' && (
                      <span className={styles.error}>{FIELD_EMPTY}</span>
                    )}
                  </>
                </div>
              ))}
            </div>
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
            type={modalDetails.type}
            content={modalDetails.content}
            onOk={modalDetails.onOk}
            onClose={modalDetails.onClose}
          />
        </>
      )}
    </>
  );
};

export default Products;
