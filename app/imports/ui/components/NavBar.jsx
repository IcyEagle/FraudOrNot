import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Header, Image } from 'semantic-ui-react';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  constructor(data) {
      super(data);

      this.onLoginClicked = this.onLoginClicked.bind(this);
      this.onLogoutClicked = this.onLogoutClicked.bind(this);
  }

  render() {
    const menuStyle = { marginBottom: '10px' };

    return (
      <Menu style={menuStyle} attached="top" borderless inverted>
        <Menu.Item as={NavLink} activeClassName="" exact to="/">
          <Header inverted as='h1'>
              <Image src='/watermelon.png' size='mini' verticalAlign='middle' />
              <Header.Content>{this.props.title}</Header.Content>
          </Header>
        </Menu.Item>
        <Menu.Item as={NavLink} activeClassName="active" exact to="/" key='list'>Questions</Menu.Item>
          <Menu.Menu position="right">
          <Menu.Item>
              {this.props.currentUser === '' ? (
                  <a href="#" onClick={this.onLoginClicked}>
                      Login with <Icon name="twitter" size="large" color="blue" />
                  </a>
              ) : (
                <span>
                <Header as="h4" inverted>
                    <Image src={this.props.avatar} avatar className="user-avatar" />
                    <Header.Content>
                        {this.props.currentUser}
                        <Header.Subheader>
                            <Icon name="bolt" color="yellow" />
                            <span
                                className="user-power"
                                data-tooltip="Your vote power"
                                data-position="bottom center"
                            >{this.props.power}</span>
                        </Header.Subheader>
                    </Header.Content>
                </Header>
                </span>
              )}
          </Menu.Item>
              {this.props.currentUser !== '' ? <Menu.Item position="right">
              <Icon title="Logout" onClick={this.onLogoutClicked} link name="sign-out"/>
                </Menu.Item> : ''}
        </Menu.Menu>
      </Menu>
    );
  }

  onLoginClicked(e) {
    const { onLogin } = this.props;
    e.preventDefault();
    onLogin();
  }

    onLogoutClicked(e) {
    const { onLogout } = this.props;
    e.preventDefault();
    onLogout();
  }
}

/** Declare the types of all properties. */
NavBar.propTypes = {
  currentUser: PropTypes.string,
  onLogin: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  power: PropTypes.string,
  title: PropTypes.string.isRequired,
  avatar: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().profile.name : '',
  power: Meteor.user() ? Meteor.user().profile.power.toString() : '',
  avatar: Meteor.user() ? Meteor.user().profile.avatarUrl : '',
  title: Meteor.settings.public.applicationName,
  onLogin: Meteor.loginWithTwitter,
  onLogout: Meteor.logout,
}))(NavBar);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(NavBarContainer);
