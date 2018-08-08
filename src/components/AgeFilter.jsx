import React from 'react';
import ControlLabel from 'react-bootstrap/es/ControlLabel';
import FormControl from 'react-bootstrap/es/FormControl';
import FormGroup from 'react-bootstrap/es/FormGroup';
import Col from 'react-bootstrap/es/Col';
import Row from 'react-bootstrap/es/Row';

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
          <Col xs={5}>
            <FormControl
              type="number"
              value={this.props.value[0]}
              name="min"
              onChange={this.handleInputChange}
            />
          </Col>

          <Col xs={2}>
            <FormControl.Static>To</FormControl.Static>
          </Col>

          <Col xs={5}>
            <FormControl
              type="number"
              value={this.props.value[1]}
              name="max"
              onChange={this.handleInputChange}
            />
          </Col>
        </Row>
      </FormGroup>
    );
  }
}

export default AgeFilter;
