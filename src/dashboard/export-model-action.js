import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { showNotification } from 'react-admin';
import fileDownload from 'react-file-download';
import { push } from 'react-router-redux';
import mustache from 'mustache';
import localDB from '../api/localdb';

const template = `
  <!doctype html>
  <html lang="en">
  <head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
  <meta name="theme-color" content="#000000">
  <link rel="shortcut icon" href="http://static-test.outbrain.com/raa/favicon.ico">
  <title>{{{title}}}</title>
  <link href="http://static-test.outbrain.com/raa/static/css/main.css" rel="stylesheet">
  </head>
  <body>
  <noscript>You need to enable JavaScript to run this app.</noscript>
<div id="root"></div>
<script>
  window.raHide = true;
  window.raTitle = '{{{title}}}' // You can change this title.
  window.raModelUrl = undefined; // Place a URL here to read the model from.
  window.raModel = {{{model}}} ;
</script>
<script type="text/javascript" src="http://static-test.outbrain.com/raa/static/js/main.js"></script>
</body>
</html>
`;


class ExportAppButton extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  handleClick = () => {
    this.props.showNotification('Exporting ' + this.props.resource);
    const view = {model: JSON.stringify(localDB.getList(this.props.resource), null, 2), title: 'Management App'};
    fileDownload(mustache.render(template, view), this.props.resource + '.html');
  };

  render() {
    return <Button onClick={this.handleClick}>Export App File</Button>;
  }
}

ExportAppButton.propTypes = {
  push: PropTypes.func,
  record: PropTypes.object,
  showNotification: PropTypes.func,
};

export default connect(null, {
  showNotification,
  push,
})(ExportAppButton);
