import { client } from '@/sanity/lib/client';

export default interface User {
  email: string;
  password: string;
  name?: string;
  address?: string;
  phoneNumber?: string;
  profileImg?: File;
}

const BASE_QUERY = `*[_type == 'user']`;

async function getUsers() {
  let res = await client.fetch(BASE_QUERY);
  console.log("User list: ", res)
  return res;
}

async function getUserByEmail(emailProp: string) {
  const query = `*[_type == 'user' && email == '${emailProp}'][0]`;
  let res = await client.fetch(query);
  console.log("User by email: ", res);
  return res;
}

async function getUserByEmailAndPassword(
  emailProp: string,
  passwordProp: string
) {
  const query = `*[_type == 'user' && email == '${emailProp}' && password == '${passwordProp}'][0]`;
  let res = await client.fetch(query);
  console.log("User by email & password: ", res);
  return res;
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
  
  let existsInDB = await getUserByEmail(user.email);
  if (existsInDB === null) {
    let res = await client.create(sanityUser)
    console.log("User created: ", res.email)
    return res;
  } else {
    console.log("User already exists")
    return null;
  }
}

async function deleteAllUsers() {
  let res = await client.delete({query: BASE_QUERY});
  console.log("Delete result: ", res);
  return res;
}

export {
  getUsers,
  getUserByEmail,
  getUserByEmailAndPassword,
  createUser,
  deleteAllUsers,
};
