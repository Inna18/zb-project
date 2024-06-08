import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProductImage } from '@/app/service/useProductApi';
import { PRODUCT_KEYS } from '../../queryKeys';
import { useProductStore } from '@/app/stores/useProductStore';
import { useProductIdStore } from '@/app/stores/useProductIdStore';

export const useProductDeleteImg = () => {
  const queryClient = useQueryClient();
  const product = useProductStore((state) => state.product);
  const productId = useProductIdStore((state) => state.productId);

  return useMutation({
    mutationFn: async (product: { id: string; imageUrl: string }) =>
      await deleteProductImage(product.id, product.imageUrl),
    onSuccess: (data) => {
      queryClient.setQueryData(PRODUCT_KEYS.get(productId), () => ({
        ...product,
        productImages: data,
      }));
    },
  });
};
