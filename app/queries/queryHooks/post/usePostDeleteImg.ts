import { useMutation, useQueryClient } from '@tanstack/react-query';
import Post, { deletePostImage } from '@/app/service/usePostApi';
import { POST_KEYS } from '../../queryKeys';

export const usePostDeleteImg = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => await deletePostImage(id),
    onSuccess: (data) => {
      queryClient.setQueryData(POST_KEYS.get(data._id), (old: Post) => ({
        ...old,
        postImage: null,
      }));
    },
  });
};
