import { useMutation } from '@tanstack/react-query';
import { deleteProductImages } from '@/app/service/useProductApi';
import { useProductStore } from '@/app/stores/useProductStore';

export const useProductDeleteImgs = () => {
  const { product, setProduct } = useProductStore((state) => state);

  return useMutation({
    mutationFn: async (product: { id: string; numToDelete: number }) =>
      await deleteProductImages(product.id, product.numToDelete),
    onSuccess: (data) =>
      setProduct({ ...product, productImages: data.updatedImages }),
  });
};
