import Organization from '@/app/service/useOrganizationApi';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateOrganization } from '@/app/service/useOrganizationApi';

export const useOrganizationUpdate = (
  id: string,
  updatedOrganization: Organization
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => await updateOrganization(id, updatedOrganization),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organization'] });
    },
  });
};
