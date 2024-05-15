import { client } from '@/sanity/lib/client';

export default interface ShippingPolicy {
  _id?: string;
  content?: any; // what is rich text type?
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

async function createShippingPolicy(shippingPolicy: ShippingPolicy) {
  const sanityShippingPolicy = {
    _type: 'shippingPolicy',
    content: shippingPolicy.content,
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

export { getShippingPolicy, createShippingPolicy, updateShippingPolicy };
