import { groq } from "next-sanity"
import { client } from "@/sanity/lib/client"

export default interface User {
    email: string,
    password: string,
    name?: string,
    address?: string,
    phoneNumber?: string,
    profileImg?: File
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
    const response = await fetch(`https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v1/data/query/${process.env.NEXT_PUBLIC_SANITY_DATASET}?query=${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization:`Bearer ${process.env.NEXT_PUBLIC_SANITY_AUTH_TOKEN}`,
      }
    });
    if (!response.ok) {
      throw new Error("Failed to fetch users")
    }
    const data = response.json();
    console.log("All user fetched: ", data);
  } catch(e) {
    console.log("Error: ", e)
  }
  
}

async function getUser(emailProp: string) {
  // TODO: params not accepted in url, find method to fix...
  const query = groq`*[_type == 'user' && email == $email]{email, password, name}`; 
  const params = {email: emailProp}

  try {
    const response = await fetch(`https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v1/data/query/${process.env.NEXT_PUBLIC_SANITY_DATASET}?query=${BASE_QUERY}&$email="${emailProp}"&$name="Admin"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization:`Bearer ${process.env.NEXT_PUBLIC_SANITY_AUTH_TOKEN}`,
      }
    });
    if (!response.ok) {
      throw new Error("Failed to fetch user")
    }
    const data = response.json();
    console.log("User fetched: ", data);
  } catch(e) {
    console.log("Error: ", e)
  }
}

async function createUser(user: User) {
    const uploadedImg = user.profileImg ? await client.assets.upload('image', user.profileImg) : null
    const sanityUser = {
      _type: 'user',
      email: user.email,
      password: user.password, 
      name: user.name, 
      address: user.address,
      phoneNumber: user.phoneNumber,
      profileImg: uploadedImg?{
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: uploadedImg?._id,
        },
      }:undefined
    }
    
    try {
      const response = await fetch(`https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v1/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization:`Bearer ${process.env.NEXT_PUBLIC_SANITY_AUTH_TOKEN}`,
        },
        body: JSON.stringify({
          mutations: [{
            create: sanityUser
          }]
        })
      }) 
      if (!response.ok) {
        throw new Error("Failed to create new user")
      }
      const data = await response.json();
      console.log("New user created")
    } catch(e) {
      console.log("Error: ", e)
    }
}

async function deleteAllUsers() {
  try {
    const response = await fetch(`https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v1/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization:`Bearer ${process.env.NEXT_PUBLIC_SANITY_AUTH_TOKEN}`,
      },
      body: JSON.stringify({
        mutations: [{
          delete: {
            query: BASE_QUERY
          }
        }]
      })
    })
    if (!response.ok) {
      throw new Error("Failed to delete all users")
    }
    const data = await response.json();
    console.log("All users deleted")
  } catch(e) {
    console.log("Error: ", e)
  }
}

export { getUsers, getUser, createUser, deleteAllUsers }