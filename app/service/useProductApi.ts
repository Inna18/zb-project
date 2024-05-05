import { client } from '@/sanity/lib/client';
import { SanityImageAssetDocument } from 'next-sanity';

export default interface Product {
  _id?: string;
  category?: string;
  brand?: string;
  name?: string;
  price?: string;
  quantity?: string;
  rating?: number;
  content?: any; // what is rich text type?
  productImages?: string[];
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
  const query = `*[_type == 'product' && _id == '${id}'][0]{
    _id,
    category,
    brand,
    name,
    price,
    quantity,
    rating,
    content,
    "productImages": productImages[].asset->url,
  }`;
  const productById = await client.fetch(query);
  console.log('Product by Id: ', productById);
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
  const promises = product.productImages!.map(async (productImage: string) => {
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
  console.log('Product created ', productCreated._id);
  return productCreated;
}

async function updateProduct(id: string, updateProduct: Product) {
  const updatedProduct = await client
    .patch(id)
    .set({
      category: updateProduct.category,
      brand: updateProduct.brand,
      name: updateProduct.name,
      price: updateProduct.price,
      quantity: updateProduct.quantity,
      content: updateProduct.content,
    })
    .commit();
  console.log(updatedProduct);
  return updatedProduct;
}

async function updateProductImages(id: string, images: File[]) {
  let productImages: SanityImageAssetDocument[] = [];
  const promises = images.map(async (productImage: File) => {
    return await client.assets.upload('image', productImage);
  });
  productImages = await Promise.all(promises);

  const updatedImages = await client
    .patch(id)
    .setIfMissing({ productImages: [] })
    .insert('after', 'productImages[-1]', [
      ...productImages.map((productImage) => {
        return {
          _key: productImage?._id,
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: productImage?._id,
          },
        };
      }),
    ])
    .commit();
  console.log(updatedImages);
  const imagesFromDb = await getProductImages(id);
  console.log(imagesFromDb.productImages);
  return imagesFromDb.productImages;
}

async function deleteProductImage(id: string, imageUrl: string) {
  const key = `image-${imageUrl.split('/').pop()?.replace('.', '-')}`;
  const imagesToRemove = [`productImages[_key==\"${key}\"]`];
  const updatedImages = await client.patch(id).unset(imagesToRemove).commit();
  console.log(updatedImages);
}

async function deleteProductImages(id: string, numToDelete: number) {
  const imagesUrl = await getProductImages(id);
  let imagesToRemove = [];
  for (let i = 1; i <= numToDelete; i++) {
    const key = `image-${imagesUrl.productImages[imagesUrl.productImages.length - i].split('/').pop()?.replace('.', '-')}`;
    imagesToRemove.push(`productImages[_key==\"${key}\"]`);
  }
  const updatedImages = await client.patch(id).unset(imagesToRemove).commit();
  console.log(updatedImages);
}

async function getProductImages(id: string | undefined) {
  const query = `*[_type == 'product' && _id == '${id}'][0]{
    "productImages": productImages[].asset->url,
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
  getProductById,
  getProductList,
  createProduct,
  updateProduct,
  updateProductImages,
  getProductImages,
  deleteProducts,
  deleteProductById,
  deleteProductImage,
  deleteProductImages,
};
