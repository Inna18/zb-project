import { useQuery } from '@tanstack/react-query';
import { PRODUCT_KEYS } from '@/app/queries/queryKeys';
import { getShopProductList } from '@/app/service/useProductApi';

export const useShopProductList = (orderBy: string, filter?: string | null) => {
  return useQuery({
    queryKey: PRODUCT_KEYS.list(),
    queryFn: async () => await getShopProductList(orderBy, filter),
  });
};
