import { useQuery } from '@tanstack/react-query';
import { PRODUCT_KEYS } from '@/app/queries/queryKeys';
import { getBestProductList } from '@/app/service/useProductApi';

export const useBestProductList = (count: number) => {
  return useQuery({
    queryKey: PRODUCT_KEYS.list(),
    queryFn: async () => await getBestProductList(count),
  });
};
