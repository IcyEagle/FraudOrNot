import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { vote, unvote } from './question/api';
import { Decisions } from './decision/decision';

function createDecision(questionId, userId, choice, power) {
  Decisions.insert({ questionId, userId, choice, power });
}

function removeDecision(questionId, userId) {
  Decisions.remove({ questionId, userId });
}

function userHasDecision(questionId, userId) {
  return Decisions.find({ questionId, userId }).count() > 0;
}

Meteor.methods({
    'vote'(questionId, choice) {
        check(questionId, String);
        check(choice, Boolean);

        if (!this.userId) throw new Meteor.Error(403, 'Only for authenticated users');

        if (userHasDecision(questionId, this.userId)) {
            throw new Meteor.Error(400, 'User has already decided', { questionId, userId: this.userId });
        }

        const { power } = Meteor.user().profile;

        vote(questionId, choice, power);
        createDecision(questionId, this.userId, choice, power);

        return true;
    },
    'vote.change'(questionId) {
        check(questionId, String);

        if (!this.userId) throw new Meteor.Error(403, 'Only for authenticated users');

        const decision = Decisions.findOne({ questionId, userId: this.userId });

        if (!decision) {
            throw new Meteor.Error(400, 'User has no decision', { questionId, userId: this.userId });
        }

        const { power } = Meteor.user().profile;

        const { choice } = decision;

        unvote(questionId, choice, power);
        removeDecision(questionId, this.userId);

        vote(questionId, !choice, power);
        createDecision(questionId, this.userId, !choice, power);

        return true;
    },
});
