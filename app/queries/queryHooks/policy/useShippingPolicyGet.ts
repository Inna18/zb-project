import { useQuery } from '@tanstack/react-query';
import { SHIPPING_POLICY_KEYS } from '@/app/queries/queryKeys';
import { getShippingPolicy } from '@/app/service/useShippingPolicyApi';

export const useShippingPolicyGet = () => {
  return useQuery({
    queryKey: SHIPPING_POLICY_KEYS.get(),
    queryFn: async () => await getShippingPolicy(),
    refetchOnWindowFocus: false,
  });
};
