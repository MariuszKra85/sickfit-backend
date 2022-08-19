import { text, password, relationship } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

export const User = list({
  // access:
  ui: {
    listView: {
      initialColumns: ['name', 'email'],
    },
  },
  fields: {
    name: text({ isRequired: true }),
    email: text({ isRequired: true, isUnique: true }),
    password: password({ isRequired: true }),
  },
});
