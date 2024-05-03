import { client } from '@/sanity/lib/client';
import { SanityImageAssetDocument } from 'next-sanity';

export default interface Product {
  _id?: string;
  category?: string;
  brand?: string;
  name?: string;
  price?: string;
  quantity?: number;
  rating?: number;
  content?: any; // what is rich text type?
  images?: any;
}

const BASE_QUERY = `*[_type == 'product']{
    category,
    brand,
    name,
    price,
    quantity,
    rating,
    content,
    "images": images.asset->url,
}`;

async function getProductById(id: string) {
  const query = `*[_type == 'user' && _id == '${id}'][0]`;
  const productById = await client.fetch(query);
  return productById;
}

async function createProduct(product: Product) {
  let productImages: SanityImageAssetDocument[] = [];
  const promises = product.images.map(async (productImage: File) => {
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
        "profileImg": profileImg.asset->url
      }`;
  const productImages = await client.fetch(query);
  console.log('Product images ', productImages);
  return productImages;
}

export { createProduct, updateProduct, getProductImages };
