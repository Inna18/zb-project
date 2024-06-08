import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import ShippingPolicy, {
  createShippingPolicy,
  getShippingPolicy,
  updateShippingPolicy,
} from '@/app/service/useShippingPolicyApi';
import { useShippingPolicyStore } from '@/app/stores/useShippingPolicyStore';
import { SHIPPING_POLICY_KEYS } from '../../queryKeys';

export const usePolicy = () => {
  const queryClient = useQueryClient();
  const setShippingPolicy = useShippingPolicyStore(
    (state) => state.setShippingPolicy
  );

  const useShippingPolicyCreate = () => {
    return useMutation({
      mutationFn: async () => await createShippingPolicy(),
      onSuccess: (data) => {
        setShippingPolicy(data);
        queryClient.setQueryData(SHIPPING_POLICY_KEYS.get(), () => ({
          ...data,
        }));
      },
    });
  };

  const useShippingPolicyGet = () => {
    return useQuery({
      queryKey: SHIPPING_POLICY_KEYS.get(),
      queryFn: async () => await getShippingPolicy(),
      refetchOnWindowFocus: false,
    });
  };

  const useShippingPolicyUpdate = () => {
    return useMutation({
      mutationFn: async (updatedShippingPolicy: ShippingPolicy) =>
        await updateShippingPolicy(
          updatedShippingPolicy._id!,
          updatedShippingPolicy
        ),
      onSuccess: (data) => {
        queryClient.setQueryData(SHIPPING_POLICY_KEYS.get(), () => ({
          ...data,
        }));
      },
    });
  };

  return {
    useShippingPolicyCreate,
    useShippingPolicyGet,
    useShippingPolicyUpdate,
  };
};
