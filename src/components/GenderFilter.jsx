import React from 'react';
import ControlLabel from 'react-bootstrap/es/ControlLabel';
import FormControl from 'react-bootstrap/es/FormControl';
import FormGroup from 'react-bootstrap/es/FormGroup';

class GenderFilter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.appliedValue,
    };

    this.handleOptionSelected = this.handleOptionSelected.bind(this);
  }

  handleOptionSelected(event) {
    this.setState({ value: event.target.value });
  }

  applyFilter() {
    this.props.setFilter(this.state.value);
  }

  restoreFilter() {
    this.setState({ value: this.props.appliedValue });
  }

  render() {
    const { value } = this.state;

    return (
      <FormGroup controlId="GenderFilterSelect">
        <ControlLabel>Content</ControlLabel>
        <FormControl componentClass="select" value={value}>
          <option value="" onClick={this.handleOptionSelected}>All</option>
          <option value="female" onClick={this.handleOptionSelected}>Female</option>
          <option value="male" onClick={this.handleOptionSelected}>Male</option>
        </FormControl>
      </FormGroup>
    );
  }
}

export default GenderFilter;
