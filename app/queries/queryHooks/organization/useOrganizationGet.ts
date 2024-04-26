import { useQuery } from '@tanstack/react-query';
import { ORGANIZATION_KEYS } from '@/app/queries/queryKeys';
import { getOrganization } from '@/app/service/useOrganizationApi';

export const useOrganizationGet = () => {
  return useQuery({
    queryKey: ORGANIZATION_KEYS.get(),
    queryFn: async () => await getOrganization(),
  });
};
