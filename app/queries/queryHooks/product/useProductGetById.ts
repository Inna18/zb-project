import { useQuery } from '@tanstack/react-query';
import { PRODUCT_KEYS } from '@/app/queries/queryKeys';
import { getProductById } from '@/app/service/useProductApi';

export const useProductGetById = (id: string) => {
  return useQuery({
    queryKey: PRODUCT_KEYS.get(id),
    queryFn: async () => await getProductById(id),
    refetchOnWindowFocus: false,
  });
};
