import { client } from '@/sanity/lib/client';

export default interface Product {
    _id?: string;
    category?: string;
    brand?: string;
    name?: string;
    price?: string;
    quantity?: number;
    rating?: number;
    content?: string; // what is rich text type?
    images?: string[];
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
}`

async function createProduct(product: Product) {
    let productImages;
    if (product.images) {
        product.images.map(image => {
            client.assets.upload('image', image);
        });
    }
    const sanityProduct = {
        _type: 'product',
        category: product.category,
        brand: product.brand,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        rating: product.rating,
        content: product.content,
        images: productImages ? productImages.map(productImage => {
            return {
                _type: 'image',
                asset: {
                    _type: 'reference',
                    _ref: productImage?._id,
                },
            }
        }) : null
    }
    const productCreated = await client.create(sanityProduct);    
    console.log('Product created ', productCreated.name);
}

export { createProduct }
