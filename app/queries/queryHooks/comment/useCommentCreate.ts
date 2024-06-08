import { useMutation, useQueryClient } from '@tanstack/react-query';
import Comment, { createComment } from '@/app/service/useCommentApi';
import { COMMENT_KEYS } from '../../queryKeys';

export const useCommentCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newComment: Comment) => await createComment(newComment),
    onSuccess: (data) => {
      queryClient.setQueryData(
        COMMENT_KEYS.list(data.productId!),
        (old: Comment[]) => [...old, data]
      );
      queryClient.refetchQueries({
        queryKey: COMMENT_KEYS.list(data.productId!),
      });
    },
  });
};
