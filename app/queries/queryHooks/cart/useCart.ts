import { useMutation, useQuery } from '@tanstack/react-query';
import { CART_KEYS } from '@/app/queries/queryKeys';
import {
  createCart,
  removeFromCart,
  emptyCart,
  getCartByUserId,
  setCartTotalCost,
  addToCart,
} from '@/app/service/useCartApi';

export const useCart = () => {
  const useCartCreate = () => {
    return useMutation({
      mutationFn: async (cartObj: {
        userId: string;
        productCountSet: { productId: string; count: number };
      }) => await createCart(cartObj.userId, cartObj.productCountSet),
    });
  };

  const useCartDelete = () => {
    return useMutation({
      mutationFn: async (obj: { userId: string; productId: string }) =>
        await removeFromCart(obj.userId, obj.productId),
    });
  };

  const useCartEmpty = () => {
    return useMutation({
      mutationFn: async (userId: string) => await emptyCart(userId),
    });
  };

  const useCartGet = (userId: string) =>
    useQuery({
      queryKey: CART_KEYS.get(userId),
      queryFn: async () => await getCartByUserId(userId),
    });

  const useCartTotalCostSet = () => {
    return useMutation({
      mutationFn: async (obj: { userId: string; productTotalCost: number }) =>
        await setCartTotalCost(obj.userId, obj.productTotalCost),
    });
  };

  const useCartUpdate = () => {
    return useMutation({
      mutationFn: async (obj: {
        userId: string;
        prodCountSet: { productId: string; count: number };
      }) => await addToCart(obj.userId, obj.prodCountSet),
    });
  };

  return {
    useCartCreate,
    useCartDelete,
    useCartEmpty,
    useCartGet,
    useCartTotalCostSet,
    useCartUpdate,
  };
};
