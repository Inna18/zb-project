import { useMutation } from '@tanstack/react-query';
import Comment, { createComment } from '@/app/service/useCommentApi';

export const useCommentCreate = () => {
  return useMutation({
    mutationFn: async (newComment: Comment) => await createComment(newComment),
  });
};
