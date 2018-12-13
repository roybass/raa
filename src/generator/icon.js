import React from 'react';
import * as icons from '@material-ui/icons';

function generateIcon(name, props) {
  if (!name) {
    return (<span/>);
  }
  if (!icons[name]) {
    return (<span/>);
  }
  return React.createElement(icons[name], props);
}


export default generateIcon;
