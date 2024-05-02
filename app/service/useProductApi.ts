import { client } from '@/sanity/lib/client';
import { SanityImageAssetDocument } from 'next-sanity';
import { ImageResponse } from 'next/server';

export default interface Product {
  _id?: string;
  category?: string;
  brand?: string;
  name?: string;
  price?: string;
  quantity?: number;
  rating?: number;
  content?: any; // what is rich text type?
  productImages?: any;
}

const BASE_QUERY = `*[_type == 'product']{
    category,
    brand,
    name,
    price,
    quantity,
    rating,
    content,
    "productImages": productImages[].asset->url,
}`;

async function getProductById(id: string) {
  const query = `*[_type == 'product' && _id == '${id}'][0]`;
  const productById = await client.fetch(query);
  return productById;
}

async function getProductList() {
  const query = `*[_type == 'product']{
    _id,
    category,
    brand,
    name,
    "productImages": productImages[].asset->url
  }`;
  const productList = await client.fetch(query);
  console.log('Product list: ', productList);
  return productList;
}

async function createProduct(product: Product) {
  let productImages: SanityImageAssetDocument[] = [];
  const promises = product.productImages.map(async (productImage: File) => {
    return await client.assets.upload('image', productImage);
  });
  productImages = await Promise.all(promises);

  const sanityProduct = {
    id: product._id,
    _type: 'product',
    category: product.category,
    brand: product.brand,
    name: product.name,
    price: product.price,
    quantity: product.quantity,
    rating: product.rating,
    content: product.content,
    productImages: productImages
      ? productImages.map((productImage) => {
          return {
            _key: productImage?._id,
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: productImage?._id,
            },
          };
        })
      : null,
  };
  const productCreated = await client.create(sanityProduct);
  console.log('Product created ', productCreated.name);
  return productCreated;
}

async function updateProduct(id: string, updateProduct: Product) {
  // TODO
}

async function getProductImages(id: string | undefined) {
  const query = `*[_type == 'product' && _id == '${id}'][0]{
        "productImages": productImages.asset->url
      }`;
  const productImages = await client.fetch(query);
  console.log('Product images ', productImages);
  return productImages;
}

async function deleteProducts() {
  const deleteResult = await client.delete({
    query: `*[_type == 'product'][0...999]`,
  });
  console.log(deleteResult);
}

async function deleteProductById(id: string) {
  const inDB = await getProductById(id);
  if (inDB) {
    const productDeleted = await client.delete(id);
    console.log(productDeleted);
  } else {
    console.log('No such Product');
    throw new Error('No such Product');
  }
}

export {
  getProductList,
  createProduct,
  updateProduct,
  getProductImages,
  deleteProducts,
  deleteProductById,
};
