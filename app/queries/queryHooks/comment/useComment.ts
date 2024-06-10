import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Comment, {
  createComment,
  deleteAllCommentsByProductId,
  deleteCommentById,
  getCommentsByProductId,
} from '@/app/service/useCommentApi';
import { COMMENT_KEYS } from '../../queryKeys';

export const useComment = () => {
  const queryClient = useQueryClient();

  const useCommentCreate = () => {
    return useMutation({
      mutationFn: async (newComment: Comment) =>
        await createComment(newComment),
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

  const useCommentDeleteAllByProductId = () => {
    return useMutation({
      mutationFn: async (productId: string) =>
        await deleteAllCommentsByProductId(productId),
    });
  };

  const useCommentDeleteById = (productId: string) => {
    return useMutation({
      mutationFn: async (id: string) => await deleteCommentById(id),
      onSuccess: (data) => {
        queryClient.setQueryData(
          COMMENT_KEYS.list(productId),
          (old: Comment[]) => old.filter((c) => c._id !== data)
        );
      },
    });
  };

  const useCommentsGetByProductId = (productId: string) => {
    return useQuery({
      queryKey: COMMENT_KEYS.list(productId),
      queryFn: async () => await getCommentsByProductId(productId),
    });
  };

  return {
    useCommentCreate,
    useCommentDeleteAllByProductId,
    useCommentDeleteById,
    useCommentsGetByProductId,
  };
};
