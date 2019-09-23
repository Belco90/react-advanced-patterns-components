import React from 'react';
import PropTypes from 'prop-types';
import Radio from 'react-bootstrap/es/Radio';

import { useRadioGroupContext } from './radio-group-context';

const propTypes = {
  value: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

const defaultProps = {
  className: null,
};

const RadioGroupChoice = ({ children, value }) => {
  const context = useRadioGroupContext();
  const { selectedValue, ...remainingContext } = context;

  const checked = value === selectedValue;

  return (
    <Radio {...remainingContext} key={value} checked={checked} value={value}>
      {children}
    </Radio>
  );
};

RadioGroupChoice.propTypes = propTypes;
RadioGroupChoice.defaultProps = defaultProps;

export default RadioGroupChoice;
