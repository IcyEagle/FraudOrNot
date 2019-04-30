import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Questions = new Mongo.Collection('questions');

/** Create a schema to constrain the structure of documents associated with this collection. */
const QuestionsSchema = new SimpleSchema({
  text: String,
  imageUrl: String,
  voters: SimpleSchema.Integer,
  isMain: { type: Boolean, optional: true, allowedValues: [true] },
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Questions.attachSchema(QuestionsSchema);

/** Make the collection and schema available to other code. */
export { Questions, QuestionsSchema };
