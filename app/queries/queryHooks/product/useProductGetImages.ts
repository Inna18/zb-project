import { useQuery } from '@tanstack/react-query';
import { PRODUCT_KEYS } from '@/app/queries/queryKeys';
import { getProductImages } from '@/app/service/useProductApi';

export const useProductGetImages = (id: string | undefined) => {
  return useQuery({
    queryKey: PRODUCT_KEYS.get(id),
    queryFn: async () => await getProductImages(id),
  });
};
