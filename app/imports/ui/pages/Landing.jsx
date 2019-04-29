import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Icon, Container, Header, Image, Divider, List, Grid, Segment, Button, Card } from 'semantic-ui-react';
import ForkRibbon from '../components/ForkRibbon';
import UserCard from '../components/UserCard';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
    constructor(props) {
        super(props);

        this.githubUrl = Meteor.settings.public.githubUrl;
        this.twitterUrl = Meteor.settings.public.twitterUrl;
    }

    render() {
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
                  <Button primary size='huge' onClick={this.onSignUp}>
                      Sign up with
                      <Icon name='twitter' className='right' />
                  </Button>
              </Container>
          </Segment>
          <Segment vertical className='stripe'>
              <Grid stackable container divided='vertically'>
                  <Grid.Row>
                      <Grid.Column width={8}>
                          <Header as='h3'>How will I protect the newbies?</Header>
                          <p>
                              You can vote for projects: are they scams or not?
                              The more people vote for Fraud,
                              the more probability that others {"won't"} make a mistake.
                          </p>
                          <Header as='h3'>How will I gain followers?</Header>
                          <p>
                              We are interested in encouraging influencers to vote, {"that's"} why
                              we ask you to follow a particular influencer on&nbsp;
                              <a
                                  target='_blank'
                                  rel='noopener noreferrer'
                                  href={this.twitterUrl}
                                  className='twitter-span'>
                                  Twitter
                              </a> too see his decision.
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
                                      &nbsp;<a href='#'>Is Craig Wright fraud or not?</a>
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
                              <Button primary size='huge' onClick={this.onSignUp}>
                                  Try it with
                                  <Icon name='twitter' className='right' />
                              </Button>
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
                              <Grid.Column>
                                  <UserCard
                                      name='CryptoPanic HQ'
                                      username='CryptoPanicHQ'
                                      bio='This is official http://CryptoPanic.com  announcements channel. Follow @CryptoPanicCom for trending news!'
                                      avatarUrl='https://pbs.twimg.com/profile_images/1033478926490914818/t02Q6ozB_400x400.jpg'
                                      power={876552}
                                  />
                              </Grid.Column>
                          </Grid>
                      </Grid.Column>
                  </Grid.Row>
              </Grid>
          </Segment>
          <ForkRibbon url={this.githubUrl}/>
      </div>;
  }

    // render() {
  //   return <Container>
  //       <Grid columns={2} verticalAlign='middle' textAlign='center' divided >
  //           <Grid.Row>
  //               <Grid.Column>
  //                   <Image src='/shield.png' size='small' centered/>
  //                   <Header size='huge'>Protect newbies</Header>
  //               </Grid.Column>
  //               <Grid.Column>
  //                   <Image src='/followers.jpg' size='small' centered/>
  //                   <Header size='huge'>Gain followers</Header>
  //               </Grid.Column>
  //           </Grid.Row>
  //       </Grid>
  //       <Header as='h1' textAlign='center'>
  //           <a href='#' onClick={this.onSignUp}>Sign up with <Icon name='twitter' size='large' color="blue" /></a>
  //       </Header>
  //       <Segment>
  //           <Header as='h2'>
  //               How will I protect the newbies?
  //               <Header.Subheader>You can vote for projects: are they scams or not?</Header.Subheader>
  //           </Header>
  //       </Segment>
  //       <Segment>
  //           <Header as='h2'>
  //               How will I gain followers?
  //               <Header.Subheader>Noobs need to follow you to see your vote.</Header.Subheader>
  //           </Header>
  //       </Segment>
  //       <Segment>
  //           <Header as='h2'>
  //               How it works?
  //               <Header.Subheader>
  //                   <List>
  //                       <List.Item>
  //                           <List.Icon name='bitcoin' />
  //                           <List.Content>Alice is new to crypto.</List.Content>
  //                       </List.Item>
  //                       <List.Item>
  //                           <List.Icon name='question' />
  //                           <List.Content>Alice wants to know: <a href='#'>Is Craig Wright fraud or not?</a></List.Content>
  //                       </List.Item>
  //                       <List.Item>
  //                           <List.Icon name='check' />
  //                           <List.Content>
  //                               Alice checks the votes of her favourite Twitter personalities:
  //                               <a href='#'>@notsofast</a>,
  //                               <a href='#'>@anambroid</a>
  //                               & others.
  //                           </List.Content>
  //                       </List.Item>
  //                       <List.Item>
  //                           <List.Icon name='twitter square' />
  //                           <List.Content>Alice <b>follows more people</b> to see their votes.</List.Content>
  //                       </List.Item>
  //                       <List.Item>
  //                           <List.Icon name='lab' />
  //                           <List.Content>Alice makes up her mind.</List.Content>
  //                       </List.Item>
  //                       <List.Item>
  //                           <List.Icon name='thumbs up' />
  //                           <List.Content>Alice is happy</List.Content>
  //                       </List.Item>
  //                   </List>
  //               </Header.Subheader>
  //           </Header>
  //       </Segment>
  //       <Segment>
  //           <Header>Who has already signed up?</Header>
  //       </Segment>
  //       <Segment>
  //           <Header>Explore</Header>
  //       </Segment>
  //   </Container>;
  // }
  //
  onSignUp() {
      Meteor.loginWithTwitter();
  }
}

export default Landing;
