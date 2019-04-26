import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Decisions } from '../../api/decision/decision';
import { Users } from '../../api/user/user';
import { Questions } from '../../api/question/question';

/* eslint-disable no-console */

/** Initialize the database with a default decisions. */
function addDecision({ text, email, choice, power }) {
  const question = Questions.findOne({ text });
  const user = Users.findOne({ 'emails.address': email });
  console.log(`  Adding: decision: ${text}, user: ${email}, choice: ${choice}`);
  Decisions.insert({ questionId: question._id, userId: user._id, choice, power });
}

/** Initialize the collection if empty. */
if (Decisions.find().count() === 0) {
  if (Meteor.settings.defaultDecisions) {
    console.log('Creating default decisions.');
    Meteor.settings.defaultDecisions.forEach(addDecision);
  }
}

Meteor.publish('decisions.topNegative', function publish(questionId) {
  check(questionId, String);
  return Decisions.find({ questionId, choice: false }, { sort: { power: -1 }, limit: 10 });
});

Meteor.publish('decisions.topPositive', function publish(questionId) {
  check(questionId, String);
  return Decisions.find({ questionId, choice: true }, { sort: { power: -1 }, limit: 10 });
});

Meteor.publish('decisions.self', function publish(questionId) {
  check(questionId, String);

  if (!this.userId) return this.ready();

  return Decisions.find({ questionId, userId: this.userId });
});

Meteor.publish('decisions.friendsTopNegative', function publish(questionId) {
  check(questionId, String);

  if (!this.userId) return this.ready();

  // they may be not fetched from Twitter API yet
  if (!Meteor.user().friendIds) return this.ready();

  const { friendIds } = Meteor.user();

  return Decisions.find({ questionId, choice: false, userId: { $in: friendIds } }, { sort: { power: -1 }, limit: 10 });
});

Meteor.publish('decisions.friendsTopPositive', function publish(questionId) {
  check(questionId, String);

  if (!this.userId) return this.ready();

  // they may be not fetched from Twitter API yet
  if (!Meteor.user().friendIds) return this.ready();

  const { friendIds } = Meteor.user();

  return Decisions.find({ questionId, choice: true, userId: { $in: friendIds } }, { sort: { power: -1 }, limit: 10 });
});
