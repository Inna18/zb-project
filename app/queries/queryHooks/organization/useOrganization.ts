import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ORGANIZATION_KEYS } from '@/app/queries/queryKeys';
import Organization, {
  getOrganization,
  updateOrganization,
} from '@/app/service/useOrganizationApi';

export const useOrganization = () => {
  const queryClient = useQueryClient();

  const useOrganizationGet = () => {
    return useQuery({
      queryKey: ORGANIZATION_KEYS.get(),
      queryFn: async () => await getOrganization(),
    });
  };

  const useOrganizationUpdate = () => {
    return useMutation({
      mutationFn: async (updatedOrganization: Organization) =>
        await updateOrganization(updatedOrganization._id, updatedOrganization),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ORGANIZATION_KEYS.get() });
      },
    });
  };

  return { useOrganizationGet, useOrganizationUpdate };
};
