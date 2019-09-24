import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import RadioGroupChoice from 'components/RadioGroupUsingHooks/RadioGroupChoice';
import { useRadioGroupContext } from 'contexts/radio-group-context';

import RadioPickerGroupIfChecked from './RadioPickerGroupIfChecked';
import styles from './RadioPickerGroupChoice.module.css';

const propTypes = {
  value: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

const defaultProps = {
  emphasis: 'default',
  hideIndicator: false,
  className: null,
};

const isIfCheckedComponent = child =>
  React.isValidElement(child) && child.type === RadioPickerGroupIfChecked;

const RadioPickerGroupChoice = ({ children, className, ...remainingProps }) => {
  const context = useRadioGroupContext();
  const { selectedValue, emphasis, hideIndicator } = context;

  const checked = remainingProps.value === selectedValue;

  const mergedClassName = cn(className, styles.root, {
    [styles.checked]: checked,
    [styles.hideIndicator]: hideIndicator,
    [styles[emphasis]]: emphasis !== 'default',
  });

  return (
    <RadioGroupChoice {...remainingProps} className={mergedClassName}>
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
