import Organization from '../../../service/useOrganizationApi';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateOrganization } from '../../../service/useOrganizationApi';

export const useOrganizationUpdate = (
  id: string,
  updatedOrganization: Organization
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => await updateOrganization(id, updatedOrganization),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};
