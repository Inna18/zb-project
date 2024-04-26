import { useQuery } from '@tanstack/react-query';
import { CATEGORY_KEYS } from '@/app/queries/queryKeys';
import { getCategoryById } from '@/app/service/useCategoryApi';

export const useCategoryGet = (id: string) => {
  return useQuery({
    queryKey: CATEGORY_KEYS.get(id),
    queryFn: async () => await getCategoryById(id),
  });
};
