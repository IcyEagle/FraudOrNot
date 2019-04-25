import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { vote, unvote } from './question/api';
import { Decisions } from './decision/decision';

function createDecision(questionId, userId, choice) {
  Decisions.insert({ questionId, userId, choice });
}

function removeDecision(questionId, userId) {
  Decisions.remove({ questionId, userId });
}

function userHasDecision(questionId, userId) {
  return Decisions.find({ questionId, userId }).count() > 0;
}

Meteor.methods({
    vote(questionId, decision) {
        check(questionId, String);
        check(decision, Boolean);

        if (!this.userId) throw new Meteor.Error(403, 'Only for authenticated users');

        if (userHasDecision(questionId, this.userId)) {
            throw new Meteor.Error(400, 'User has already decided', { questionId, userId: this.userId });
        }

        vote(questionId, decision);

        createDecision(questionId, this.userId, decision);

        return true;
    },
    unvote(questionId) {
        check(questionId, String);

        if (!this.userId) throw new Meteor.Error(403, 'Only for authenticated users');

        const decision = Decisions.findOne({ questionId, userId: this.userId });

        if (!decision) {
            throw new Meteor.Error(400, 'User has no decision', { questionId, userId: this.userId });
        }

        unvote(questionId, decision.choice);
        removeDecision(questionId, this.userId);

        return true;
    },
});
