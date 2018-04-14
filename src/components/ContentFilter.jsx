import React from 'react';
import ControlLabel from 'react-bootstrap/es/ControlLabel';
import FormControl from 'react-bootstrap/es/FormControl';
import FormGroup from 'react-bootstrap/es/FormGroup';

const ContentFilter = () => (
  <FormGroup controlId="ContentFilterSelect">
    <ControlLabel>Content</ControlLabel>
    <FormControl componentClass="select">
      <option value="">All</option>
      <option value="image">Image</option>
      <option value="video">Video</option>
    </FormControl>
  </FormGroup>
);

export default ContentFilter;
