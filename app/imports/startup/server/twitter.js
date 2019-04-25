import { Meteor } from 'meteor/meteor';
import Twitter from 'twitter';

const client = new Twitter(Meteor.settings.twitter);

export default client;