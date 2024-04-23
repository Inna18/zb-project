import { useQuery } from '@tanstack/react-query';
import { USER_KEYS } from '../../queryKeys';
import { getUserByEmail } from '../../../service/useUserApi';

export const useUserByEmail = (email: string | null | undefined) => {
  return useQuery({
    queryKey: USER_KEYS.byEmail(email),
    queryFn: async () => await getUserByEmail(email),
  });
};
