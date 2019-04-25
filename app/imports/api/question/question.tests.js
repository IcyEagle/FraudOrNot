/* eslint-env mocha */

import faker from 'faker';
import { Factory } from 'meteor/dburles:factory';

import { Questions } from './question.js';

Factory.define('question', Questions, {
    text: () => faker.lorem.sentence(),
    trueCount: 0,
    falseCount: 0,
    createdAt: () => new Date(),
});
