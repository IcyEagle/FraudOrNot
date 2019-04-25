import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { Questions } from '/imports/api/question/question';
import QuestionItem from '/imports/ui/components/QuestionItem';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

class ListQuestion extends React.Component {

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center">List Question</Header>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Text</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>{this.props.questions.map(question => <QuestionItem key={question._id} question={question} />)}
            </Table.Body>
          </Table>
        </Container>
    );
  }
}

ListQuestion.propTypes = {
  questions: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subscriptions = [Meteor.subscribe('questions')];
  return {
    // any sorting criteria to stabilize results
    questions: Questions.find({}, { sort: { _id: -1 } }).fetch(),
    ready: subscriptions.every(subscription => subscription.ready()),
  };
})(ListQuestion);
