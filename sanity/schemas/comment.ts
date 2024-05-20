export default {
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    { name: 'rating', title: 'Rating', type: 'number' },
    { name: 'content', title: 'Content', type: 'string' },
    {
      name: 'commentImage',
      title: 'Comment image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt',
          type: 'string',
        },
      ],
    },
    { name: 'createdBy', title: 'Created By', type: 'string' },
    { name: 'productId', title: 'Product Id', type: 'string' },
  ],
};
