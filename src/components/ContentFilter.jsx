import React from 'react';
import ControlLabel from 'react-bootstrap/es/ControlLabel';
import FormControl from 'react-bootstrap/es/FormControl';
import FormGroup from 'react-bootstrap/es/FormGroup';

class ContentFilter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.appliedValue,
    };

    this.handleOptionSelected = this.handleOptionSelected.bind(this);
  }

  handleOptionSelected(event) {
    this.setState({ value: event.target.value }, this.props.onChange);
  }

  applyFilter() {
    this.props.setFilter(this.state.value);
  }

  restoreFilter() {
    this.setState({ value: this.props.appliedValue });
  }

  hasChanged() {
    return this.state.value !== this.props.appliedValue;
  }

  render() {
    const { value } = this.state;

    return (
      <FormGroup controlId="ContentFilterSelect">
        <ControlLabel>Content</ControlLabel>
        <FormControl componentClass="select" value={value}>
          <option value="" onClick={this.handleOptionSelected}>All</option>
          <option value="image" onClick={this.handleOptionSelected}>Image</option>
          <option value="video" onClick={this.handleOptionSelected}>Video</option>
        </FormControl>
      </FormGroup>
    );
  }
}

export default ContentFilter;
