import { client } from '@/sanity/lib/client';

export default interface Order {
  _id?: string;
  userId: string;
  itemSet: { _key: string; image: string; name: string; price: number; count: number }[];
  totalCost: number;
  _createdAt?: string;
}

async function getOrderListByUserId(userId: string) {
    const query = `*[_type == 'order' && userId == '${userId}'] {
        _id, 
        userId,
        itemSet,
        totalCost,
        _createdAt
    }`;
    const orderByUserId = await client.fetch(query);
    console.log('Order by UserId: ', orderByUserId);
    return orderByUserId;
}

async function createOrder(newOrder: Order) {
    const sanityOrder = {
        _type: 'order',
        userId: newOrder.userId,
        itemSet: newOrder.itemSet,
        totalCost: newOrder.totalCost,
      };

      const createdOrder = await client.create(sanityOrder);
      console.log('Order created: ', createdOrder);
      return createdOrder;
}
export { getOrderListByUserId, createOrder }