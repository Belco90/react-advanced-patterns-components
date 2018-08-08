import React from 'react';
import FormGroup from 'react-bootstrap/es/FormGroup';
import Checkbox from 'react-bootstrap/es/Checkbox';

class StarsFilter extends React.PureComponent {

  handleCheckboxChange = event => {
    this.props.onChange(event.target.checked);
  };

  render() {
    return (
      <FormGroup controlId="StarsFilterSelect">
        <Checkbox
          checked={this.props.value}
          onChange={this.handleCheckboxChange}
        >
          Only starred
        </Checkbox>
      </FormGroup>
    );
  }
}

export default StarsFilter;
