import React from 'react';
import Button from 'react-bootstrap/es/Button';
import ButtonToolbar from 'react-bootstrap/es/ButtonToolbar';
import Dropdown from 'react-bootstrap/es/Dropdown';
import MenuItem from 'react-bootstrap/es/MenuItem';

class ContextDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
    };

    this.handleDropdownToggle = this.handleDropdownToggle.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleApplyClick = this.handleApplyClick.bind(this);
  }

  handleDropdownToggle(isOpen) {
    this.setState({ dropdownOpen: isOpen });
  }

  handleCancelClick(event) {
    event.preventDefault();

    this.setState({ dropdownOpen: false });

    console.log('TODO: restore filters');
  }

  handleApplyClick(event) {
    event.preventDefault();

    this.setState({ dropdownOpen: false });

    console.log('TODO: apply filters');
  }

  render() {
    const { dropdownOpen } =this.state;

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
            {this.props.children}
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

export default ContextDropdown;
