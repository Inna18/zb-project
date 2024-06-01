import { useQuery } from '@tanstack/react-query';
import { POST_KEYS } from '@/app/queries/queryKeys';
import { getPostById } from '@/app/service/usePostApi';

export const usePostGet = (id: string) => {
  return useQuery({
    queryKey: POST_KEYS.get(id),
    queryFn: async () => await getPostById(id),
  });
};
