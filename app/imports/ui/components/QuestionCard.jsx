import React from 'react';
import {Button, Card, Header, Icon, Image, Segment} from 'semantic-ui-react';
import PropTypes from 'prop-types';

const QuestionCard = ({ text, imageUrl, voted }) => (
    <Segment className='question-card'>
        <Image src={imageUrl} centered />
        <Header as='h2' className='title'>
            <Header.Content>
                {text}
                <Header.Subheader>{voted} people voted</Header.Subheader>
            </Header.Content>
        </Header>
        <Button primary fluid>Show</Button>
    </Segment>
);

QuestionCard.propTypes = {
    text: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    voted: PropTypes.number.isRequired,
};

export default QuestionCard;
