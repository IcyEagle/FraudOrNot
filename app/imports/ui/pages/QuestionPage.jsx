import React from 'react';
import { Meteor } from 'meteor/meteor';
import {Container, Header, Loader, Grid, Icon, Segment, Image} from 'semantic-ui-react';
import { Questions } from '/imports/api/question/question';
import { Decisions } from '/imports/api/decision/decision';
// import QuestionItem from '/imports/ui/components/QuestionItem';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import DecisionButton from '../components/DecisionButton';

class QuestionPage extends React.Component {

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const { onVote } = this.props;
    const { _id: questionId, text, trueCount, falseCount } = this.props.question;

    return (
        <Container>
          <Header as='h3' block textAlign='center'>{text}</Header>
          <DecisionButton onSubmit={onVote.bind(this, questionId)} />
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
                {/*<Header>Others</Header>*/}
              {/*<Grid columns={2} divided stackable textAlign='center'>*/}
                {/*<Grid.Row>*/}
                  {/*<Grid.Column>*/}
                    {/*<Segment.Group piled>*/}
                      {/*<Segment>Joe Young</Segment>*/}
                      {/*<Segment>Bruth Benner</Segment>*/}
                      {/*<Segment>Amily White</Segment>*/}
                      {/*<Segment>Chris Sunders</Segment>*/}
                      {/*<Segment>Ludovik Cheh</Segment>*/}
                      {/*<Segment>Satoshi Nakamoto</Segment>*/}
                    {/*</Segment.Group>*/}
                  {/*</Grid.Column>*/}
                  {/*<Grid.Column>*/}
                    {/*<Segment.Group piled>*/}
                      {/*<Segment>Ben Groth</Segment>*/}
                      {/*<Segment>Alan Kooper</Segment>*/}
                      {/*<Segment>Benjamin Franklin</Segment>*/}
                      {/*<Segment>Adam Smith</Segment>*/}
                    {/*</Segment.Group>*/}
                  {/*</Grid.Column>*/}
                {/*</Grid.Row>*/}
              {/*</Grid>*/}
            </Segment.Group>
        </Container>
    );
  }
}

QuestionPage.propTypes = {
  question: PropTypes.object, // in fact, required
  // decisions: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
  onVote: PropTypes.func.isRequired,
};

export default withTracker(({ match: { params: { id } } }) => {
  const subscriptions = [Meteor.subscribe('question.id', id)];

  return {
    question: Questions.findOne(id),
    // decisions: Decisions.find({}).fetch(),
    ready: subscriptions.every(subscription => subscription.ready()),
    onVote: Meteor.call.bind(this, 'vote'),
  };
})(QuestionPage);
