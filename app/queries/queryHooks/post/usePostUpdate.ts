import { useMutation } from '@tanstack/react-query';
import Post, { updatePost } from '@/app/service/usePostApi';

export const usePostUpdate = () => {
  return useMutation({
    mutationFn: async (obj: { id: string; post: Post }) =>
      await updatePost(obj.id, obj.post),
  });
};
