import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Decisions } from '../../api/decision/decision';
import { Users } from '../../api/user/user';
import { Questions } from '../../api/question/question';

/* eslint-disable no-console */

/** Initialize the database with a default decisions. */
function addDecision({ text, username, choice }) {
  const question = Questions.findOne({ text });
  const user = Users.findOne({ username });
  const { name, avatarUrl, externalId, power } = user.profile;
  console.log(`  Adding: decision: ${text}, user: ${name}, choice: ${choice}`);
  Decisions.insert({
    questionId: question._id,
    userId: user._id,
    choice,
    power,
    externalId,
    name,
    username,
    avatarUrl,
  });
}

/** Initialize the collection if empty. */
if (Decisions.find().count() === 0) {
  if (Meteor.settings.defaultDecisions) {
    console.log('Creating default decisions.');
    Meteor.settings.defaultDecisions.forEach(addDecision);
  }
}

Meteor.publish('decisions.self', function publish(questionId) {
  check(questionId, String);

  if (!this.userId) return this.ready();

  return Decisions.find({ questionId, userId: this.userId });
});

Meteor.publish('decisions.friends', function publish(questionId) {
  check(questionId, String);

  if (!this.userId) return this.ready();

  // they may be not fetched from Twitter API yet
  if (!Meteor.user().profile.friends) return this.ready();

  const { friends } = Meteor.user().profile;

  return Decisions.find({ questionId, externalId: { $in: friends } });
});

Meteor.publish('decisions.others', function publish(questionId) {
  check(questionId, String);

  if (!this.userId) return this.ready();

  // they may be not fetched from Twitter API yet
  if (!Meteor.user().profile.friends) return this.ready();

  const { friends } = Meteor.user().profile;

  return Decisions.find({ questionId, externalId: { $nin: friends } }, { sort: { power: -1 }, limit: 10, fields: { choice: 0 } });
});
