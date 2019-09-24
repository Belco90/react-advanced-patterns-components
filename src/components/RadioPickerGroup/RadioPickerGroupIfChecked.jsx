import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  checked: PropTypes.bool,
  children: PropTypes.node,
};

const defaultProps = {
  checked: false,
  children: null,
};

const RadioPickerGroupIfChecked = ({ checked, children }) =>
  checked ? children : null;

RadioPickerGroupIfChecked.propTypes = propTypes;
RadioPickerGroupIfChecked.defaultProps = defaultProps;

export default RadioPickerGroupIfChecked;
