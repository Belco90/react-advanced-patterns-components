import React from 'react';
import {
  ControlLabel,
  FormControl,
  FormGroup,
  Col,
  Row,
} from 'react-bootstrap';

class AgeFilter extends React.Component {
  handleInputChange = event => {
    const { name, value } = event.target;
    let newValue;

    switch (name) {
      case 'min':
        newValue = [value, this.props.value[1]];
        break;

      case 'max':
        newValue = [this.props.value[0], value];
        break;

      default:
        newValue = this.props.value;
        break;
    }

    this.props.onChange(newValue);
  };

  render() {
    return (
      <FormGroup controlId="AgeFilterSelect">
        <ControlLabel>Age</ControlLabel>
        <Row>
          <Col xs={6}>
            <FormControl
              type="number"
              value={this.props.value[0]}
              name="min"
              onChange={this.handleInputChange}
              placeholder="min"
            />
          </Col>

          <Col xs={6}>
            <FormControl
              type="number"
              value={this.props.value[1]}
              name="max"
              onChange={this.handleInputChange}
              placeholder="max"
            />
          </Col>
        </Row>
      </FormGroup>
    );
  }
}

export default AgeFilter;
