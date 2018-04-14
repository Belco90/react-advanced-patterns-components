import React from 'react';
import Button from 'react-bootstrap/es/Button';
import ButtonToolbar from 'react-bootstrap/es/ButtonToolbar';
import Dropdown from 'react-bootstrap/es/Dropdown';
import MenuItem from 'react-bootstrap/es/MenuItem';

class ContextDropdown extends React.Component {
  render() {
    return (
      <Dropdown id={this.props.id} className="ContextDropdown">
        <Dropdown.Toggle>
          {this.props.title}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <div className="ContextDropdown-children">
            {this.props.children}
          </div>

          <MenuItem divider />

          <ButtonToolbar className="ContextDropdown-buttons">
            <Button bsSize="small" bsStyle="link">Cancel</Button>
            <Button bsSize="small" bsStyle="default">Apply</Button>
          </ButtonToolbar>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default ContextDropdown;
