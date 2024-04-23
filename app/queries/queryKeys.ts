import User from '../service/useUserApi';

export const USER_KEYS = {
  byEmail: (email: string | null | undefined) => ['users', { email: email }],
  create: (createUser: User) => ['users', createUser],
  update: (updateUser: User) => ['users', updateUser],
};
