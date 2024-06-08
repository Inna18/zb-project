import { useMutation, useQueryClient } from '@tanstack/react-query';
import Comment, { deleteCommentById } from '@/app/service/useCommentApi';
import { useModal } from '@/app/hooks/useModal';
import { COMMENT_KEYS } from '../../queryKeys';

export const useCommentDeleteById = (productId: string) => {
  const queryClient = useQueryClient();
  const { open, isOpen } = useModal();

  return useMutation({
    mutationFn: async (id: string) => await deleteCommentById(id),
    onSuccess: (data) => {
      queryClient.setQueryData(COMMENT_KEYS.list(productId), (old: Comment[]) =>
        old.filter((c) => c._id !== data)
      );
    },
  });
};
