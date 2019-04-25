import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.loginAsUser = function (userId, callback = () => {}) {
    const loginRequest = { userId };

    Accounts.callLoginMethod({
        methodArguments: [loginRequest],
        userCallback: callback,
    });
};
