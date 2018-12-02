import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

const UrlFieldEx = ({ className, source, transform, record = {}, ...rest }) => (
  <a
    className={className}
    href={get(record, source)}
    {...rest}
  >
    {transform ? transform(get(record, source)) : get(record, source)}
  </a>
);

UrlFieldEx.propTypes = {
  addLabel: PropTypes.bool,
  basePath: PropTypes.string,
  className: PropTypes.string,
  cellClassName: PropTypes.string,
  headerClassName: PropTypes.string,
  label: PropTypes.string,
  record: PropTypes.object,
  sortBy: PropTypes.string,
  source: PropTypes.string.isRequired,
};

UrlFieldEx.defaultProps = {
  addLabel: true,
};

export default UrlFieldEx;
