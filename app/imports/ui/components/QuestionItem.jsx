import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Question table. See pages/ListQuestion.jsx. */
class QuestionItem extends React.Component {
  render() {
    const { question: { _id, text } } = this.props;

    return (
        <Table.Row>
          <Table.Cell><Link to={`/show/${_id}`}>{text}</Link></Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
QuestionItem.propTypes = {
  question: PropTypes.object.isRequired,
};

export default withRouter(QuestionItem);
