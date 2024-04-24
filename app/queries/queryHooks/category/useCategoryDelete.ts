import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCategory } from '../../../service/useCategoryApi';

export const useCategoryDelete = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => await deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};
