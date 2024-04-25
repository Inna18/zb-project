import User from '@/app/service/useUserApi';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { createUser } from '@/app/service/useUserApi';

export const useUserCreate = () => {

  return useMutation({
    mutationFn: async (user: User) => await createUser(user)
  });
};
