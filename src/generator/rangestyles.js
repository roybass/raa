import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

function createStylesFromRanges(ranges) {
  if (!ranges) {
    return;
  }
  const result = {};
  for (let i = 0; i < ranges.length; i++) {
    result['range_' + i] = ranges[i].style;
  }
  return result;
}

function isInRange(range, value) {
  if (!range) {
    return false;
  }

  if (range.hasOwnProperty('value')) {
    const regex = new RegExp(range.value);
    return regex.test(value);
  }

  if (range.hasOwnProperty('values') && range.values.length > 0) {
    for (let str of range.values) {
      const regex = new RegExp(range.value);
      if (regex.test(value)) {
        return true;
      }
    }
    return false;
  }

  if (range.hasOwnProperty('range') && range.range.length === 2) {
    const min = range.range[0];
    const max = range.range[1];
    if (min !== null && value <= min) {
      return false;
    }
    if (max !== null && value > max) {
      return false;
    }
    return true;
  }
  return false;
}

function generateClassSelector(classes, ranges, value) {
  const selector = {};
  for (let i = 0; i < ranges.length; i++) {
    const classname = "range_" + i;
    selector[classes[classname]] = isInRange(ranges[i], value);
  }
  return selector;
}

function withRangeStyles(ranges) {
  if (!ranges) {
    return (WrappedComponent => WrappedComponent); // When no styles provided, provide an identify function. (No change in the original Component
  }
  return ((WrappedComponent) => {
    const styles = createStylesFromRanges(ranges);
    const wrapper = withStyles(styles)(
      ({ classes, ...props }) => (
        <WrappedComponent
          className={classnames(generateClassSelector(classes, ranges, props.record[props.source]))}
          {...props}
        />
      ));
    wrapper.defaultProps = WrappedComponent.defaultProps;
    return wrapper;
  });
}

export default withRangeStyles;
