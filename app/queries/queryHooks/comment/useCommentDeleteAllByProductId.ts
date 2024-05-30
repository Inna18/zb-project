import { useMutation } from '@tanstack/react-query';
import { deleteAllCommentsByProductId } from '@/app/service/useCommentApi';

export const useCommentDeleteAllByProductId = () => {
  return useMutation({
    mutationFn: async (productId: string) =>
      await deleteAllCommentsByProductId(productId),
  });
};
