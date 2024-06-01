import { useMutation } from '@tanstack/react-query';
import { deletePost } from '@/app/service/usePostApi';

export const usePostDelete = () => {
  return useMutation({
    mutationFn: async (id: string) => await deletePost(id),
  });
};
