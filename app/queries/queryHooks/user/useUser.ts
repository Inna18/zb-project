import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import User, { USER_KEYS } from '@/app/queries/queryKeys';
import {
  getUserByEmail,
  createUser,
  updateUser,
} from '@/app/service/useUserApi';

export const useUser = () => {
  const queryClient = useQueryClient();

  const useUserByEmail = (email: string | null | undefined) => {
    return useQuery({
      queryKey: USER_KEYS.getByEmail(email),
      queryFn: async () => await getUserByEmail(email),
    });
  };

  const useUserCreate = () => {
    return useMutation({
      mutationFn: async (user: User) => await createUser(user),
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: USER_KEYS.getByEmail(data.email),
        });
      },
    });
  };

  const useUserUpdate = () => {
    return useMutation({
      mutationFn: async (user: User) => await updateUser(user._id, user),
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: USER_KEYS.getByEmail(data.email),
        });
      },
    });
  };

  return { useUserByEmail, useUserCreate, useUserUpdate };
};
