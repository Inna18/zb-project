import { useMutation } from '@tanstack/react-query';
import { deleteCommentById } from '@/app/service/useCommentApi';

export const useCommentDeleteById = () => {
  return useMutation({
    mutationFn: async (id: string) => await deleteCommentById(id),
  });
};
