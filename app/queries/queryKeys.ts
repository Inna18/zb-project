import User from "../service/useUserApi";

export const USER_KEYS = {
    byEmail: (email: string | null | undefined) => ['users', { email: email }],
    update: (updateUser: User) => ['users', updateUser]
}
