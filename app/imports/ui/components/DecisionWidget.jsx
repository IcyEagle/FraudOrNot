import React from 'react';
import { Button, Icon, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class DecisionWidget extends React.Component {
    constructor(data) {
        super(data);

        this.onChange = this.onChange.bind(this);
    }

    render() {
        const { decision } = this.props;
        return decision ? this.renderDecided() : this.renderDecide();
    }

    renderDecide() {
        const { onSubmit, negativeLabel, positiveLabel } = this.props;

        return <Button.Group size='massive' fluid>
            <Button onClick={() => onSubmit(false)} className='brand-red-background'>
                <Icon name='thumbs down' />{negativeLabel}
            </Button>
            <Button.Or />
            <Button onClick={() => onSubmit(true)} className='brand-green-background'>
                <Icon name='thumbs up' />{positiveLabel}
            </Button>
        </Button.Group>;
    }

    renderDecided() {
        return <Header as='h1' icon textAlign='center'>
            {this.renderDecisionLabel()}
            <Header.Subheader className="change-decision-label">
                You can <a href='#' onClick={this.onChange}>change</a> your mind
            </Header.Subheader>
        </Header>;
    }

    renderDecisionLabel() {
        const { decision: { choice } } = this.props;
        return choice ?
            <div><Icon name='thumbs up' circular color='green' />You voted for Legit</div> :
            <div><Icon name='thumbs down' circular color='red' />You voted for Fraud</div>;
    }

    onChange(e) {
        e.preventDefault();
        const { onChange } = this.props;
        onChange();
    }
}

DecisionWidget.defaultProps = {
    negativeLabel: 'Vote for Fraud',
    positiveLabel: 'Vote for Legit',
};

DecisionWidget.propTypes = {
    decision: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    negativeLabel: PropTypes.string,
    positiveLabel: PropTypes.string,
};


export default DecisionWidget;
