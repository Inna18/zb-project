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
  const query = `${BASE_QUERY}{
    _id,
    email,
    password, 
    name, 
    address, 
    phoneNumber,
    profileImg {alt, 'image': asset->url},
  }`;

  try {
    const response = await fetch(
      `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v1/data/query/${process.env.NEXT_PUBLIC_SANITY_DATASET}?query=${query}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SANITY_AUTH_TOKEN}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    const data = response.json();
    console.log('All user fetched: ', data);
    return data;
  } catch (e) {
    console.log('Error: ', e);
    return null;
  }
}

async function getUserByEmail(emailProp: string) {
  // FIX: params not accepted in url, find method to fix...

  try {
    const response = await fetch(
      `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v1/data/query/${process.env.NEXT_PUBLIC_SANITY_DATASET}?query=${BASE_QUERY}&$email="${emailProp}"&$name="Admin"`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SANITY_AUTH_TOKEN}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }
    const data = response.json();
    console.log('User fetched: ', data);
  } catch (e) {
    console.log('Error: ', e);
  }
}

async function getUserByEmailAndPassword(
  emailProp: string,
  passwordProp: string
) {
  // FIX: params not accepted in url, find method to fix...
  let userList = await getUsers();
  let isExists = false;

  if (userList.result.length > 0) {
    isExists = userList.result.find(
      (el: User) => el.email === emailProp && el.password === passwordProp
    );
  }

  if (isExists) {
    return isExists;
  } else {
    console.log('User credentials are not valid');
    return null;
  }
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
  let userList = await getUsers(); // FIX: fix getUserByEmail and use this method
  let isExists = false;

  if (userList.result.length > 0) {
    isExists = userList.result.find((el: User) => el.email === user.email);
  }
  if (!isExists) {
    try {
      const response = await fetch(
        `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v1/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_SANITY_AUTH_TOKEN}`,
          },
          body: JSON.stringify({
            mutations: [
              {
                create: sanityUser,
              },
            ],
          }),
        }
      );
      if (!response.ok) {
        throw new Error('Failed to create new user');
      }
      const data = await response.json();
      console.log('New user created');
      return data;
    } catch (e) {
      console.log('Error: ', e);
      return null;
    }
  } else {
    console.log('User with this email already exists');
    return null;
  }
}

async function deleteAllUsers() {
  try {
    const response = await fetch(
      `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v1/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SANITY_AUTH_TOKEN}`,
        },
        body: JSON.stringify({
          mutations: [
            {
              delete: {
                query: BASE_QUERY,
              },
            },
          ],
        }),
      }
    );
    if (!response.ok) {
      throw new Error('Failed to delete all users');
    }
    const data = await response.json();
    console.log('All users deleted');
  } catch (e) {
    console.log('Error: ', e);
  }
}

export {
  getUsers,
  getUserByEmail,
  getUserByEmailAndPassword,
  createUser,
  deleteAllUsers,
};
