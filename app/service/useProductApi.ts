import { client } from '@/sanity/lib/client';

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
  let productImages;
  if (product.images) {
    product.images.map((image) => {
      client.assets.upload('image', image);
    });
  }
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
}

async function updateProduct(id: string, updateProduct: Product) {
  const inDB = await getProductById(id);
  if (inDB) {
    let productImages;
    if (updateProduct.images) {
      updateProduct.images.map((image) => {
        client.assets.upload('image', image);
      });
    }
    const udpatedProduct = await client
      .patch(id)
      .set({
        _type: 'product',
        category: updateProduct.category,
        brand: updateProduct.brand,
        name: updateProduct.name,
        price: updateProduct.price,
        quantity: updateProduct.quantity,
        rating: updateProduct.rating,
        content: updateProduct.content,
        productImages: productImages
          ? productImages.map((productImage) => {
              return {
                _type: 'image',
                asset: {
                  _type: 'reference',
                  _ref: productImage?._id,
                },
              };
            })
          : null,
      })
      .commit();
    console.log('updated ', udpatedProduct);
  } else {
    const createdProduct = await createProduct(updateProduct);
    console.log('created ', createProduct);
    return createProduct;
  }
}

async function getProductImages(id: string | undefined) {
  const query = `*[_type == 'product' && _id == '${id}'][0]{
        "profileImg": profileImg.asset->url
      }`;
  const productImages = await client.fetch(query);
  return productImages;
}

export { createProduct, updateProduct, getProductImages };
