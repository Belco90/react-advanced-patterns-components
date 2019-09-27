import React from 'react';
import { Button, ButtonToolbar, Dropdown, MenuItem } from 'react-bootstrap';
import isEqual from 'lodash.isequal';

import { DropdownProvider } from 'contexts/dropdown-context';
import styles from 'components/ActionableDropdown.module.css';

import EditableItem from './EditableItem';

const ActionableDropdownUsingStateInitializers = ({
  id,
  title,
  children,
  values: appliedValues,
  onApply,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [isPendingToApply, setIsPendingToApply] = React.useState(false);
  const [draftValues, setDraftValues] = React.useState(appliedValues);

  // re-init every time applied values are updated from outside
  // (state initializer)
  React.useEffect(() => {
    setDraftValues(appliedValues);
    setIsPendingToApply(false);
  }, [appliedValues]);

  const handleDropdownToggle = (newIsOpen, event) => {
    if (typeof event !== 'undefined') {
      // it still have to reset when closing modal
      if (!newIsOpen) {
        setDraftValues(appliedValues);
        setIsPendingToApply(false);
      }
      setIsDropdownOpen(newIsOpen);
    }
  };

  const handleCancelClick = event => {
    event.preventDefault();
    setDraftValues(appliedValues);
    setIsPendingToApply(false);
    setIsDropdownOpen(false);
  };

  const handleApplyClick = event => {
    event.preventDefault();
    onApply(draftValues);
    setIsPendingToApply(false);
    setIsDropdownOpen(false);
  };

  const handleEditableItemChange = (itemKey, newValue) => {
    const newDraftValues = {
      ...draftValues,
      [itemKey]: newValue,
    };

    setDraftValues(newDraftValues);
    setIsPendingToApply(!isEqual(appliedValues, newDraftValues));
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

ActionableDropdownUsingStateInitializers.EditableItem = EditableItem;

export default ActionableDropdownUsingStateInitializers;
