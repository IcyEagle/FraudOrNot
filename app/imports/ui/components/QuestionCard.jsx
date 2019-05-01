import React from 'react';
import { Button, Header, Image, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

const QuestionCard = ({ id, text, imageUrl, voted }) => (
    <Segment className='question-card'>
        <Image src={imageUrl} centered />
        <Header as='h2' className='title'>
            <Header.Content>
                {text}
                <Header.Subheader>{voted} people voted</Header.Subheader>
            </Header.Content>
        </Header>
        <Link to={`/show/${id}`}><Button primary fluid>Show</Button></Link>
    </Segment>
);

QuestionCard.propTypes = {
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    voted: PropTypes.number.isRequired,
};

export default QuestionCard;
