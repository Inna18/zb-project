import { useMutation } from '@tanstack/react-query';
import { deleteProductById } from '@/app/service/useProductApi';

export const useProductDeleteById = () => {
  return useMutation({
    mutationFn: async (id: string) => await deleteProductById(id),
  });
};
