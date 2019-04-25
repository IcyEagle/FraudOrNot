/* eslint-env mocha */

import faker from 'faker';
import { Factory } from 'meteor/dburles:factory';

import { Users } from './user';

Factory.define('user', Users, {
    username: () => faker.lorem.word(),
    emails: [{ address: `${faker.lorem.word()}@example.com`, verified: true }],
});
