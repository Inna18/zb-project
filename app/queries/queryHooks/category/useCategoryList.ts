import { useQuery } from "@tanstack/react-query"
import { CATEGORY_KEYS } from "../../queryKeys";
import { getCategories } from "../../../service/useCategoryApi";

export const useCategoryList = () => {
    return useQuery({
        queryKey: CATEGORY_KEYS.list(),
        queryFn: async () => await getCategories()
    })
}