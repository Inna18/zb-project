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
