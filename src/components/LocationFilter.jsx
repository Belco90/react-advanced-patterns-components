import React from 'react';
import ControlLabel from 'react-bootstrap/es/ControlLabel';
import FormControl from 'react-bootstrap/es/FormControl';
import FormGroup from 'react-bootstrap/es/FormGroup';

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
          value={this.props.value}
          onChange={this.handleInputChange}
        />
      </FormGroup>
    );
  }
}

export default LocationFilter;
