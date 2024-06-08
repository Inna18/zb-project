import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createShippingPolicy } from '@/app/service/useShippingPolicyApi';
import { useShippingPolicyStore } from '@/app/stores/useShippingPolicyStore';
import { SHIPPING_POLICY_KEYS } from '../../queryKeys';

export const useShippingPolicyCreate = () => {
  const queryClient = useQueryClient();
  const setShippingPolicy = useShippingPolicyStore(
    (state) => state.setShippingPolicy
  );

  return useMutation({
    mutationFn: async () => await createShippingPolicy(),
    onSuccess: (data) => {
      setShippingPolicy(data);
      queryClient.setQueryData(SHIPPING_POLICY_KEYS.get(), () => ({ ...data }));
    },
  });
};
