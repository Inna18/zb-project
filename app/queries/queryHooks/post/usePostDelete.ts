import { useMutation, useQueryClient } from '@tanstack/react-query';
import Post, { deletePost } from '@/app/service/usePostApi';
import { POST_KEYS } from '../../queryKeys';

export const usePostDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => await deletePost(id),
    onSuccess: (data) => {
      queryClient.setQueryData(POST_KEYS.list(), (old: Post[]) =>
        old.filter((p) => p._id !== data)
      );
    },
  });
};
