import User from '@/app/service/useUserApi';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { updateUser } from '@/app/service/useUserApi';

export const useUserUpdate = (id: string | undefined, user: User) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => await updateUser(id, user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};
