import { useMutation } from '@tanstack/react-query';
import { deletePostImage } from '@/app/service/usePostApi';

export const usePostDeleteImg = () => {
  return useMutation({
    mutationFn: async (id: string) => await deletePostImage(id),
  });
};
