import styles from './organisms.module.css';

import { Schema } from '@sanity/schema';
import React, { useEffect, useState } from 'react';
import Editor from '../atoms/editor/Editor';
import Input from '../atoms/input/Input';
import Button from '../atoms/button/Button';
import productSchema from '@/sanity/schemas/product';
import Product from '@/app/service/useProductApi';
import Modal from '../atoms/modal/Modal';
import Spinner from '../atoms/spinner/Spinner';
import Image from 'next/image';
import deleteImgIcon from '@/public/icons/circle-xmark-solid.svg';

import {toHTML} from '@portabletext/to-html'
import { useProductCreate } from '@/app/queries/queryHooks/product/useProductCreate';
import { useProductUpdate } from '@/app/queries/queryHooks/product/useProductUpdate';
import { useProductUpdateImages } from '@/app/queries/queryHooks/product/useProductUpdateImages';
import { useProductGetById } from '@/app/queries/queryHooks/product/useProductGetById';
import { useProductDeleteImg } from '@/app/queries/queryHooks/product/useProductDeleteImg';
import { useQueryClient } from '@tanstack/react-query';
import { htmlToBlocks } from '@sanity/block-tools';
import { useModal } from '@/app/hooks/useModal';
import { modalMsgConstants } from '@/app/constants/modalMsg';
import { commonConstants } from '@/app/constants/common';
import Select from '../atoms/select/Select';
import { useCategoryList } from '@/app/queries/queryHooks/category/useCategoryList';

interface ProductsProps {
  renderSubMenu: (subMenu: string, id: string) => void;
  productId: string | undefined;
}

const Products = (productProps: ProductsProps) => {
  const { renderSubMenu, productId } = productProps;
  const { mutate, data: createdProduct } = useProductCreate();
  const { mutate: mutateUpdate } = useProductUpdate();
  const { mutate: mutateUpdateImg, data: updatedImages } =
    useProductUpdateImages();
  const { mutate: mutateDeleteImg } = useProductDeleteImg();
  const { isLoading: loadingCategories, data: categories } = useCategoryList();
  const { isLoading, data: existingProduct } = useProductGetById(productId!);
  const queryClient = useQueryClient();
  const [product, setProduct] = useState<Product>({
    category: '',
    brand: '',
    name: '',
    price: '',
    quantity: '',
    content: [],
    productImages: [],
  });
  const productValues = [
    product.brand,
    product.name,
    product.price,
    product.quantity,
  ];
  const productTitles = ['brand', 'name', 'price', 'quantity'];
  const [imgArr, setImgArr] = useState<File[]>([]);
  const [modalType, setModalType] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [countImages, setCountImages] = useState<number>(0);
  const [categoryList, setCategoryList] = useState<string[]|null>(null);
  const { open, close, isOpen } = useModal();
  const {
    PRODUCT_IMAGE_LIMIT_ERROR,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_CANCEL,
  } = modalMsgConstants();
  const { FIELD_EMPTY } = commonConstants();

  useEffect(() => {
    // if product is created for the 1st time
    if (!isLoading) {
      if (!existingProduct && !createdProduct) mutate(product);
    }
  }, [isLoading]);

  useEffect(() => {
    if (!loadingCategories) {
      setCategoryList(categories.map((category: {_id: '', name: ''}) => category.name));
    }
  }, [loadingCategories])

  useEffect(() => {
    // if product is updated
    if (existingProduct) {
      setProduct(existingProduct);
      setCountImages(existingProduct.productImages.length);
    }
  }, [existingProduct]);

  useEffect(() => {
    // when imgArr changing when create/update product
    let id;
    if (productId) id = productId;
    else id = createdProduct?._id!;

    mutateUpdateImg(
      { id: id, images: [imgArr[imgArr.length - 1]] },
      {
        onSuccess: () => {
          setProduct({ ...product, productImages: updatedImages });
          setImgArr([]);
        },
      }
    );
  }, [imgArr]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountImages(countImages + 1);
    if (countImages >= 4) {
      setModalType('error');
      open();
    } else {
      let file = e.currentTarget.files;
      setImgArr((prevState) => [...prevState, file?.[0]!]);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'name' && value === '') setError(true);
    else setError(false);
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
    if (product.name === '') setError(true);
    else if (productId) {
      mutateUpdate(
        { id: productId, product: product },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            setModalType('success');
            open();
          },
        }
      );
    } else {
      mutateUpdate(
        { id: createdProduct?._id!, product: product },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            setModalType('success');
            open();
          },
        }
      );
    }
  };

  const handleCancel = () => {
    setModalType('cancel');
    open();
  };

  const routeBack = () => {
    close();
    renderSubMenu('list', '');
  };

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
        <>
          <div className={styles['product-details']}>
            <div className={styles['product-images']}>
              {product.productImages && product.productImages.length <= 0 && (
                <div className={styles.centered}>No Images</div>
              )}
              <div className={styles['images-section']}>
                {product.productImages &&
                  product.productImages.map((image: string, idx: number) => (
                    <span>
                      <Image
                        key={image}
                        src={image}
                        alt={'product-img'}
                        width={idx === 0 ? 210 : 70}
                        height={idx === 0 ? 210 : 70}
                      />
                      <a onClick={() => mutateDeleteImg({id: product._id!, imageUrl: image})}>
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
              {productTitles.map((title, idx) => (
                <div key={title}>
                    <>
                      <Input
                        type={title}
                        changeFunc={handleInputChange}
                        hasLabel={false}
                        value={productValues[idx]}
                        className='input'
                        name={title}
                      />
                      {error && title === 'name' && (
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
      )}
    </>
  );
};

export default Products;
