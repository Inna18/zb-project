import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePostImg } from '@/app/service/usePostApi';
import { POST_KEYS } from '../../queryKeys';

export const usePostUpdateImg = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (imageArr: { id: string; image: File }) =>
      await updatePostImg(imageArr.id, imageArr.image),
    onSuccess: (data) => {
      queryClient.setQueryData(POST_KEYS.get(data._id), () => ({
        ...data,
        postImage: data.postImage,
      }));
    },
  });
};
