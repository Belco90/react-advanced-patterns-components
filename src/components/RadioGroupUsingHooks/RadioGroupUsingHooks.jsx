import React from 'react';
import PropTypes from 'prop-types';

import { RadioGroupProvider } from 'contexts/radio-group-context';
import RadioGroupChoice from './RadioGroupChoice';

const propTypes = {
  selectedValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  inline: PropTypes.bool,
  disabled: PropTypes.bool,
};

const defaultProps = {
  inline: false,
  disabled: false,
};

const RadioGroupUsingHooks = ({
  children,
  selectedValue,
  onChange,
  name,
  inline,
  disabled,
  ...remainingProps
}) => (
  <RadioGroupProvider
    selectedValue={selectedValue}
    onChange={onChange}
    name={name}
    inline={inline}
    disabled={disabled}
    {...remainingProps}
  >
    <fieldset>{children}</fieldset>
  </RadioGroupProvider>
);

RadioGroupUsingHooks.propTypes = propTypes;
RadioGroupUsingHooks.defaultProps = defaultProps;

RadioGroupUsingHooks.Choice = RadioGroupChoice;

export default RadioGroupUsingHooks;
