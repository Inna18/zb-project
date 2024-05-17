import { useMutation } from '@tanstack/react-query';
import { createShippingPolicy } from '@/app/service/useShippingPolicyApi';

export const useShippingPolicyCreate = () => {
  return useMutation({
    mutationFn: async () => await createShippingPolicy(),
  });
};
