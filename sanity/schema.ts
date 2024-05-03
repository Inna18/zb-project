import { type SchemaTypeDefinition } from 'sanity';
import user from './schemas/user';
import organization from './schemas/organization';
import category from './schemas/category';
import product from './schemas/product';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [user, organization, category, product],
};
