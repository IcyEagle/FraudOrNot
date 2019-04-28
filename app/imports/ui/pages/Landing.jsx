import React from 'react';
import { Meteor } from 'meteor/meteor';
import GitHubForkRibbon from 'react-github-fork-ribbon';
import ForkRibbon from '../components/ForkRibbon';
import { Icon, Container, Header, Image, Divider, List, Grid, Segment, Button } from 'semantic-ui-react';

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
                      <Grid.Column width={6} floated='right' verticalAlign='middle'>
                          <Image src='/shield.png' size='medium' floated='right' />
                      </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                      <Grid.Column width={16}>
                          <Header as='h3'>How it works?</Header>
                          <List size='huge' relaxed>
                              <List.Item>
                                  <List.Icon name='bitcoin' />
                                  <List.Content>Alice is new to crypto.</List.Content>
                              </List.Item>
                              <List.Item>
                                  <List.Icon name='question' />
                                  <List.Content>Alice wants to know: <a href='#'>Is Craig Wright fraud or not?</a></List.Content>
                              </List.Item>
                              <List.Item>
                                  <List.Icon name='check' />
                                  <List.Content>
                                      Alice checks the votes of her favourite Twitter personalities:
                                      &nbsp;<a href='#'>@notsofast</a>,
                                      &nbsp;<a href='#'>@anambroid</a>
                                      &nbsp;& others.
                                  </List.Content>
                              </List.Item>
                              <List.Item>
                                  <List.Icon name='twitter square' />
                                  <List.Content>Alice <b>follows more people</b> to see their votes.</List.Content>
                              </List.Item>
                              <List.Item>
                                  <List.Icon name='lab' />
                                  <List.Content>Alice makes up her mind.</List.Content>
                              </List.Item>
                              <List.Item>
                                  <List.Icon name='thumbs up' />
                                  <List.Content>Alice is happy</List.Content>
                              </List.Item>
                          </List>
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
