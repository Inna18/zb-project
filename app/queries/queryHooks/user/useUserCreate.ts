import User from '@/app/service/useUserApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUser } from '@/app/service/useUserApi';
import { USER_KEYS } from '../../queryKeys';

export const useUserCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (user: User) => await createUser(user),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: USER_KEYS.getByEmail(data.email),
      });
    },
  });
};
