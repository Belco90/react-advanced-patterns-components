import React from 'react';
import PropTypes from 'prop-types';
import { useDropdownContext } from 'contexts/dropdown-context';

const propTypes = {
  children: PropTypes.node.isRequired,
  itemKey: PropTypes.string.isRequired,
};

const EditableItem = ({ children, itemKey }) => {
  const { values, onChange } = useDropdownContext();

  const handleValueChange = newValue => {
    onChange(itemKey, newValue);
  };

  return React.Children.map(children, child =>
    React.cloneElement(child, {
      onChange: handleValueChange,
      value: values[itemKey],
    })
  );
};

EditableItem.propTypes = propTypes;

export default EditableItem;
