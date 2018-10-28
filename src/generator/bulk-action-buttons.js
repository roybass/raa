import React, { Component, Fragment } from 'react';
import { BulkDeleteButton } from 'react-admin';
import ActionButton from '../component/action-button';

class BulkActionButtons extends Component {

  render() {
    console.log('props=', this.props);
    return (
      <Fragment>
        {this.props.actions.map((actionDef) => React.createElement(ActionButton, {
          action: actionDef,
          ids: this.props.selectedIds,
          key: "_action_" + actionDef.title
        }))}
        <BulkDeleteButton {...this.props} />
      </Fragment>
    );
  }
}

function generateBulkActionButtons(listDef) {
  return React.createElement(BulkActionButtons, { actions: listDef.actions });
}

export default generateBulkActionButtons;
