import { client } from '@/sanity/lib/client';

export default interface Contact {
  _id: string;
  name: string;
  email: string;
  message: string;
  _createdAt?: string;
}

async function getContacts() {
  const query = `*[_type == 'contact'] | order(_createdAt desc) {
        _id,
        name,
        email,
        message,
        _createdAt
    }`;
  const allContacts = await client.fetch(query);
  console.log('Contact list: ', allContacts);
  return allContacts;
}

async function getContactById(id: string) {
  const query = `*[_type == 'contact' && _id == ${id}][0] {
        _id,
        name,
        email,
        message,
        _createdAt
    }`;
  const contactById = await client.fetch(query);
  console.log('Contact by id: ', contactById);
  return contactById;
}

async function createContact(contact: Contact) {
  const sanityContact = {
    _type: 'contact',
    name: contact.name,
    email: contact.email,
    message: contact.message,
  };

  const contactCreated = await client.create(sanityContact);
  console.log('Contact created: ', contactCreated);
  return contactCreated;
}

export { getContacts, getContactById, createContact };
