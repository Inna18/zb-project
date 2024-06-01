import { useQuery } from '@tanstack/react-query';
import { POST_KEYS } from '@/app/queries/queryKeys';
import { getPosts } from '@/app/service/usePostApi';

export const usePostList = () => {
  return useQuery({
    queryKey: POST_KEYS.list(),
    queryFn: async () => await getPosts(),
  });
};
