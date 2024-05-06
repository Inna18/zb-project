import { useMutation } from '@tanstack/react-query';
import { deleteCategory } from '@/app/service/useCategoryApi';

export const useCategoryDelete = () => {
  return useMutation({
    mutationFn: async (id: string) => await deleteCategory(id),
  });
};
