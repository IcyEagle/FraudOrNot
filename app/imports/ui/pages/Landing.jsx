import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, Link } from 'react-router-dom';
import { Icon, Container, Header, Image, Divider, List, Grid, Segment, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import scrollToElement from 'scroll-to-element';
import ForkRibbon from '../components/ForkRibbon';
import UserCard from '../components/UserCard';
import QuestionCard from '../components/QuestionCard';
import Footer from '../components/Footer';
import { Questions } from '/imports/api/question/question';
import { Users } from '/imports/api/user/user';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
    constructor(props) {
        super(props);

        this.githubUrl = Meteor.settings.public.githubUrl;
        this.twitterUrl = Meteor.settings.public.twitterUrl;
        this.onExploreClick = this.onExploreClick.bind(this);
    }

    render() {
        return this.props.ready ? this.renderPage() : '';
    }

    renderPage() {
      const { isAuthenticated, questions, users, mainQuestion } = this.props;

      return <div>
          <Segment inverted vertical textAlign='center' className='masthead'>
              <Container text>
                  <Header as='h1' inverted className='extra-margin'>Protect newbies</Header>
                  <Divider horizontal inverted>And</Divider>
                  <Header as='h1' inverted>Gain followers</Header>
                  <Header as='p' inverted className='logo-span'>
                      <i>
                          with&nbsp;
                          <span className='voter-span'>Voter</span>
                          <span className='melon-span'>Melon</span>
                      </i>
                  </Header>
                  {isAuthenticated ? this.renderExploreButton() : <Button primary size='huge' onClick={this.onSignUp}>
                      Sign up with
                      <Icon name='twitter' className='right' />
                  </Button> }
              </Container>
          </Segment>
          <Segment vertical className='stripe'>
              <Grid stackable container divided='vertically'>
                  <Grid.Row>
                      <Grid.Column width={8}>
                          <Header as='h3'>How will I protect the newbies?</Header>
                          <p>
                              You can protect newbies by voting for projects (scam or legit).
                              <br />
                              The more people downvote the scam projects, the more newbies will be saved.
                          </p>
                          <Header as='h3'>How will I gain followers?</Header>
                          <p>
                              Your votes are only visible to people who follow you.
                              <br />
                              Newbies will need to expand their following lists to see consensus.
                          </p>
                      </Grid.Column>
                      <Grid.Column width={6} floated='right' verticalAlign='middle' textAlign='justified'>
                          <Image src='/shield.png' size='medium' centered />
                      </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                      <Grid.Column width={16}>
                          <Header as='h3'>How does it work?</Header>
                          <List size='huge' relaxed className='alice-list'>
                              <List.Item>
                                  <List.Icon name='bitcoin' color='yellow' />
                                  <List.Content>Alice is new to crypto.</List.Content>
                              </List.Item>
                              <List.Item>
                                  <List.Icon name='question' color='olive' />
                                  <List.Content>
                                      Alice wants to know:
                                      &nbsp;<Link to={`/show/${mainQuestion._id}`}>{mainQuestion.text}</Link>
                                  </List.Content>
                              </List.Item>
                              <List.Item>
                                  <List.Icon name='check' color='green' />
                                  <List.Content>
                                      Alice checks the votes of her favourite Twitter personalities:
                                      &nbsp;<a
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        href='https://twitter.com/notsofast'>@notsofast</a>,
                                      &nbsp;<a
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        href='https://twitter.com/anambroid'>@anambroid</a>
                                      &nbsp;& others.
                                  </List.Content>
                              </List.Item>
                              <List.Item>
                                  <List.Icon name='twitter square' color='blue' />
                                  <List.Content>Alice <b>follows more people</b> to see their votes.</List.Content>
                              </List.Item>
                              <List.Item>
                                  <List.Icon name='lab' color='purple' />
                                  <List.Content>Alice makes up her mind.</List.Content>
                              </List.Item>
                              <List.Item>
                                  <List.Icon name='thumbs up' color='green' />
                                  <List.Content>Alice is happy.</List.Content>
                              </List.Item>
                          </List>
                          <div className='sign-in-row'>
                              {isAuthenticated ? this.renderExploreButton() : <Button primary size='huge' onClick={this.onSignUp}>
                                  Try it with
                                  <Icon name='twitter' className='right' />
                              </Button>}
                          </div>
                      </Grid.Column>
                  </Grid.Row>
                  {users.length >= 3 ? <Grid.Row>
                      <Grid.Column width={16}>
                          <Header as='h3'>Who has already signed up?</Header>
                          <Grid stackable columns={3} className='influencers-list'>
                              {users.map(({ _id, profile }) => <Grid.Column key={_id}>
                                  <UserCard {...profile} />
                              </Grid.Column>)}
                          </Grid>
                      </Grid.Column>
                  </Grid.Row> : ''}
                  <Grid.Row>
                      <Grid.Column width={16}>
                          <Header as='h3' id='explore'>Explore</Header>
                          <Grid stackable columns={3} className='influencers-list'>
                              {questions.map(({ _id: id, text, imageUrl, voters }) => <Grid.Column key={id}>
                                  <QuestionCard id={id} text={text} imageUrl={imageUrl} voted={voters} />
                              </Grid.Column>)}
                          </Grid>
                      </Grid.Column>
                  </Grid.Row>
              </Grid>
          </Segment>
          <Footer />
          <ForkRibbon url={this.githubUrl}/>
      </div>;
  }

  onSignUp() {
      Meteor.loginWithTwitter();
  }

  renderExploreButton() {
    return <Button primary size='huge' onClick={this.onExploreClick}>
        Explore
    </Button>;
  }

  onExploreClick() {
      scrollToElement('#explore');
  }
}

Landing.propTypes = {
    questions: PropTypes.array.isRequired,
    users: PropTypes.array.isRequired,
    // required by nature
    mainQuestion: PropTypes.object,
    isAuthenticated: PropTypes.bool.isRequired,
    ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
    const subscriptions = [Meteor.subscribe('questions'), Meteor.subscribe('users.top')];
    const isAuthenticated = Meteor.user() != null;

    return {
        // any sorting criteria to stabilize results
        questions: Questions.find({}, { sort: { _id: -1 } }).fetch(),
        users: Users.find({}, { sort: { 'profile.power': -1 }, limit: 3 }).fetch(),
        // take the main question or any as a fallback
        mainQuestion: Questions.findOne({ isMain: true }),
        ready: subscriptions.every(subscription => subscription.ready()),
        isAuthenticated,
    };
})(Landing);
