import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';

const propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  onApply: PropTypes.func.isRequired,
};

const EditableItem = ({ children, value, onChange, onApply }) => {
  const [modifiedValue, setModifiedValue] = React.useState(value);

  const handleValueChange = newValue => {
    setModifiedValue(newValue);
    onChange(newValue);
  };

  const restoreValue = () => {
    setModifiedValue(value);
  };

  const applyValue = () => {
    onApply(modifiedValue);
  };

  const hasChanged = () => !isEqual(modifiedValue, value);

  return React.Children.map(children, child =>
    React.cloneElement(child, {
      onChange: handleValueChange,
      value: modifiedValue,
    })
  );
};

EditableItem.propTypes = propTypes;

export default EditableItem;
