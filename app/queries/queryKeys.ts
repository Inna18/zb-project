import User from '../service/useUserApi';

export const USER_KEYS = {
  getByEmail: (email: string | null | undefined) => ['users', { email: email }],
  create: (createUser: User) => ['users', createUser],
  update: (updateUser: User) => ['users', updateUser],
};

export const ORGANIZATION_KEYS = {
  get: () => ['organization'],
};
