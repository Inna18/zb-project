import { type SchemaTypeDefinition } from 'sanity';
import user from './schemas/user';
import organization from './schemas/organization';
import category from './schemas/category';
import product from './schemas/product';
import shippingPolicy from './schemas/shippingPolicy';
import comment from './schemas/comment';
import cart from './schemas/cart';
import post from './schemas/post';
import contact from './schemas/contact';
import payment from './schemas/payment';
import order from './schemas/order';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    user,
    organization,
    category,
    product,
    shippingPolicy,
    comment,
    cart,
    post,
    contact,
    payment,
    order,
  ],
};
