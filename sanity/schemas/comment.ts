export default {
    name: 'comment',
    title: 'Comment',
    type: 'document',
    fields: [
      { name: 'rating', title: 'Rating', type: 'number' },
      {
        name: 'content',
        title: 'Content',
        type: 'array',
        of: [{ type: 'block' }],
      },
      {
        name: 'commentImages',
        title: 'Comment images',
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
        validation: (Rule: any) => Rule.max(1),
        options: { hotspot: true },
      },
      { name: 'createdBy', title: 'Created By', type: 'string'},
      { name: 'postId', title: 'Post Id', type: 'string'}
    ],
  };