import User from '../../../service/useUserApi';
import { USER_KEYS } from '../../queryKeys';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { updateUser } from '../../../service/useUserApi';

export const useUserUpdate = (id: string | undefined, user: User) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: USER_KEYS.update(user),
    mutationFn: async () => await updateUser(id, user),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};
