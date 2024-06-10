import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Category, {
  createCategory,
  deleteCategory,
  getCategoryById,
  getCategories,
} from '@/app/service/useCategoryApi';
import { CATEGORY_KEYS } from '../../queryKeys';

export const useCategory = () => {
  const queryClient = useQueryClient();

  const useCategoryCreate = () => {
    return useMutation({
      mutationFn: async (newCategory: Category) =>
        await createCategory(newCategory),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: CATEGORY_KEYS.list() });
      },
    });
  };

  const useCategoryDelete = () => {
    return useMutation({
      mutationFn: async (id: string) => await deleteCategory(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: CATEGORY_KEYS.list() });
      },
    });
  };

  const useCategoryGet = (id: string) => {
    return useQuery({
      queryKey: CATEGORY_KEYS.get(id),
      queryFn: async () => await getCategoryById(id),
    });
  };

  const useCategoryList = () => {
    return useQuery({
      queryKey: CATEGORY_KEYS.list(),
      queryFn: async () => await getCategories(),
    });
  };

  return {
    useCategoryCreate,
    useCategoryDelete,
    useCategoryGet,
    useCategoryList,
  };
};
