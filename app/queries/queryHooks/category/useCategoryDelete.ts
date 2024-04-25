import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCategory } from '@/app/service/useCategoryApi';

export const useCategoryDelete = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => await deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};
