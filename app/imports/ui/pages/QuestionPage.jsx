import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Grid, Icon, Segment, Image, List } from 'semantic-ui-react';
import { Questions } from '/imports/api/question/question';
import { Decisions } from '/imports/api/decision/decision';
// import QuestionItem from '/imports/ui/components/QuestionItem';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import DecisionWidget from '../components/DecisionWidget';
import NavBar from '../components/NavBar';
import { roundNumber } from '../components/helpers';

  class QuestionPage extends React.Component {

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const { onSubmitVote, onChangeVote, decision, positives, negatives, negativeScore, positiveScore } = this.props;
    const { _id: questionId, text } = this.props.question;

    return (<>
        <NavBar/>
        <Container>
          <Header as='h1' block textAlign='center' className='question-text'>{text}</Header>
          <DecisionWidget
              decision={decision}
              onSubmit={onSubmitVote.bind(this, questionId)}
              onChange={onChangeVote.bind(this, questionId)}
          />
          {/*<Header as='h1' className='question-segment-header'>What do your friends think?</Header>*/}
          <Grid columns={2} divided stackable className='decision-grid'>
            <Grid.Row>
              <Grid.Column>
                <Header className='scam-header' textAlign='center'>
                  <Icon name='thumbs down' />
                  Scam score - {roundNumber(negativeScore)}
                </Header>
                <List relaxed divided>
                  {positives.length ? positives.map(this.renderNegativeDecision.bind(this)) : this.renderNoItems()}
                </List>
              </Grid.Column>

              <Grid.Column>
                <Header className='legit-header' textAlign='center'>
                  <Icon name='thumbs up' />
                  Legit score - {roundNumber(positiveScore)}
                </Header>
                <List relaxed divided>
                  {negatives.length ? negatives.map(this.renderPositiveDecision.bind(this)) : this.renderNoItems()}
                </List>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Header as='h2' textAlign='center'>Follow influencers too reveal their decisions</Header>
              {/*<Segment.Group>*/}
                {/*<Segment>*/}
                  {/*<Header><Icon name="twitter"/>Twitmasters</Header>*/}
                  {/*<Grid columns={2} divided stackable>*/}
                    {/*<Grid.Row>*/}
                      {/*<Grid.Column>*/}
                        {/*<Segment.Group piled>*/}
                          {/*<Segment>*/}
                            {/*<Image className="user-avatar" src='http://pbs.twimg.com/profile_images/671889928066695169/skZqTB3q_normal.jpg' avatar />*/}
                            {/*<span>Aleksandr Kuzmenko</span>*/}
                          {/*</Segment>*/}
                          {/*<Segment>*/}
                            {/*<Image className="user-avatar" src='http://pbs.twimg.com/profile_images/378800000259416836/4ae011a3cd43c978d388ab7eadd16a44_normal.jpeg' avatar />*/}
                            {/*<span>Denis Gorbachev</span>*/}
                          {/*</Segment>*/}
                        {/*</Segment.Group>*/}
                      {/*</Grid.Column>*/}
                      {/*<Grid.Column>*/}
                        {/*/!* <List celled> *!/*/}
                          {/*/!* <List.Item>Aleksandr Kuzmenko<Label>123</Label></List.Item> *!/*/}
                          {/*/!* <List.Item>Denis Gorbachev</List.Item> *!/*/}
                          {/*/!* <List.Item>Max Power</List.Item> *!/*/}
                        {/*/!* </List> *!/*/}
                        {/*<Segment.Group piled>*/}
                          {/*<Segment>*/}
                            {/*<Image className="user-avatar" src='http://pbs.twimg.com/profile_images/671889928066695169/skZqTB3q_normal.jpg' avatar />*/}
                            {/*<span>Aleksandr Kuzmenko</span>*/}
                          {/*</Segment>*/}
                          {/*<Segment>*/}
                            {/*<Image className="user-avatar" src='http://pbs.twimg.com/profile_images/378800000259416836/4ae011a3cd43c978d388ab7eadd16a44_normal.jpeg' avatar />*/}
                            {/*<span>Denis Gorbachev</span>*/}
                          {/*</Segment>*/}
                          {/*<Segment>*/}
                            {/*<Image className="user-avatar" src='http://pbs.twimg.com/profile_images/671889928066695169/skZqTB3q_normal.jpg' avatar />*/}
                            {/*<span>Max Power</span>*/}
                          {/*</Segment>*/}
                        {/*</Segment.Group>*/}
                      {/*</Grid.Column>*/}
                    {/*</Grid.Row>*/}
                  {/*</Grid>*/}
                {/*</Segment>*/}
              {/*</Segment.Group>*/}
        </Container>
      </>
    );
  }

  renderPositiveDecision(friend) {
    return this.renderFriendDecision(friend, 'legit-text-color');
  }

  renderNegativeDecision(friend) {
    return this.renderFriendDecision(friend, 'scam-text-color');
  }

  renderFriendDecision({ power, name, username, avatarUrl }, className) {
    return <List.Item key={username}>
      <Image avatar src={avatarUrl} size='mini' />
      <List.Content>
        <List.Header>{name}</List.Header>
        <List.Description><a
            target='_blank'
            rel='noopener noreferrer'
            href={`https://twitter.com/${username}`}>@{username}</a></List.Description>
      </List.Content>
      <List.Content floated='right' verticalAlign='middle' className={className}>
        {roundNumber(power)}
      </List.Content>
    </List.Item>;
  }

  renderNoItems() {
    return <i>Nobody has decided yet</i>;
  }
}

QuestionPage.propTypes = {
  question: PropTypes.object, // in fact, required
  decision: PropTypes.object,
  positives: PropTypes.array.isRequired,
  negatives: PropTypes.array.isRequired,
  others: PropTypes.array.isRequired,
  positiveScore: PropTypes.number.isRequired,
  negativeScore: PropTypes.number.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  ready: PropTypes.bool.isRequired,
  onSubmitVote: PropTypes.func.isRequired,
  onChangeVote: PropTypes.func.isRequired,
};

export default withTracker(({ match: { params: { id } } }) => {
  const subscriptions = [
    Meteor.subscribe('decisions.self', id),
    Meteor.subscribe('decisions.friends', id),
    Meteor.subscribe('question.id', id),
    Meteor.subscribe('decisions.others', id),
  ];

  const toScore = decisions => decisions.map(({ power }) => power).reduce((a, b) => a + b, 0);

  const question = Questions.findOne(id);
  const friendIds = Meteor.user() ? Meteor.user().profile.friends : [];
  const decision = Decisions.findOne({ questionId: id, userId: Meteor.user()._id });
  const decisions = Decisions.find({ questionId: id }, { sort: { power: -1 } }).fetch();
  const friends = decisions.filter(({ externalId }) => friendIds.includes(externalId));
  const others = decisions.filter(({ externalId }) => !friendIds.includes(externalId));
  const positives = friends.filter(({ choice }) => choice);
  const negatives = friends.filter(({ choice }) => !choice);
  const positiveScore = toScore(positives);
  const negativeScore = toScore(negatives);

  return {
    question,
    decision,
    positives,
    negatives,
    others,
    positiveScore,
    negativeScore,
    isAuthenticated: !!Meteor.user(),
    ready: subscriptions.every(subscription => subscription.ready()),
    onSubmitVote: Meteor.call.bind(this, 'vote'),
    onChangeVote: Meteor.call.bind(this, 'vote.change'),
  };
})(QuestionPage);
