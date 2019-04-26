/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Factory } from 'meteor/dburles:factory';
import { assert } from 'chai';

import { Questions } from './question/question';
import { Users } from './user/user';
import './methods';

if (Meteor.isServer) {
    describe('Methods', function () {
        describe('vote', function () {
            beforeEach(function () {
                resetDatabase();

                Factory.create('question');
                Factory.create('user');
            });

            it('can vote for the question', function () {
                const question = Questions.findOne();
                const user = Users.findOne();

                Meteor.server.method_handlers.vote.call({ userId: user._id }, question._id, true);

                const updatedQuestion = Questions.findOne();

                assert.equal(updatedQuestion.trueCount, 1);
            });
        });
    });
}
