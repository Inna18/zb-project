import { client } from '@/sanity/lib/client';

export default interface Cart {
  _id?: string;
  userId?: string;
  productCountSet?: { productId: string; count: number }[];
  productTotalCost?: number;
}

async function getCartByUserId(userId: string) {
  const query = `*[_type == 'cart' && userId == '${userId}'][0]{
        _id, 
        userId,
        productCountSet,
        productTotalCost
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
    productTotalCost: 0
  };

  const createdCart = await client.create(sanityCart);
  console.log('Cart created: ', createdCart);
  return createdCart;
}

async function addToCart(
  userId: string,
  prodCountSet: { productId: string; count: number }
) {
  const existingCart = await getCartByUserId(userId);
  if (!existingCart) await createCart(userId, prodCountSet);
  else {
    let existingSet = existingCart.productCountSet;
    if (existingSet === null) {
      // if cart exists but empty
      existingSet = [prodCountSet];
    } else {
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

async function removeFromCart(userId: string, productId: string) {
  const existingCart = await getCartByUserId(userId);
  if (existingCart) {
    const newProdCountSet = existingCart.productCountSet.filter(
      (productCount: { productId: string; count: number; _key: string }) =>
        productCount.productId !== productId
    );

    const updatedCart = await client
      .patch(existingCart._id)
      .set({
        productCountSet: newProdCountSet,
      })
      .commit();
    console.log('Updated cart: ', updatedCart);
    return updatedCart;
  }
}

async function setCartTotalCost(userId: string, cost: number) {
  console.log(cost)
  const existingCart = await getCartByUserId(userId);
  if (existingCart) {
    const updatedCart = await client
    .patch(existingCart._id)
    .set({
      productTotalCost: cost
    })
    .commit();
    console.log('Updated cart total product cost: ', updatedCart);
    return updatedCart;
  }
}

export { getCartByUserId, createCart, addToCart, removeFromCart, setCartTotalCost };
