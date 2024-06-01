import { useMutation } from '@tanstack/react-query';
import { updatePostImg } from '@/app/service/usePostApi';

export const usePostUpdateImg = () => {
  return useMutation({
    mutationFn: async (imageArr: { id: string; image: File }) =>
      await updatePostImg(imageArr.id, imageArr.image),
  });
};
