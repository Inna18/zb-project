import { groq, SanityDocumentStub } from "next-sanity"
import { client } from "@/sanity/lib/client"

export default interface User {
    email: string,
    password: string,
    name?: string,
    address?: string,
    phoneNumber?: string,
    profileImg?: any
}

async function getUsers() {
    return client.fetch(
        `*[_type == 'user']{
          email,
          password, 
          name, 
          address, 
          phoneNumber,
          profileImg
        }`
      )
}

async function getUser(emailProp: string) {
  const query = groq`*[_type == 'user' && email == $email]{email, password, name}`;
  const params = {email: emailProp}

  return client.fetch(query, params)
}

async function createUser(user: User) {
    const sanityUser = {
      _type: 'user',
      email: user.email,
      password: user.password, 
      name: user.name, 
      address: user.address,
      phoneNumber: user.phoneNumber,
      profileImg: user.profileImg
    }
    const result = client.create(sanityUser)
    return result;
}

export { getUsers, getUser, createUser }