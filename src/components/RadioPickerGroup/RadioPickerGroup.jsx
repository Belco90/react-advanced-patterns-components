import React from 'react';
import PropTypes from 'prop-types';

import RadioGroupUsingHooks from 'components/RadioGroupUsingHooks';
import RadioPickerGroupChoice from './RadioPickerGroupChoice';
import RadioPickerGroupIfChecked from './RadioPickerGroupIfChecked';

const propTypes = {
  selectedValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  inline: PropTypes.bool,
  disabled: PropTypes.bool,
  emphasis: PropTypes.oneOf(['default', 'success', 'danger']),
  hideIndicator: PropTypes.bool,
};

const defaultProps = {
  emphasis: 'default',
  hideIndicator: false,
};

const RadioPickerGroup = props => <RadioGroupUsingHooks {...props} />;

RadioPickerGroup.propTypes = propTypes;
RadioPickerGroup.defaultProps = defaultProps;

RadioPickerGroup.Choice = RadioPickerGroupChoice;
RadioPickerGroup.IfChecked = RadioPickerGroupIfChecked;

export default RadioPickerGroup;
