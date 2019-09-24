import React from 'react';
import PropTypes from 'prop-types';

import RadioGroupChoice from 'components/RadioGroupUsingHooks/RadioGroupChoice';
import { useRadioGroupContext } from 'contexts/radio-group-context';
import RadioPickerGroupIfChecked from './RadioPickerGroupIfChecked';

const propTypes = {
  value: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  emphasis: PropTypes.oneOf(['default', 'success', 'danger']),
  hideIndicator: PropTypes.bool,
};

const defaultProps = {
  emphasis: 'default',
  hideIndicator: false,
  className: null,
};

const isIfCheckedComponent = child =>
  React.isValidElement(child) && child.type === RadioPickerGroupIfChecked;

const RadioPickerGroupChoice = ({
  children,
  hideIndicator,
  emphasis,
  ...remainingProps
}) => {
  // TODO: style it properly with hideIndicator and emphasis
  const context = useRadioGroupContext();
  const { selectedValue } = context;

  const checked = remainingProps.value === selectedValue;

  return (
    <RadioGroupChoice {...remainingProps}>
      {/* Inject `checked` prop only to IfChecked children */}
      {React.Children.map(children, child =>
        isIfCheckedComponent(child)
          ? React.cloneElement(child, { checked })
          : child
      )}
    </RadioGroupChoice>
  );
};

RadioPickerGroupChoice.propTypes = propTypes;
RadioPickerGroupChoice.defaultProps = defaultProps;

export default RadioPickerGroupChoice;
