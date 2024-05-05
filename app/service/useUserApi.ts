import { client } from '@/sanity/lib/client';

export default interface User {
  _id?: string;
  email: string;
  password: string;
  name?: string;
  role?: string;
  address?: string;
  phoneNumber?: string;
  profileImg?: string;
}

const BASE_QUERY = `*[_type == 'user']{
  email,
  password,
  name, 
  role,
  address,
  phoneNumber,
  "profileImg": profileImg.asset->url
}`;

async function getUsers() {
  const userList = await client.fetch(BASE_QUERY);
  console.log('User list: ', userList);
  return userList;
}

async function getUserByEmail(emailProp: string | null | undefined) {
  const query = `*[_type == 'user' && email == '${emailProp}'][0]{
    _id,
    email,
    password,
    name,
    role,
    address,
    phoneNumber,
    "profileImg": profileImg.asset->url
  }`;
  const userByEmail = await client.fetch(query);
  return userByEmail;
}

async function getUserByEmailAndPassword(
  emailProp: string,
  passwordProp: string
) {
  const query = `*[_type == 'user' && email == '${emailProp}' && password == '${passwordProp}'][0]{
    email,
    password,
    name, 
    role,
    address,
    phoneNumber,
    "profileImg": profileImg.asset->url
  }`;
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
    throw new Error('User already exists');
  }
}

async function updateUser(id: string | undefined, updateUser: User) {
  const uploadedImg = updateUser.profileImg
    ? await client.assets.upload('image', updateUser.profileImg)
    : null;
  const updatedUser = await client
    .patch(id!!)
    .set({
      password: updateUser.password,
      name: updateUser.name,
      address: updateUser.address,
      phoneNumber: updateUser.phoneNumber,
      profileImg: uploadedImg
        ? {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: uploadedImg?._id,
            },
          }
        : undefined,
    })
    .commit();
  console.log(updatedUser);
}

async function deleteAllUsers() {
  const isDelete = await client.delete({ query: '*[_type== "user"][0...999]' });
  console.log('Delete result: ', isDelete);
  return isDelete;
}

export {
  getUsers,
  getUserByEmail,
  getUserByEmailAndPassword,
  createUser,
  updateUser,
  deleteAllUsers,
};
