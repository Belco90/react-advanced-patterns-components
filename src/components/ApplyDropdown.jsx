import React from 'react';
import Button from 'react-bootstrap/es/Button';
import ButtonToolbar from 'react-bootstrap/es/ButtonToolbar';
import Dropdown from 'react-bootstrap/es/Dropdown';
import MenuItem from 'react-bootstrap/es/MenuItem';
import FilterItem from './FilterItem';

const DropdownMenuContext = React.createContext();

const withDropdownContext = Component => props => (
  <DropdownMenuContext.Consumer>
    {({ getComponentRef }) => (
      <Component {...props} getComponentRef={getComponentRef} />
    )}
  </DropdownMenuContext.Consumer>
);


class ApplyDropdown extends React.Component {
  static FilterItem = withDropdownContext(FilterItem);

  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
    };

    this.handleRef = this.handleRef.bind(this);
    this.handleDropdownToggle = this.handleDropdownToggle.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleApplyClick = this.handleApplyClick.bind(this);

    // keep refs to FilterItem children
    this.childrenFilters = [];

    this.filterContext = {
      getComponentRef: this.handleRef
    };
  }

  handleRef(filter) {
    this.childrenFilters.push(filter);
  }

  handleDropdownToggle(isOpen) {
    this.setState({ dropdownOpen: isOpen });

    this.childrenFilters.forEach(filter => {
      filter.restoreFilter();
    });
  }

  handleCancelClick(event) {
    event.preventDefault();

    this.setState({ dropdownOpen: false });

    this.childrenFilters.forEach(filter => {
      filter.restoreFilter();
    });
  }

  handleApplyClick(event) {
    event.preventDefault();

    this.setState({ dropdownOpen: false });

    this.childrenFilters.forEach(filter => {
      filter.applyFilter();
    });
  }

  render() {
    const { dropdownOpen } = this.state;

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
            <Button bsSize="small" bsStyle="default" onClick={this.handleApplyClick}>Apply</Button>
          </ButtonToolbar>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default ApplyDropdown;
