import React from 'react';
import PropTypes from 'prop-types';

import { RadioGroupProvider } from 'contexts/radio-group-context';
import RadioGroupChoice from './RadioGroupChoice';
import RadioGroup from 'components/RadioGroup';

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

class RadioGroupUsingClassComponent extends React.Component {
  render() {
    const {
      children,
      selectedValue,
      onChange,
      name,
      inline,
      disabled,
      ...remainingProps
    } = this.props;
    return (
      <RadioGroupProvider
        selectedValue={selectedValue}
        onChange={onChange}
        name={name}
        inline={inline}
        disabled={disabled}
      >
        <fieldset {...remainingProps}>{children}</fieldset>
      </RadioGroupProvider>
    );
  }
}

RadioGroupUsingClassComponent.propTypes = propTypes;
RadioGroupUsingClassComponent.defaultProps = defaultProps;
RadioGroupUsingClassComponent.Choice = RadioGroupChoice;

export default RadioGroupUsingClassComponent;
