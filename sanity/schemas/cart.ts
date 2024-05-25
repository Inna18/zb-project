export default {
  name: 'cart',
  title: 'Cart',
  type: 'document',
  fields: [
    { name: 'userId', title: 'User Id', type: 'string' },
    {
      name: 'productCountSet',
      title: 'Products Count',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'set',
          fields: [
            { type: 'string', name: 'productId' },
            { type: 'number', name: 'count' },
          ],
        },
      ],
    },
  ],
};
