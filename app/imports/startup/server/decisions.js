import { Meteor } from 'meteor/meteor';
import { Decisions } from '../../api/decision/decision';
import { Users } from '../../api/user/user';
import { Questions } from '../../api/question/question';

/* eslint-disable no-console */

/** Initialize the database with a default decisions. */
function addDecision({ text, email, choice }) {
  const question = Questions.findOne({ text });
  const user = Users.findOne({ 'emails.address': email });
  console.log(`  Adding: question: ${text}, user: ${email}, choice: ${choice}`);
  Decisions.insert({ questionId: question._id, userId: user._id, choice });
}

/** Initialize the collection if empty. */
if (Decisions.find().count() === 0) {
  if (Meteor.settings.defaultDecisions) {
    console.log('Creating default decisions.');
    Meteor.settings.defaultDecisions.forEach(addDecision);
  }
}

/** This subscription publishes all available questions */
Meteor.publish('Decision', function publish() {
  if (this.userId) {
    return Decisions.find({ userId: this.userId });
  }

  return this.ready();
});
