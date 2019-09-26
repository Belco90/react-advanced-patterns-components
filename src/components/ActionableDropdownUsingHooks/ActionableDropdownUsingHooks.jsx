import React from 'react';
import { Button, ButtonToolbar, Dropdown, MenuItem } from 'react-bootstrap';
import styles from 'components/ActionableDropdown.module.css';
import {
  withDropdownContext,
  DropdownProvider,
} from 'contexts/dropdown-context';

//import EditableItem from './EditableItem';
import EditableItem from 'components/ActionableDropdownUsingChildrenRefs/EditableItem';

const ActionableDropdownUsingHooks = ({ id, title, children }) => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [isPendingToApply, setIsPendingToApply] = React.useState(false);

  const { current: editableChildren } = React.useRef([]);

  const handleRef = React.useCallback(
    editableItem => {
      if (editableItem) {
        editableChildren.push(editableItem);
      }
    },
    [editableChildren]
  );

  const handleDropdownToggle = (newIsOpen, event) => {
    if (typeof event !== 'undefined') {
      // if toggling, always restore:
      // - it has to restore on close as action is cancelled
      // - it has to restore on open in case editable items were updated from
      //   outside while the dropdown was closed so it gets most recent values
      if (newIsOpen !== isDropdownOpen) {
        editableChildren.forEach(editableItem => {
          editableItem.restoreValue();
        });
        setIsPendingToApply(false);
      }
      setIsDropdownOpen(newIsOpen);
    }
  };

  const handleCancelClick = event => {
    event.preventDefault();
    setIsPendingToApply(false);
    setIsDropdownOpen(false);

    editableChildren.forEach(editableItem => {
      editableItem.restoreValue();
    });
  };

  const handleApplyClick = event => {
    event.preventDefault();
    setIsPendingToApply(false);
    setIsDropdownOpen(false);

    editableChildren.forEach(editableItem => {
      editableItem.applyValue();
    });
  };

  const handleEditableItemChange = () => {
    const isDifferentFromInitial = editableChildren.some(editableItem =>
      editableItem.hasChanged()
    );

    setIsPendingToApply(isDifferentFromInitial);
  };

  return (
    <Dropdown id={id} open={isDropdownOpen} onToggle={handleDropdownToggle}>
      <Dropdown.Toggle>{title}</Dropdown.Toggle>

      <Dropdown.Menu>
        <div className={styles.menu}>
          <DropdownProvider
            getComponentRef={handleRef}
            onChange={handleEditableItemChange}
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

ActionableDropdownUsingHooks.EditableItem = withDropdownContext(EditableItem);

export default ActionableDropdownUsingHooks;
