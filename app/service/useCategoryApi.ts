import { client } from '@/sanity/lib/client';

export default interface Category {
  _id?: string;
  name: string;
}

const BASE_QUERY = `*[_type == 'category']{
    _id,
    name
}`;

async function getCategories() {
  console.log('Category list: ', client.fetch(BASE_QUERY));
  return client.fetch(BASE_QUERY);
}

async function getCategoryById(id: string) {
  const query = `*[_type == 'category' && _id == '${id}'][0] { _id, name }`;
  console.log('Category by id: ', client.fetch(query));
  return client.fetch(query);
}

async function getCategoryByName(name: string) {
  const query = `*[_type == 'category' && name == '${name}'][0]{
        _id,
        name,
      }`;
  const categoryByName = await client.fetch(query);
  console.log('Category by name: ', categoryByName);
  return categoryByName;
}

async function createCategory(category: Category) {
  const sanityCategory = {
    _type: 'category',
    name: category.name,
  };

  const inDB = await getCategoryByName(category.name);
  if (!inDB) {
    const categoryCreated = await client.create(sanityCategory);
    console.log('Category created: ', categoryCreated);
    return categoryCreated;
  } else {
    console.log('Category already exists');
    throw new Error('Category already exists');
  }
}

async function deleteCategory(id: string) {
  const inDB = await getCategoryById(id);
  if (!inDB) {
    const categoryDeleted = await client.delete(id);
    console.log('Category deleted');
  } else {
    console.log('No Such Category');
    throw new Error('No Such Category');
  }
}

export { getCategories, getCategoryById, createCategory, deleteCategory };
