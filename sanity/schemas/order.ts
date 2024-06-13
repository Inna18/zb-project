export default {
  name: 'order',
  title: 'Order',
  type: 'document',
  fields: [
    { name: 'userId', title: 'User Id', type: 'string' },
    {
      name: 'itemSet',
      title: 'Item Set',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'set',
          fields: [
            { type: 'string', name: 'image' },
            { type: 'string', name: 'name' },
            { type: 'number', name: 'price' },
            { type: 'number', name: 'count' },
          ],
        },
      ],
    },
    { name: 'totalCost', title: 'Total Cost', type: 'number' },
  ],
};
