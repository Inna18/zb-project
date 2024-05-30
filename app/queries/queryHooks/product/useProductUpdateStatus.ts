import { useMutation } from '@tanstack/react-query';
import { updateProductStatus } from '@/app/service/useProductApi';

export const useProductUpdateStatus = () => {
  return useMutation({
    mutationFn: async (obj: { id: string; posted: boolean }) =>
      await updateProductStatus(obj.id, obj.posted),
  });
};
