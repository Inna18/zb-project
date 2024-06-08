import { useMutation, useQueryClient } from '@tanstack/react-query';
import Product, { updateProductQuantity } from '@/app/service/useProductApi';
import { PRODUCT_KEYS } from '../../queryKeys';
import { useProductStore } from '@/app/stores/useProductStore';

export const useProductUpdateQuantity = () => {
  const queryClient = useQueryClient();
  const { product, setProduct } = useProductStore((state) => state);

  return useMutation({
    mutationFn: async (obj: { id: string; quantity: number }) =>
      await updateProductQuantity(obj.id, obj.quantity),
    onSuccess: (data) => {
      setProduct({ ...product, quantity: data.quantity });
      queryClient.setQueryData(
        PRODUCT_KEYS.get(product._id),
        (old: Product) => ({
          ...old,
          quantity: data.quantity,
        })
      );
    },
  });
};
