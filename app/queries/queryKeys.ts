export const USER_KEYS = {
  getByEmail: (email: string | null | undefined) => ['users', { email: email }],
};

export const ORGANIZATION_KEYS = {
  get: () => ['organization'],
};

export const CATEGORY_KEYS = {
  list: () => ['categories'],
  get: (id: string) => ['categories', id],
};

export const PRODUCT_KEYS = {
  list: () => ['products'],
  get: (id: string | undefined) => ['product', id],
};

export const SHIPPING_POLICY_KEYS = {
  get: () => ['policy'],
};

export const COMMENT_KEYS = {
  list: (id: string) => ['comments', { productId: id }],
};

export const CART_KEYS = {
  get: (id: string) => ['cart', { userId: id }],
};

export const POST_KEYS = {
  list: () => ['posts'],
  get: (postId: string) => ['post', postId],
};

export const CONTACT_KEYS = {
  list: () => ['contact'],
  get: (contactId: string) => ['contact', contactId],
};

export const ORDER_KEYS = {
  list: (userId: string) => ['orders', { userId: userId }],
};
