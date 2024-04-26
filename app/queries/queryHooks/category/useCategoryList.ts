import { useQuery } from '@tanstack/react-query';
import { CATEGORY_KEYS } from '@/app/queries/queryKeys';
import { getCategories } from '@/app/service/useCategoryApi';

export const useCategoryList = () => {
  return useQuery({
    queryKey: CATEGORY_KEYS.list(),
    queryFn: async () => await getCategories(),
  });
};
