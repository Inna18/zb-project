import { useQuery } from '@tanstack/react-query';
import { COMMENT_KEYS } from '@/app/queries/queryKeys';
import { getCommentsByPostId } from '@/app/service/useCommentApi';

export const useCommentsGetByPostId = (postId: string) => {
  return useQuery({
    queryKey: COMMENT_KEYS.list(postId),
    queryFn: async () => await getCommentsByPostId(postId),
  });
};
