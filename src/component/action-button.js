import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { isSubmitting, submit } from 'redux-form';
import { Button, fetchEnd, fetchStart, showNotification, SimpleForm } from 'react-admin';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import IconCancel from '@material-ui/icons/Cancel';
import generateIcon from '../generator/icon';
import endpointRunner from '../api/endpoint-runner';
import generateInput from '../generator/input';
import mustache from 'mustache';

const FORM_NAME = 'action-form';

class ActionButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      showDialog: false
    };
  }

  handleClick = () => {
    if (this.props.action.confirm || this.props.action.inputs) {
      this.setState({ showDialog: true });
    } else {
      this.runAction();
    }
  };

  handleCloseClick = () => {
    this.setState({ showDialog: false });
  };

  handleSaveClick = () => {
    const { submit } = this.props;

    // Trigger a submit of our custom quick create form
    // This is needed because our modal action buttons are oustide the form
    submit(FORM_NAME);
  };

  runAction = () => {
    const { showNotification } = this.props;
    const { endpoint } = this.props.action;
    if (endpoint) {
      const ids = this.props.ids || [this.props.record.id];
      endpointRunner.run(endpoint, { ids })
        .then((response) => {
          response.text().then(text => {
            showNotification(response.status + ' ' + response.statusText + ' - ' + text);
          });
        });
    }
    this.setState({ isOpen: false });
  };


  handleSubmit = values => {
    const { fetchStart, fetchEnd, showNotification, action } = this.props;

    // Dispatch an action letting react-admin know a API call is ongoing
    fetchStart();

    if (action.endpoint) {
      const ids = this.props.ids || [this.props.record.id];
      endpointRunner.run(action.endpoint, { ids, body: JSON.stringify(values) })
        .then((response) => {
          response.text().then(text => {
            showNotification(response.status + ' ' + response.statusText + ' - ' + text);
          });
        })
        .catch(error => {
          showNotification(error.message, 'error');
        })
        .finally(() => {
          // Dispatch an action letting react-admin know a API call has ended
          this.setState({ showDialog: false });
          fetchEnd();
        });
    }
  };


  render() {
    const { showDialog } = this.state;
    const { action } = this.props;


    return (
      <Fragment>

        <Button label={action.title} onClick={this.handleClick}>
          {generateIcon(action.icon)}
        </Button>

        <Dialog
          fullWidth
          open={showDialog}
          onClose={this.handleCloseClick}
          aria-label={"Confirm " + action.title}
        >
          <DialogTitle>{"Confirm " + action.title}</DialogTitle>
          <DialogContent>
            {mustache.render(action.confirm || '', this.props)}
            <SimpleForm
              // We override the redux-form name to avoid collision with the react-admin main form
              form={FORM_NAME}
              // We override the redux-form onSubmit prop to handle the submission ourselves
              onSubmit={this.handleSubmit}
              // We want no toolbar at all as we have our modal actions
              toolbar={null}>

              {action.inputs ? action.inputs.map(generateInput) : null}
            </SimpleForm>
          </DialogContent>
          <DialogActions>
            <Button label="Confirm" onClick={this.handleSaveClick}>
              {generateIcon(action.icon)}
            </Button>
            <Button label="ra.action.cancel" onClick={this.handleCloseClick}>
              <IconCancel />
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isSubmitting: isSubmitting(FORM_NAME)(state)
});

const mapDispatchToProps = {
  fetchEnd,
  fetchStart,
  showNotification,
  submit
};

export default connect(mapStateToProps, mapDispatchToProps)(
  ActionButton
);
