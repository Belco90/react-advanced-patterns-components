import React from 'react';
import { ControlLabel, FormControl, FormGroup } from 'react-bootstrap';

class LocationFilter extends React.PureComponent {
  handleInputChange = event => {
    this.props.onChange(event.target.value);
  };

  render() {
    return (
      <FormGroup controlId="LocationFilterSelect">
        <ControlLabel>Location</ControlLabel>
        <FormControl
          type="text"
          name="location"
          value={this.props.value}
          onChange={this.handleInputChange}
        />
      </FormGroup>
    );
  }
}

export default LocationFilter;
