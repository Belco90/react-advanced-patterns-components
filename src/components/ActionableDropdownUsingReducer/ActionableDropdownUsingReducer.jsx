import React from 'react';
import { Button, ButtonToolbar, Dropdown, MenuItem } from 'react-bootstrap';

import { DropdownProvider } from 'contexts/dropdown-context';
import styles from 'components/ActionableDropdown.module.css';

import EditableItem from './EditableItem';
import useActionableDropdown from './useActionableDropdown';

const ActionableDropdownUsingReducer = ({
  id,
  title,
  children,
  values: appliedValues,
  onApply,
}) => {
  // hook using reducer
  const [state, actions] = useActionableDropdown(appliedValues);

  const {
    values: draftValues,
    isOpen: isDropdownOpen,
    isPending: isPendingToApply,
  } = state;

  const { openDropdown, closeDropdown, setValues, applyValues } = actions;

  const handleDropdownToggle = (newIsOpen, event) => {
    if (typeof event !== 'undefined') {
      newIsOpen ? openDropdown() : closeDropdown();
    }
  };

  const handleCancelClick = event => {
    event.preventDefault();
    closeDropdown();
  };

  const handleApplyClick = event => {
    event.preventDefault();
    onApply(draftValues);
    applyValues();
  };

  const handleEditableItemChange = (itemKey, newValue) => {
    const newDraftValues = {
      ...draftValues,
      [itemKey]: newValue,
    };

    setValues(newDraftValues);
  };

  return (
    <Dropdown id={id} open={isDropdownOpen} onToggle={handleDropdownToggle}>
      <Dropdown.Toggle>{title}</Dropdown.Toggle>

      <Dropdown.Menu>
        <div className={styles.menu}>
          <DropdownProvider
            onChange={handleEditableItemChange}
            values={draftValues}
          >
            {children}
          </DropdownProvider>
        </div>

        <MenuItem divider />

        <ButtonToolbar className={styles.buttonToolbar}>
          <Button bsSize="small" bsStyle="link" onClick={handleCancelClick}>
            Cancel
          </Button>
          <Button
            bsSize="small"
            bsStyle={isPendingToApply ? 'success' : 'default'}
            onClick={handleApplyClick}
            disabled={!isPendingToApply}
          >
            Apply
          </Button>
        </ButtonToolbar>
      </Dropdown.Menu>
    </Dropdown>
  );
};

ActionableDropdownUsingReducer.EditableItem = EditableItem;

export default ActionableDropdownUsingReducer;
