import React from 'react';
import { Container, Segment } from 'semantic-ui-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    return (
        <Segment inverted vertical>
          <Container textAlign='center'>
              <p>© VoterMelon, 2019. Fork me if you can.</p>
              <p>Built by <a target='_blank' rel='noopener noreferrer' href='https://github.com/IcyEagle'>Aleksandr Kuzmenko</a>, idea by <a target='_blank' rel='noopener noreferrer' href='https://github.com/DenGorbachev'>Denis Gorbachev</a></p>
          </Container>
        </Segment>
    );
  }
}

export default Footer;
