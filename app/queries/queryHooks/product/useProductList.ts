import { useQuery } from '@tanstack/react-query';
import { PRODUCT_KEYS } from '@/app/queries/queryKeys';
import { getProductList } from '@/app/service/useProductApi';

export const useProductList = () => {
  return useQuery({
    queryKey: PRODUCT_KEYS.list(),
    queryFn: async () => await getProductList(),
  });
};
