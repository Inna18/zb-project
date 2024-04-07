import { client } from '@/sanity/lib/client';

export default interface User {
  email: string;
  password: string;
  name?: string;
  role?: string;
  address?: string;
  phoneNumber?: string;
  profileImg?: File;
}

const BASE_QUERY = `*[_type == 'user']`;

async function getUsers() {
  const userList = await client.fetch(BASE_QUERY);
  console.log('User list: ', userList);
  return userList;
}

async function getUserByEmail(emailProp: string) {
  const query = `*[_type == 'user' && email == '${emailProp}'][0]`;
  const userByEmail = await client.fetch(query);
  console.log('User by email: ', userByEmail);
  return userByEmail;
}

async function getUserByEmailAndPassword(
  emailProp: string,
  passwordProp: string
) {
  const query = `*[_type == 'user' && email == '${emailProp}' && password == '${passwordProp}'][0]`;
  const userByEmailAndPassword = await client.fetch(query);
  console.log('User by email & password: ', userByEmailAndPassword);
  return userByEmailAndPassword;
}

async function createUser(user: User) {
  const uploadedImg = user.profileImg
    ? await client.assets.upload('image', user.profileImg)
    : null;
  const sanityUser = {
    _type: 'user',
    email: user.email,
    password: user.password,
    name: user.name,
    role: user.role,
    address: user.address,
    phoneNumber: user.phoneNumber,
    profileImg: uploadedImg
      ? {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: uploadedImg?._id,
          },
        }
      : undefined,
  };

  const inDB = await getUserByEmail(user.email);
  if (inDB === null) {
    const userCreated = await client.create(sanityUser);
    console.log('User created: ', userCreated.email);
    return userCreated;
  } else {
    console.log('User already exists');
    return null;
  }
}

async function deleteAllUsers() {
  const isDelete = await client.delete({ query: BASE_QUERY });
  console.log('Delete result: ', isDelete);
  return isDelete;
}

export {
  getUsers,
  getUserByEmail,
  getUserByEmailAndPassword,
  createUser,
  deleteAllUsers,
};
