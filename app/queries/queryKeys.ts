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
