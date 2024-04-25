import { useQuery } from '@tanstack/react-query';
import { USER_KEYS } from '@/app/queries/queryKeys';
import { getUserByEmail } from '@/app/service/useUserApi';

export const useUserByEmail = (email: string | null | undefined) => {
  return useQuery({
    queryKey: USER_KEYS.getByEmail(email),
    queryFn: async () => await getUserByEmail(email),
  });
};
