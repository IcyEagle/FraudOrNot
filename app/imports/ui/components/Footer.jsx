import React from 'react';
import { Container, Segment } from 'semantic-ui-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { paddingTop: '15px' };
    return (
        <Segment inverted vertical>
          <Container textAlign='center'>
              <p>© Copyright 2019 | VaterMelon. All right reserved.</p>
              <p>Powered by <a target='_blank' rel='noopener noreferrer'
                               href='https://github.com/IcyEagle/'>Aleksandr Kuzmenko</a></p>
          </Container>
        </Segment>
    );
  }
}

export default Footer;
