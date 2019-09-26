import React from 'react';
import { Dropdown, MenuItem, ButtonToolbar, Button } from 'react-bootstrap';

import EditableItem from './EditableItem';
import { withDropdownContext, DropdownProvider } from './dropdown-context';

import styles from 'components/ActionableDropdown.module.css';

const propTypes = {};

class ActionableDropdownUsingChildrenRefs extends React.Component {
  state = {
    dropdownOpen: false,
    filtersChanged: false,
  };

  constructor(props) {
    super(props);

    // keep refs to each EditableItem child
    this.childrenFilters = [];

    this.filterContext = {
      getComponentRef: this.handleRef,
      onChange: this.updateFiltersChanged,
    };
  }

  handleRef = filter => {
    this.childrenFilters.push(filter);
  };

  handleDropdownToggle = (isOpen, event) => {
    if (typeof event !== 'undefined') {
      const { dropdownOpen } = this.state;
      const newState = { dropdownOpen: isOpen };

      // if toggled, restore:
      // - it has to restore on close as action is cancelled
      // - it has to restore on open in case filters were updated from outside
      //   while the dropdown was closed so it gets most recent values
      if (isOpen !== dropdownOpen) {
        this.childrenFilters.forEach(filter => {
          filter.restoreFilter();
        });
        newState.filtersChanged = false;
      }

      this.setState(newState);
    }
  };

  handleCancelClick = event => {
    event.preventDefault();

    this.setState({
      dropdownOpen: false,
      filtersChanged: false,
    });

    this.childrenFilters.forEach(filter => {
      filter.restoreFilter();
    });
  };

  handleApplyClick = event => {
    event.preventDefault();

    this.setState({
      dropdownOpen: false,
      filtersChanged: false,
    });

    this.childrenFilters.forEach(filter => {
      filter.applyFilter();
    });
  };

  updateFiltersChanged = () => {
    const changed = this.childrenFilters.some(filter => filter.hasChanged());

    this.setState({ filtersChanged: changed });
  };

  render() {
    const { dropdownOpen, filtersChanged } = this.state;

    return (
      <Dropdown
        id={this.props.id}
        open={dropdownOpen}
        onToggle={this.handleDropdownToggle}
      >
        <Dropdown.Toggle>{this.props.title}</Dropdown.Toggle>

        <Dropdown.Menu>
          <div className={styles.menu}>
            <DropdownProvider {...this.filterContext}>
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
              bsStyle={filtersChanged ? 'success' : 'default'}
              onClick={this.handleApplyClick}
              disabled={!filtersChanged}
            >
              Apply
            </Button>
          </ButtonToolbar>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

ActionableDropdownUsingChildrenRefs.propTypes = propTypes;

ActionableDropdownUsingChildrenRefs.EditableItem = withDropdownContext(
  EditableItem
);

export default ActionableDropdownUsingChildrenRefs;
