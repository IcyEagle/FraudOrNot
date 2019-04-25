import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Questions } from '../../api/question/question';

/* eslint-disable no-console */

/** Initialize the database with a default questions. */
function addQuestion(data) {
  console.log(`  Adding: ${data.text}`);
  Questions.insert(data);
}

/** Initialize the collection if empty. */
if (Questions.find().count() === 0) {
  if (Meteor.settings.defaultQuestions) {
    console.log('Creating default questions.');
    Meteor.settings.defaultQuestions.forEach(addQuestion);
  }
}

/** This subscription publishes all available questions */
Meteor.publish('questions', function () {
  return Questions.find();
});

/** This subscription publishes a particular question by Id */
Meteor.publish('question.id', function (_id) {
  check(_id, String);

  return Questions.find({ _id });
});
