import { client } from '@/sanity/lib/client';

export default interface ShippingPolicy {
  _id?: string;
  content?: any;
  _createdAt?: string;
}

async function getShippingPolicy() {
  const query = `*[_type == 'shippingPolicy'][0]{
        _id,
        content,
        _createdAt,
    }`;
  const shippingPolicy = await client.fetch(query);
  console.log('Shipping policy: ', shippingPolicy);
  return shippingPolicy;
}

async function createShippingPolicy() {
  const sanityShippingPolicy = {
    _type: 'shippingPolicy',
    content: [],
  };
  const createdShippingPolicy = await client.create(sanityShippingPolicy);
  console.log('Shipping policy created: ', createdShippingPolicy);
  return createdShippingPolicy;
}

async function updateShippingPolicy(
  id: string,
  updateShippingPolicy: ShippingPolicy
) {
  const updatedShippingPolicy = await client
    .patch(id)
    .set({
      content: updateShippingPolicy.content,
    })
    .commit();
  console.log(updatedShippingPolicy);
  return updatedShippingPolicy;
}

async function deleteShippingPolicy() {
  const deleteResult = await client.delete({
    query: `*[_type == 'shippingPolicy'][0...999]`,
  });
  console.log(deleteResult);
}

export {
  getShippingPolicy,
  createShippingPolicy,
  updateShippingPolicy,
  deleteShippingPolicy,
};
