import { useMutation } from '@tanstack/react-query';
import ShippingPolicy, {
  updateShippingPolicy,
} from '@/app/service/useShippingPolicyApi';

export const useShippingPolicyUpdate = () => {
  return useMutation({
    mutationFn: async (updatedShippingPolicy: ShippingPolicy) =>
      await updateShippingPolicy(
        updatedShippingPolicy._id!,
        updatedShippingPolicy
      ),
  });
};
