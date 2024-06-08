import User from '@/app/service/useUserApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUser } from '@/app/service/useUserApi';
import { USER_KEYS } from '../../queryKeys';

export const useUserUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (user: User) => await updateUser(user._id, user),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: USER_KEYS.getByEmail(data.email),
      });
    },
  });
};
