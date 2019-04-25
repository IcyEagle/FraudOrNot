import { Meteor } from 'meteor/meteor';
import { ServiceConfiguration } from 'meteor/service-configuration';

Meteor.startup(() => {
    ServiceConfiguration.configurations.upsert(
        { service: 'twitter' },
        {
            $set: {
                loginStyle: 'popup',
                consumerKey: Meteor.settings.twitter.consumer_key,
                secret: Meteor.settings.twitter.consumer_secret,
            },
        },
    );
});
