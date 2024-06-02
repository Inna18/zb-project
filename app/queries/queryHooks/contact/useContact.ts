import { useMutation, useQuery } from '@tanstack/react-query';
import { CONTACT_KEYS } from '@/app/queries/queryKeys';
import Contact, {
  getContacts,
  getContactById,
  createContact,
} from '@/app/service/useContactApi';

const useContactList = () => {
  return useQuery({
    queryKey: CONTACT_KEYS.list(),
    queryFn: async () => await getContacts(),
  });
};

const useContactGet = (id: string) => {
  return useQuery({
    queryKey: CONTACT_KEYS.get(id),
    queryFn: async () => await getContactById(id),
  });
};

const useContactCreate = () => {
  return useMutation({
    mutationFn: async (newContact: Contact) => await createContact(newContact),
  });
};

export { useContactList, useContactGet, useContactCreate };
