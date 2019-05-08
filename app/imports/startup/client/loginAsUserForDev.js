import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.loginAsUser = function (username, userCallback = () => {}) {
    const loginRequest = { username };

    Accounts.callLoginMethod({
        methodArguments: [loginRequest],
        userCallback,
    });
};
