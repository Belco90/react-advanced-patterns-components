import React from 'react';
import { ControlLabel, FormControl, FormGroup } from 'react-bootstrap';

class ContentFilter extends React.PureComponent {
  handleSelectChange = event => {
    this.props.onChange(event.target.value);
  };

  render() {
    return (
      <FormGroup controlId="ContentFilterSelect">
        <ControlLabel>Content</ControlLabel>
        <FormControl
          componentClass="select"
          name="content"
          value={this.props.value}
          onChange={this.handleSelectChange}
        >
          <option value="">All</option>
          <option value="image">Image</option>
          <option value="video">Video</option>
        </FormControl>
      </FormGroup>
    );
  }
}

export default ContentFilter;
