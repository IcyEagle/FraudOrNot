import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Grid, Icon, Segment, Image } from 'semantic-ui-react';
import { Questions } from '/imports/api/question/question';
import { Decisions } from '/imports/api/decision/decision';
// import QuestionItem from '/imports/ui/components/QuestionItem';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import DecisionWidget from '../components/DecisionWidget';

  class QuestionPage extends React.Component {

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const { onSubmitVote, onChangeVote, decision } = this.props;
    const { _id: questionId, text, trueCount, falseCount } = this.props.question;

    return (
        <Container>
          <Header as='h3' block textAlign='center'>{text}</Header>
          <DecisionWidget
              decision={decision}
              onSubmit={onSubmitVote.bind(this, questionId)}
              onChange={onChangeVote.bind(this, questionId)}
          />
            <Segment.Group>
              <Segment>
                <Grid columns={2} divided stackable textAlign='center'>
                  <Grid.Row verticalAlign='middle'>
                    <Grid.Column>
                      <Header icon>
                        Scam score - {falseCount}
                      </Header>
                    </Grid.Column>

                    <Grid.Column>
                      <Header icon>
                        Legit score - {trueCount}
                      </Header>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
              <Segment.Group>
                <Segment>
                  <Header><Icon name="user"/>Friends</Header>
                  <Grid columns={2} divided stackable>
                    <Grid.Row>
                      <Grid.Column>
                        <Segment.Group piled>
                          <Segment>
                            <Image className="user-avatar" src='http://pbs.twimg.com/profile_images/671889928066695169/skZqTB3q_normal.jpg' avatar />
                            <span>Aleksandr Kuzmenko</span>
                          </Segment>
                          <Segment>
                            <Image className="user-avatar" src='http://pbs.twimg.com/profile_images/378800000259416836/4ae011a3cd43c978d388ab7eadd16a44_normal.jpeg' avatar />
                            <span>Denis Gorbachev</span>
                          </Segment>
                        </Segment.Group>
                      </Grid.Column>
                      <Grid.Column>
                        {/* <List celled> */}
                          {/* <List.Item>Aleksandr Kuzmenko<Label>123</Label></List.Item> */}
                          {/* <List.Item>Denis Gorbachev</List.Item> */}
                          {/* <List.Item>Max Power</List.Item> */}
                        {/* </List> */}
                        <Segment.Group piled>
                          <Segment>
                            <Image className="user-avatar" src='http://pbs.twimg.com/profile_images/671889928066695169/skZqTB3q_normal.jpg' avatar />
                            <span>Aleksandr Kuzmenko</span>
                          </Segment>
                          <Segment>
                            <Image className="user-avatar" src='http://pbs.twimg.com/profile_images/378800000259416836/4ae011a3cd43c978d388ab7eadd16a44_normal.jpeg' avatar />
                            <span>Denis Gorbachev</span>
                          </Segment>
                          <Segment>
                            <Image className="user-avatar" src='http://pbs.twimg.com/profile_images/671889928066695169/skZqTB3q_normal.jpg' avatar />
                            <span>Max Power</span>
                          </Segment>
                        </Segment.Group>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Segment>
              </Segment.Group>
              <Segment.Group>
                <Segment>
                  <Header><Icon name="twitter"/>Twitmasters</Header>
                  <Grid columns={2} divided stackable>
                    <Grid.Row>
                      <Grid.Column>
                        <Segment.Group piled>
                          <Segment>
                            <Image className="user-avatar" src='http://pbs.twimg.com/profile_images/671889928066695169/skZqTB3q_normal.jpg' avatar />
                            <span>Aleksandr Kuzmenko</span>
                          </Segment>
                          <Segment>
                            <Image className="user-avatar" src='http://pbs.twimg.com/profile_images/378800000259416836/4ae011a3cd43c978d388ab7eadd16a44_normal.jpeg' avatar />
                            <span>Denis Gorbachev</span>
                          </Segment>
                        </Segment.Group>
                      </Grid.Column>
                      <Grid.Column>
                        {/* <List celled> */}
                          {/* <List.Item>Aleksandr Kuzmenko<Label>123</Label></List.Item> */}
                          {/* <List.Item>Denis Gorbachev</List.Item> */}
                          {/* <List.Item>Max Power</List.Item> */}
                        {/* </List> */}
                        <Segment.Group piled>
                          <Segment>
                            <Image className="user-avatar" src='http://pbs.twimg.com/profile_images/671889928066695169/skZqTB3q_normal.jpg' avatar />
                            <span>Aleksandr Kuzmenko</span>
                          </Segment>
                          <Segment>
                            <Image className="user-avatar" src='http://pbs.twimg.com/profile_images/378800000259416836/4ae011a3cd43c978d388ab7eadd16a44_normal.jpeg' avatar />
                            <span>Denis Gorbachev</span>
                          </Segment>
                          <Segment>
                            <Image className="user-avatar" src='http://pbs.twimg.com/profile_images/671889928066695169/skZqTB3q_normal.jpg' avatar />
                            <span>Max Power</span>
                          </Segment>
                        </Segment.Group>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Segment>
              </Segment.Group>
            </Segment.Group>
        </Container>
    );
  }
}

QuestionPage.propTypes = {
  question: PropTypes.object, // in fact, required
  decision: PropTypes.object,
  topPositiveDecisions: PropTypes.array.isRequired,
  topNegativeDecisions: PropTypes.array.isRequired,
  friendsPositiveDecisions: PropTypes.array,
  friendsNegativeDecisions: PropTypes.array,
  ready: PropTypes.bool.isRequired,
  onSubmitVote: PropTypes.func.isRequired,
  onChangeVote: PropTypes.func.isRequired,
};

export default withTracker(({ match: { params: { id } } }) => {
  const userSubscriptions = Meteor.user() ? [
    Meteor.subscribe('decisions.self', id),
    Meteor.subscribe('decisions.friendsTopPositive', id),
    Meteor.subscribe('decisions.friendsTopNegative', id),
  ] : [];

  const subscriptions = [
    Meteor.subscribe('question.id', id),
    Meteor.subscribe('decisions.topNegative', id),
    Meteor.subscribe('decisions.topPositive', id),
  ].concat(userSubscriptions);

  const userRelatedData = Meteor.user() ? {
    decision: Decisions.findOne({ questionId: id, userId: Meteor.user()._id }),
    topPositiveDecisions: Decisions.find(
        { userId: { $nin: Meteor.user().profile.friends }, choice: true },
        { sort: { power: -1 } },
    ).fetch(),
    topNegativeDecisions: Decisions.find(
        { userId: { $nin: Meteor.user().profile.friends }, choice: false },
        { sort: { power: -1 } },
    ).fetch(),
    friendsPositiveDecisions: Decisions.find(
        { userId: { $in: Meteor.user().profile.friends }, choice: true },
        { sort: { power: -1 } },
    ).fetch(),
    friendsNegativeDecisions: Decisions.find(
        { userId: { $in: Meteor.user().profile.friends }, choice: false },
        { sort: { power: -1 } },
    ).fetch(),
  } : {
    topPositiveDecisions: Decisions.find({ choice: true }, { sort: { power: -1 } }).fetch(),
    topNegativeDecisions: Decisions.find({ choice: false }, { sort: { power: -1 } }).fetch(),
  };

  return Object.assign({
    question: Questions.findOne(id),
    ready: subscriptions.every(subscription => subscription.ready()),
    onSubmitVote: Meteor.call.bind(this, 'vote'),
    onChangeVote: Meteor.call.bind(this, 'vote.change'),
  }, userRelatedData);
})(QuestionPage);
