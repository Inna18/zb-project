import { useQuery } from '@tanstack/react-query';
import { ORGANIZATION_KEYS } from '../../queryKeys';
import { getOrganization } from '../../../service/useOrganizationApi';

export const useOrganizationGet = () => {
  return useQuery({
    queryKey: ORGANIZATION_KEYS.get(),
    queryFn: async () => await getOrganization(),
  });
};
