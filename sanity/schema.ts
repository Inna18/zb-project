import { type SchemaTypeDefinition } from 'sanity';
import user from './schemas/user';
import organization from "./schemas/organization";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [user, organization],
};
