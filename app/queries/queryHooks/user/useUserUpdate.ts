import User from '@/app/service/useUserApi';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { updateUser } from '@/app/service/useUserApi';

export const useUserUpdate = () => {

  return useMutation({
    mutationFn: async (user: User) => await updateUser(user._id, user)
  });
};
