import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const UserCard = ({ name, username, avatarUrl, bio, power }) => (
    <Card fluid className='user-card'>
        <Card.Content>
            <Image floated='left' avatar size='huge' src={avatarUrl} />
            <Card.Header>{name}</Card.Header>
            <Card.Meta><a href={`https://twitter.com/${username}`}>@{username}</a></Card.Meta>
            <Card.Description>{bio}</Card.Description>
        </Card.Content>
        <Card.Content extra>
            <Icon name='users' />
            {power} followers
        </Card.Content>
    </Card>
);

UserCard.propTypes = {
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    power: PropTypes.number.isRequired,
};

export default UserCard;
