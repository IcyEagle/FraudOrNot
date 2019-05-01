import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { Users } from '../../api/user/user';
// import Twitter from "./twitter";

/* eslint-disable no-console */

function createUser({ name, username, externalId, power, friends, bio, avatarUrl }) {
  console.log(`  Creating user ${name} ${username}.`);
  Accounts.createUser({
    externalId,
    username,
    power,
    profile: { name, username, power, bio, avatarUrl, friends: friends || [] },
  });
}

/** When running app for first time, pass a settings file to set up a default user account. */
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultUsers) {
    console.log('Creating the default user(s)');
    Meteor.settings.defaultUsers.forEach(createUser);
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}

Accounts.onCreateUser((options, user) => {
  // expect only registration via Twitter
  const { profile: { name } } = options;
  const { services: { twitter: { id: externalId, profile_image_url: avatarUrl } } } = user;

  const { defaultVotePower: power } = Meteor.settings;

  return Object.assign({
    externalId,
    profile: { name, avatarUrl, power, friends: [] },
    dataRequested: true,
  }, user);
});

// Accounts.onCreateUser(async (options, user) => {
//   // expect only registration via Twitter
//   const { profile: { name } } = options;
//   const { services: { twitter: { id: externalId, profile_image_url: avatarUrl } } } = user;
//
//   const twitterData = await Twitter.get('users/show', { user_id: externalId });
//   const { followers_count: power } = twitterData;
//
//   console.log(Object.assign({ externalId, twitterData, profile: { name, avatarUrl, power } }, user));
//
//   return Object.assign({ externalId, twitterData, profile: { name, avatarUrl, power } }, user);
// });

Meteor.publish('users.top', function () {
  return Users.find({}, { sort: { 'profile.power': -1 }, limit: 3 });
});
