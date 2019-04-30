import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Icon, Container, Header, Image, Divider, List, Grid, Segment, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import scrollToElement from 'scroll-to-element';
import ForkRibbon from '../components/ForkRibbon';
import UserCard from '../components/UserCard';
import QuestionCard from '../components/QuestionCard';
import Footer from '../components/Footer';
import { Questions } from '/imports/api/question/question';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
    constructor(props) {
        super(props);

        this.githubUrl = Meteor.settings.public.githubUrl;
        this.twitterUrl = Meteor.settings.public.twitterUrl;
        this.onExploreClick = this.onExploreClick.bind(this);
    }

    render() {
      const { isAuthenticated, questions, mainQuestion } = this.props;

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
                                      &nbsp;<a href='#'>{mainQuestion ? mainQuestion.text : ''}</a>
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
                  <Grid.Row>
                      <Grid.Column width={16}>
                          <Header as='h3'>Who has already signed up?</Header>
                          <Grid stackable columns={3} className='influencers-list'>
                              <Grid.Column>
                                  <UserCard
                                      name='John McAfee'
                                      username='officialmcafee'
                                      bio='The power we are seeking to unleash with the 2020 campaign is not the power of John McAfee. It is the power of the individual.'
                                      avatarUrl='https://pbs.twimg.com/profile_images/1068211396712763392/7FxhjlR3_400x400.jpg'
                                      power={14453232}
                                  />
                              </Grid.Column>
                              <Grid.Column>
                                  <UserCard
                                      name='James Bang'
                                      username='PRHacks'
                                      bio='Using Blockchain to solve real world problems. Cryptocurrency investor & market maker for exchanges and tokens. CEO of Zeo Fund & COO of ICOiN Studios.'
                                      avatarUrl='https://pbs.twimg.com/profile_images/1032108604378112001/duH5lAY7_400x400.jpg'
                                      power={45600787}
                                  />
                              </Grid.Column>
                              <Grid.Column>
                                  <UserCard
                                      name='Tyler Jenks'
                                      username='LucidInvestment'
                                      bio='President of Lucid Investment with over 40 years experience in financial markets. Devoted to analyzing Bitcoin and Cryptos. Host of Hyperwave Web Series.'
                                      avatarUrl='https://pbs.twimg.com/profile_images/1003982000796110849/Io557AVG_400x400.jpg'
                                      power={7651132}
                                  />
                              </Grid.Column>
                              {/* <Grid.Column> */}
                                  {/* <UserCard */}
                                      {/* name='CryptoPanic HQ' */}
                                      {/* username='CryptoPanicHQ' */}
                                      {/* bio='This is official http://CryptoPanic.com  announcements channel. Follow @CryptoPanicCom for trending news!' */}
                                      {/* avatarUrl='https://pbs.twimg.com/profile_images/1033478926490914818/t02Q6ozB_400x400.jpg' */}
                                      {/* power={876552} */}
                                  {/* /> */}
                              {/* </Grid.Column> */}
                          </Grid>
                      </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                      <Grid.Column width={16}>
                          <Header as='h3' id='explore'>Explore</Header>
                          <Grid stackable columns={3} className='influencers-list'>
                              {questions.map(({ _id, text, imageUrl, voters }) => <Grid.Column key={_id}>
                                  <QuestionCard text={text} imageUrl={imageUrl} voted={voters} />
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
    // required by nature
    mainQuestion: PropTypes.object,
    isAuthenticated: PropTypes.bool.isRequired,
    ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
    const subscriptions = [Meteor.subscribe('questions')];
    const isAuthenticated = Meteor.user() != null;

    return {
        // any sorting criteria to stabilize results
        questions: Questions.find({}, { sort: { _id: -1 } }).fetch(),
        // take the main question or any as a fallback
        mainQuestion: Questions.findOne({ isMain: true }),
        ready: subscriptions.every(subscription => subscription.ready()),
        isAuthenticated,
    };
})(Landing);
