import { useMutation, useQueryClient } from '@tanstack/react-query';
import Product, { deleteProductById } from '@/app/service/useProductApi';
import { PRODUCT_KEYS } from '../../queryKeys';

export const useProductDeleteById = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => await deleteProductById(id),
    onSuccess: (data) => {
      const prevProducts = queryClient.getQueryData(PRODUCT_KEYS.list());
      queryClient.setQueryData(PRODUCT_KEYS.list(), (old: Product[]) =>
        old.filter((p) => p._id !== data)
      );
      return { prevProducts };
    },
  });
};
