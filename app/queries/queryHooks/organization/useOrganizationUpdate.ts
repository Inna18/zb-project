import { useMutation, useQueryClient } from '@tanstack/react-query';
import Organization, {
  updateOrganization,
} from '@/app/service/useOrganizationApi';
import { ORGANIZATION_KEYS } from '../../queryKeys';

export const useOrganizationUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedOrganization: Organization) =>
      await updateOrganization(updatedOrganization._id, updatedOrganization),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ORGANIZATION_KEYS.get() });
    },
  });
};
