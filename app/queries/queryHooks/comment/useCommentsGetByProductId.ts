import { useQuery } from '@tanstack/react-query';
import { COMMENT_KEYS } from '@/app/queries/queryKeys';
import { getCommentsByProductId } from '@/app/service/useCommentApi';

export const useCommentsGetByProductId = (productId: string) => {
  return useQuery({
    queryKey: COMMENT_KEYS.list(productId),
    queryFn: async () => await getCommentsByProductId(productId),
  });
};
