import React from 'react';
import Button from 'react-bootstrap/es/Button';
import ButtonToolbar from 'react-bootstrap/es/ButtonToolbar';
import Dropdown from 'react-bootstrap/es/Dropdown';
import MenuItem from 'react-bootstrap/es/MenuItem';
import FilterItem from './FilterItem';

const DropdownMenuContext = React.createContext();

export const withDropdownContext = Component => props => (
  <DropdownMenuContext.Consumer>
    {({ getComponentRef, onChange }) => (
      <Component
        {...props}
        ref={getComponentRef}
        onChange={onChange}
      />
    )}
  </DropdownMenuContext.Consumer>
);

class ApplyDropdown extends React.Component {

  state = {
    dropdownOpen: false,
    filtersChanged: false,
  };

  constructor(props) {
    super(props);

    // keep refs to FilterItem children
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
      const newState = { dropdownOpen: isOpen };

      if (isOpen) {
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
        className="ContextDropdown"
        open={dropdownOpen}
        onToggle={this.handleDropdownToggle}
      >
        <Dropdown.Toggle>
          {this.props.title}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <div className="ContextDropdown-children">
            <DropdownMenuContext.Provider value={this.filterContext}>
              {this.props.children}
            </DropdownMenuContext.Provider>
          </div>

          <MenuItem divider />

          <ButtonToolbar className="ContextDropdown-buttons">
            <Button bsSize="small" bsStyle="link" onClick={this.handleCancelClick}>Cancel</Button>
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

ApplyDropdown.FilterItem = withDropdownContext(FilterItem);

export default ApplyDropdown;
