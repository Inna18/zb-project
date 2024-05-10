import styles from './organisms.module.css';

import { Schema } from '@sanity/schema';
import React, { useEffect, useState } from 'react';
import Editor from '../atoms/editor/Editor';
import Input from '../atoms/input/Input';
import Button from '../atoms/button/Button';
import productSchema from '@/sanity/schemas/product';
import Modal from '../atoms/modal/Modal';
import Spinner from '../atoms/spinner/Spinner';
import Image from 'next/image';
import Select from '../atoms/select/Select';
import deleteImgIcon from '@/public/icons/circle-xmark-solid.svg';

import { toHTML } from '@portabletext/to-html';
import { useProductUpdate } from '@/app/queries/queryHooks/product/useProductUpdate';
import { useProductUpdateImages } from '@/app/queries/queryHooks/product/useProductUpdateImages';
import { useProductGetById } from '@/app/queries/queryHooks/product/useProductGetById';
import { useProductDeleteImg } from '@/app/queries/queryHooks/product/useProductDeleteImg';
import { useProductDeleteImgs } from '@/app/queries/queryHooks/product/useProductDeleteImgs';
import { useQueryClient } from '@tanstack/react-query';
import { htmlToBlocks } from '@sanity/block-tools';
import { useModal } from '@/app/hooks/useModal';
import { modalMsgConstants } from '@/app/constants/modalMsg';
import { commonConstants } from '@/app/constants/common';
import { useCategoryList } from '@/app/queries/queryHooks/category/useCategoryList';
import { useProductDeleteById } from '@/app/queries/queryHooks/product/useProductDeleteById';
import { useProductStore } from '@/app/stores/useProductStore';

interface ProductsProps {
  renderSubMenu: (subMenu: string, id: string) => void;
  productId: string | undefined;
  updateOrCreate: string
}
const {
  PRODUCT_IMAGE_LIMIT_ERROR,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_CANCEL,
} = modalMsgConstants;
const { FIELD_EMPTY } = commonConstants;
const PRODUCT_TITLES = [
  { id: 1, value: 'brand' },
  { id: 2, value: 'name' },
  { id: 3, value: 'price' },
  { id: 4, value: 'quantity' },
];

const Products = (productProps: ProductsProps) => {
  const product = useProductStore((state) => state.product);
  const updateProduct = useProductStore((state) => state.updateProduct);

  const queryClient = useQueryClient();
  const { renderSubMenu, productId, updateOrCreate } = productProps;
  const { mutate: mutateUpdate } = useProductUpdate();
  const {
    mutate: mutateUpdateImg,
    data: updatedImages,
    isPending: pendingUpdateImg,
  } = useProductUpdateImages();
  const { mutate: mutateDelete, isPending: pendingDelete } =
    useProductDeleteById();
  const { mutate: mutateDeleteImg, isPending: pendingDeleteImg } =
    useProductDeleteImg();
  const { mutate: mutateDeleteImgs, isPending: pendingDeleteImgs } =
    useProductDeleteImgs();
  const { isLoading: loadingCategories, data: categories } = useCategoryList();
  const { isLoading: loadingProduct, data: existingProduct } = useProductGetById(productId!);

  const productValues = [
    product?.brand,
    product?.name,
    product?.price,
    product?.quantity,
  ];
  const [imgArr, setImgArr] = useState<File[]>([]);
  const [imgCancelCount, setImgCancelCount] = useState<number>(0);
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountImages(countImages + 1); // image arr limit = 4, track images added
    setImgCancelCount(imgCancelCount + 1); // to delete added images if cancel product create/update
    if (countImages >= 4) {
      setModalDetails({
        type: 'alert',
        content: PRODUCT_IMAGE_LIMIT_ERROR,
        onClose: close,
      });
      open();
    } else {
      let file = e.currentTarget.files;
      setImgArr((prevState) => [...prevState, file?.[0]!]);

      mutateUpdateImg(
        { id: productId!, images: [file?.[0]!] },
        {
          onSuccess: async (data) => {
            // invalidate -> setQueryData, reason - data in Form wasn't saved to db yet, so if we refetch from cache, data in form will disappear
            queryClient.setQueryData(['product', productId], () => ({...product, productImages: data}));
          },
        }
      );
    }
  };

  const handleDeleteImg = (url: string) => {
    mutateDeleteImg(
      { id: productId!, imageUrl: url },
      {
        onSuccess: (data) => {
          // invalidate -> setQueryData, reason - data in Form wasn't saved to db yet, so if we refetch from cache, data in form will disappear
          queryClient.setQueryData(['product', productId], () => ({...product, productImages: data}));
        },
      }
    );
  };

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
    if (updateOrCreate === 'create') {
      // if create new -> cancel -> delete whole product
      mutateDelete(productId!, {
        onSuccess: () => renderSubMenu('list', ''),
      });
    } else {
      // if update product -> cancel -> delete attached images
      if (imgCancelCount > 0) {
        mutateDeleteImgs(
          { id: productId!, numToDelete: imgCancelCount },
          { onSuccess: () => updateProduct({ ...product, productImages: updatedImages }), }
        );
      } 
      renderSubMenu('list', '');
    }
  };

  return (
    <>
      {(loadingProduct ||
        pendingDelete ||
        pendingUpdateImg ||
        pendingDeleteImg ||
        pendingDeleteImgs) && <Spinner />}
      {!loadingProduct && (
        <>
          <div className={styles['product-details']}>
            <div className={styles['product-images']}>
              {product.productImages && product.productImages.length <= 0 && (
                <div className={styles.centered}>No Images</div>
              )}
              <div className={styles['images-section']}>
                {product.productImages &&
                  product.productImages.map((image: string, idx: number) => (
                    <span key={image}>
                      <Image
                        key={image}
                        src={image}
                        alt={'product-img'}
                        width={idx === 0 ? 210 : 70}
                        height={idx === 0 ? 210 : 70}
                      />
                      <a onClick={() => handleDeleteImg(image)}>
                        <Image
                          className={styles['icon-xs']}
                          src={deleteImgIcon}
                          alt={'update-icon'}
                        />
                      </a>
                    </span>
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
