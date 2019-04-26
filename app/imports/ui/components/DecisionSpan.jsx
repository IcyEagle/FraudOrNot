import React from 'react';
import { Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const Span = ({ choice, onCancel }) => (
    <span>
        <span>Your choice is { choice ? <Icon name='thumbs up' /> : <Icon name='thumbs down' />}</span>
        <span>You can <a href="#" onClick={e => { e.preventDefault(); onCancel(); } }>cancel</a> your decision.</span>
    </span>
);

Span.propTypes = {
    choice: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
};


export default Span;
