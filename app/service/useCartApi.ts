import { client } from '@/sanity/lib/client';

export default interface Cart {
  _id?: string;
  userId?: string;
  productCountSet?: { productId: string; count: number }[];
}

async function getCartByUserId(userId: string) {
  console.log(userId);
  const query = `*[_type == 'cart' && userId == '${userId}'][0]{
        _id, 
        userId, 
        productCountSet
    }`;
  const cartByUserId = await client.fetch(query);
  console.log('Cart by UserId: ', cartByUserId);
  return cartByUserId;
}

async function createCart(
  userId: string,
  productCountSet: { productId: string; count: number }
) {
  const sanityCart = {
    _type: 'cart',
    userId: userId,
    productCountSet: [productCountSet],
  };

  const createdCart = await client.create(sanityCart);
  console.log('Cart created: ', createdCart);
  return createdCart;
}

async function addToCart(
  userId: string,
  prodCountSet: { productId: string; count: number }
) {
  const inDB = await getCartByUserId(userId);
  if (!inDB) await createCart(userId, prodCountSet);
  else {
    const existingCart = await getCartByUserId(userId);
    let existingSet = existingCart.productCountSet;
    if (
      existingSet.filter(
        (set: { productId: string; count: number; _key: string }) =>
          set.productId === prodCountSet.productId
      ).length > 0
    ) {
      existingSet.map(
        (set: { productId: string; count: number; _key: string }) => {
          // if product with this Id already exists -> increase count
          if (set.productId === prodCountSet.productId)
            set.count += prodCountSet.count;
          return set;
        }
      );
    } else {
      existingSet = [...existingSet, prodCountSet]; // else push new set to existingSet
    }

    const updatedCart = await client
      .patch(existingCart._id)
      .set({
        productCountSet: existingSet,
      })
      .commit();
    console.log('Updated cart: ', updatedCart);
    return updatedCart;
  }
}

export { getCartByUserId, createCart, addToCart };
