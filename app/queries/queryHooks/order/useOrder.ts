import { useMutation, useQuery } from '@tanstack/react-query';
import { ORDER_KEYS } from '@/app/queries/queryKeys';
import Order, { getOrderListByUserId, createOrder } from '@/app/service/useOrderApi';

export const useOrder = () => {
    const useOrderList = (userId: string) => {
        return useQuery({
            queryKey: ORDER_KEYS.list(userId),
            queryFn: async () => await getOrderListByUserId(userId)
        });
    }

    const useOrderCreate = () => {
        return useMutation({
            mutationFn: async (
              newOrder: Order
            ) => await createOrder(newOrder),
          });
    }

    return { useOrderList, useOrderCreate }
}