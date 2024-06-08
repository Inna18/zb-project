import { useMutation, useQueryClient } from '@tanstack/react-query';
import Category, { createCategory } from '@/app/service/useCategoryApi';
import { CATEGORY_KEYS } from '../../queryKeys';

export const useCategoryCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newCategory: Category) =>
      await createCategory(newCategory),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATEGORY_KEYS.list() });
    },
  });
};
