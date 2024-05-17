import { useMutation } from '@tanstack/react-query';
import Organization, {
  updateOrganization,
} from '@/app/service/useOrganizationApi';

export const useOrganizationUpdate = () => {
  return useMutation({
    mutationFn: async (updatedOrganization: Organization) =>
      await updateOrganization(updatedOrganization._id, updatedOrganization),
  });
};
