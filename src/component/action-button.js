import React, { Component, Fragment } from 'react';
import { Button, Confirm, showNotification } from 'react-admin';
import * as icons from '@material-ui/icons';
import mustache from 'mustache';
import endpointRunner from '../api/endpoint-runner';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ActionButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  handleClick = () => {
    if (this.props.action.confirm) {
      this.setState({ isOpen: true });
    } else {
      this.runAction();
    }
  };

  handleDialogClose = () => {
    this.setState({ isOpen: false });
  };


  runAction = () => {
    const { showNotification } = this.props;
    const { endpoint } = this.props.action;
    if (endpoint) {
      endpointRunner.run(endpoint, { ids: this.props.ids })
        .then((response) => {
          response.text().then(text => {
            showNotification(response.status + ' ' + response.statusText + ' - ' + text);
          });
        });
    }
    this.setState({ isOpen: false });
  };

  render() {
    const { title, icon, confirm } = this.props.action;
    return (
      <Fragment>

        <Button label={title} onClick={this.handleClick}>
          {React.createElement(icons[icon])}
        </Button>

        <Confirm
          isOpen={this.state.isOpen}
          title={"Confirm " + title}
          content={mustache.render(confirm, this.props)}
          onConfirm={this.runAction}
          onClose={this.handleDialogClose}
        />
      </Fragment>

    );
  }
}

ActionButton.propTypes = {
  showNotification: PropTypes.func
};

export default connect(null, { showNotification })(ActionButton);
