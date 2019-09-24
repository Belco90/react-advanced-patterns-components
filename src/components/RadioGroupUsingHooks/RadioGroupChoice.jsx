import React from 'react';
import PropTypes from 'prop-types';
import { Radio } from 'react-bootstrap';

import { useRadioGroupContext } from 'contexts/radio-group-context';

const propTypes = {
  value: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

const defaultProps = {
  className: null,
};

const RadioGroupChoice = ({ children, value, className }) => {
  const context = useRadioGroupContext();
  const { selectedValue, onChange, name, inline, disabled } = context;

  const checked = value === selectedValue;

  return (
    <Radio
      key={value}
      checked={checked}
      name={name}
      value={value}
      onChange={onChange}
      inline={inline}
      disabled={disabled}
      className={className}
    >
      {children}
    </Radio>
  );
};

RadioGroupChoice.propTypes = propTypes;
RadioGroupChoice.defaultProps = defaultProps;

export default RadioGroupChoice;
