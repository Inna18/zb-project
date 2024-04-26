import { useMutation } from '@tanstack/react-query';
import Category, { createCategory } from '@/app/service/useCategoryApi';

export const useCategoryCreate = () => {
  return useMutation({
    mutationFn: async (newCategory: Category) =>
      await createCategory(newCategory),
  });
};
