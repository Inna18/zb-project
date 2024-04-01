import { groq, SanityDocumentStub } from "next-sanity"
import { client } from "@/sanity/lib/client"

export default interface User {
    email: string,
    password: string,
    name?: string,
    address?: string,
    phoneNumber?: string,
    profileImg?: File
}

async function getUsers() {
    return client.fetch(
        groq`*[_type == 'user']{
          email,
          password, 
          name, 
          address, 
          phoneNumber,
          profileImg {alt, 'image': asset->url},
        }`
      )
}

async function getUser(emailProp: string) {
  const query = groq`*[_type == 'user' && email == $email]{email, password, name}`;
  const params = {email: emailProp}

  return client.fetch(query, params)
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
    const result = await client.create(sanityUser)
    return result;
}

async function deleteAllUsers() {
  await client.delete({query: `*[_type == 'user']`})
}

export { getUsers, getUser, createUser, deleteAllUsers }