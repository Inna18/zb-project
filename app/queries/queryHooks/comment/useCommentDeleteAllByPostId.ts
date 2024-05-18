import { useMutation } from '@tanstack/react-query';
import { deleteAllCommentsByPostId } from '@/app/service/useCommentApi';

export const useCommentDeleteAllByPostId = () => {
  return useMutation({
    mutationFn: async (postId: string) => await deleteAllCommentsByPostId(postId),
  });
};