export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    { name: 'category', title: 'Category', type: 'string' },
    { name: 'brand', title: 'Brand', type: 'string' },
    { name: 'name', title: 'Name', type: 'string' },
    { name: 'price', title: 'Price', type: 'string' },
    { name: 'quantity', title: 'Quantity', type: 'number' },
    { name: 'rating', title: 'Rating', type: 'number' },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          fields: [
            {
              name: 'alt',
              title: 'Alt',
              type: 'string',
            }
          ]
        }
      ],
    },
    {
      name: 'productImages',
      title: 'Product images',
      type: 'array',
      of: [
        { 
          type: 'image',
          fields: [
          {
            name: 'alt',
            title: 'Alt',
            type: 'string',
          },
          ],
         },
       ],
      options: { hotspot: true },
    },
  ],
};
