import User from '@/app/service/useUserApi';
import { useMutation } from '@tanstack/react-query';
import { updateUserImg } from '@/app/service/useUserApi';

export const useUserImageUpdate = () => {
  return useMutation({
    mutationFn: async (user: User) => await updateUserImg(user._id, user),
  });
};
