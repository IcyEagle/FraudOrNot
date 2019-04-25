import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const FraudButtons = ({ onSubmit, negativeLabel, positiveLabel }) => (
    <Button.Group size='massive' fluid>
        <Button onClick={() => onSubmit(false)} negative>
            <Icon name='thumbs down' />{negativeLabel}
        </Button>
        <Button.Or />
        <Button onClick={() => onSubmit(true)} positive>
            <Icon name='thumbs up' />{positiveLabel}
        </Button>
    </Button.Group>
);

FraudButtons.defaultProps = {
    negativeLabel: 'Fraud',
    positiveLabel: 'Legit',
};

FraudButtons.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    negativeLabel: PropTypes.string,
    positiveLabel: PropTypes.string,
};


export default FraudButtons;
