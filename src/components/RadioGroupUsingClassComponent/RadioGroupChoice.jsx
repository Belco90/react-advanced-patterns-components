import React from 'react';
import PropTypes from 'prop-types';
import { Radio } from 'react-bootstrap';

import { RadioGroupConsumer } from 'contexts/radio-group-context';

const propTypes = {
  value: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

const defaultProps = {
  className: null,
};

const RadioGroupChoice = ({ children, value }) => (
  <RadioGroupConsumer>
    {context => {
      const { selectedValue, ...remainingContext } = context;

      const checked = value === selectedValue;

      return (
        <Radio
          {...remainingContext}
          key={value}
          checked={checked}
          value={value}
        >
          {children}
        </Radio>
      );
    }}
  </RadioGroupConsumer>
);

RadioGroupChoice.propTypes = propTypes;
RadioGroupChoice.defaultProps = defaultProps;

export default RadioGroupChoice;
