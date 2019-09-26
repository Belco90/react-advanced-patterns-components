import React from 'react';
import { Dropdown, MenuItem, ButtonToolbar, Button } from 'react-bootstrap';

import EditableItem from './EditableItem';
import {
  withDropdownContext,
  DropdownProvider,
} from 'contexts/dropdown-context';

import styles from 'components/ActionableDropdown.module.css';

class ActionableDropdownUsingChildrenRefs extends React.Component {
  state = {
    dropdownOpen: false,
    pendingToApply: false,
  };

  constructor(props) {
    super(props);

    // keep refs to each EditableItem child
    this.editableChildren = [];

    this.editableItemContext = {
      getComponentRef: this.handleRef,
      onChange: this.handleEditableItemChange,
    };
  }

  handleRef = editableItem => {
    this.editableChildren.push(editableItem);
  };

  handleDropdownToggle = (isOpen, event) => {
    if (typeof event !== 'undefined') {
      const { dropdownOpen } = this.state;
      const newState = { dropdownOpen: isOpen };

      // if toggling, always restore:
      // - it has to restore on close as action is cancelled
      // - it has to restore on open in case editable items were updated from
      //   outside while the dropdown was closed so it gets most recent values
      if (isOpen !== dropdownOpen) {
        this.editableChildren.forEach(editableItem => {
          editableItem.restoreValue();
        });
        newState.pendingToApply = false;
      }

      this.setState(newState);
    }
  };

  handleCancelClick = event => {
    event.preventDefault();

    this.setState({
      dropdownOpen: false,
      pendingToApply: false,
    });

    this.editableChildren.forEach(editableItem => {
      editableItem.restoreValue();
    });
  };

  handleApplyClick = event => {
    event.preventDefault();

    this.setState({
      dropdownOpen: false,
      pendingToApply: false,
    });

    this.editableChildren.forEach(editableItem => {
      editableItem.applyValue();
    });
  };

  handleEditableItemChange = () => {
    const changed = this.editableChildren.some(editableItem =>
      editableItem.hasChanged()
    );

    this.setState({ pendingToApply: changed });
  };

  render() {
    const { dropdownOpen, pendingToApply } = this.state;

    return (
      <Dropdown
        id={this.props.id}
        open={dropdownOpen}
        onToggle={this.handleDropdownToggle}
      >
        <Dropdown.Toggle>{this.props.title}</Dropdown.Toggle>

        <Dropdown.Menu>
          <div className={styles.menu}>
            <DropdownProvider {...this.editableItemContext}>
              {this.props.children}
            </DropdownProvider>
          </div>

          <MenuItem divider />

          <ButtonToolbar className={styles.buttonToolbar}>
            <Button
              bsSize="small"
              bsStyle="link"
              onClick={this.handleCancelClick}
            >
              Cancel
            </Button>
            <Button
              bsSize="small"
              bsStyle={pendingToApply ? 'success' : 'default'}
              onClick={this.handleApplyClick}
              disabled={!pendingToApply}
            >
              Apply
            </Button>
          </ButtonToolbar>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

ActionableDropdownUsingChildrenRefs.EditableItem = withDropdownContext(
  EditableItem
);

export default ActionableDropdownUsingChildrenRefs;
