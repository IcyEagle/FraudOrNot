import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Decisions = new Mongo.Collection('decisions');

/** Create a schema to constrain the structure of documents associated with this collection. */
const DecisionsSchema = new SimpleSchema({
  userId: String,
  questionId: String,
  choice: Boolean,
  power: SimpleSchema.Integer,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Decisions.attachSchema(DecisionsSchema);

/** Make the collection and schema available to other code. */
export { Decisions, DecisionsSchema };
