import { useMutation, useQueryClient } from "@tanstack/react-query";
import Category, { createCategory, getCategories } from "../../../service/useCategoryApi";

export const useCategoryCreate = (newCategory: Category) => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async () => await createCategory(newCategory),
        onSuccess: () => {
            queryClient.invalidateQueries();
        }
    })
}