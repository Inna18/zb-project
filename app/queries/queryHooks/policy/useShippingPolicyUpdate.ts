import { useMutation, useQueryClient } from '@tanstack/react-query';
import ShippingPolicy, {
  updateShippingPolicy,
} from '@/app/service/useShippingPolicyApi';
import { SHIPPING_POLICY_KEYS } from '../../queryKeys';

export const useShippingPolicyUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedShippingPolicy: ShippingPolicy) =>
      await updateShippingPolicy(
        updatedShippingPolicy._id!,
        updatedShippingPolicy
      ),
    onSuccess: (data) => {
      queryClient.setQueryData(SHIPPING_POLICY_KEYS.get(), () => ({ ...data }));
    },
  });
};
