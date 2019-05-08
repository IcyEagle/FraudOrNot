import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Users } from '../../api/user/user';

Accounts.registerLoginHandler(request => {
    if (Meteor.settings.env !== 'dev') return null;

    if (typeof request.username === 'string') {
        const { username } = request;
        const user = Users.findOne({ username });
        if (!user) return { error: new Meteor.Error(501, `User with id ${username} not found`) };
        return { userId: user._id };
    }

    return null;
});
