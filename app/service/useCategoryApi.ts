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
  const categories = await client.fetch(BASE_QUERY);
  console.log("Categories: ", categories);
  return categories;
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
  const total = await getCategories();
  if (!inDB && total.length < 10) {
    const categoryCreated = await client.create(sanityCategory);
    console.log('Category created: ', categoryCreated);
    return categoryCreated;
  }
  if (inDB) {
    console.log('Category already exists');
    throw new Error('Category already exists');
  }
  if (total.length >= 10) {
    console.log('Only up to 10 categories can be created');
    throw new Error('Only up to 10 categories can be created');
  }
}

async function deleteCategory(id: string | undefined) {
  const inDB = await getCategoryById(id);
  if (inDB) {
    const categoryDeleted = await client.delete(id);
    console.log('Category deleted');
  } else {
    console.log('No Such Category');
    throw new Error('No Such Category');
  }
}

export { getCategories, getCategoryById, createCategory, deleteCategory };
