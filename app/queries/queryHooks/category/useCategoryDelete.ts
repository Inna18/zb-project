import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCategory } from '@/app/service/useCategoryApi';
import { CATEGORY_KEYS } from '../../queryKeys';

export const useCategoryDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => await deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATEGORY_KEYS.list() });
    },
  });
};
