import User from '@/app/service/useUserApi';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { createUser } from '@/app/service/useUserApi';

export const useUserCreate = (user: User) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => await createUser(user),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: () => {
      console.log('User create error');
    },
  });
};
