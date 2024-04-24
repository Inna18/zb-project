import User from '../../../service/useUserApi';
import { USER_KEYS } from '../../queryKeys';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { createUser } from '../../../service/useUserApi';

export const useUserCreate = (user: User) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => await createUser(user),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['users', createUser] });
    },
    onError: () => {
      console.log('User create error');
    },
  });
};
