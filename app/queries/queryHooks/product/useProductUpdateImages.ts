import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProductImages } from '@/app/service/useProductApi';
import { PRODUCT_KEYS } from '../../queryKeys';
import { useProductStore } from '@/app/stores/useProductStore';
import { useProductIdStore } from '@/app/stores/useProductIdStore';

export const useProductUpdateImages = () => {
  const queryClient = useQueryClient();
  const product = useProductStore((state) => state.product);
  const productId = useProductIdStore((state) => state.productId);

  return useMutation({
    mutationFn: async (imagesArr: { id: string; images: File[] }) =>
      await updateProductImages(imagesArr.id, imagesArr.images),
    onSuccess: async (data) => {
      queryClient.setQueryData(PRODUCT_KEYS.get(productId), () => ({
        ...product,
        productImages: data,
      }));
    },
  });
};
