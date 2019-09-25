import React from 'react';
import { Checkbox, FormGroup } from 'react-bootstrap';

class StarsFilter extends React.PureComponent {
  handleCheckboxChange = event => {
    this.props.onChange(event.target.checked);
  };

  render() {
    return (
      <FormGroup controlId="StarsFilterSelect">
        <Checkbox
          checked={this.props.value}
          name="starred"
          onChange={this.handleCheckboxChange}
        >
          Only starred
        </Checkbox>
      </FormGroup>
    );
  }
}

export default StarsFilter;
