import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Users } from '../../api/user/user';

Accounts.registerLoginHandler(request => {
    if (Meteor.settings.env !== 'dev') return null;

    if (typeof request.userId === 'string') {
        const { userId } = request;
        const user = Users.findOne(userId);
        if (!user) return { error: new Meteor.Error(501, `User with id ${userId} not found`) };
        return { userId };
    }

    return null;
});
