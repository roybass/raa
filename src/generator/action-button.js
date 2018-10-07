import React from 'react';
import { Button } from 'react-admin';
import * as icons from '@material-ui/icons';
import endpointRunner from '../api/endpoint-runner';

const ActionButton = ({
                        record = {},
                        endpoint,
                        icon,
                        title,
                        ...rest
                      }) => (
  <Button onClick={() => {
    if (endpoint) {
      endpointRunner.run(endpoint, record);
    }
  }}>
    {React.createElement(icons[icon])} {title}
  </Button>
);

function generateActionButton(actionDef) {
  return (<ActionButton {...actionDef} />);
}

export default generateActionButton;
