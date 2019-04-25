import { Meteor } from 'meteor/meteor';
import { Questions } from './question';

const vote = (questionId, decision) => {
    const question = Questions.findOne(questionId);

    if (question === null) throw new Meteor.Error('question.not_found', 'Question not found', { questionId });

    const field = decision ? 'trueCount' : 'falseCount';
    const modifier = { $inc: { [field]: 1 } };

    Questions.update(questionId, modifier);
};

const unvote = (questionId, decision) => {
    const question = Questions.findOne(questionId);

    if (question === null) throw new Meteor.Error('question.not_found', 'Question not found', { questionId });

    const field = decision ? 'trueCount' : 'falseCount';
    const modifier = { $inc: { [field]: -1 } };

    Questions.update(questionId, modifier);
};

export { vote, unvote };
