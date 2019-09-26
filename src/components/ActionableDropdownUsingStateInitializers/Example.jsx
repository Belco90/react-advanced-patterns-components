import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';

import {
  setFiltersAge,
  setFiltersContent,
  setFiltersLocation,
  setFiltersStars,
} from 'ducks/filters';
import ContentFilter from 'components/ContentFilter';
import LocationFilter from 'components/LocationFilter';
import StarsFilter from 'components/StarsFilter';
import AgeFilter from 'components/AgeFilter';
import AppliedFiltersBar from 'components/AppliedFiltersBar';

import ActionableDropdown from './ActionableDropdownUsingStateInitializers';

const Example = props => {
  const {
    values,
    setFiltersContent,
    setFiltersLocation,
    setFiltersStars,
    setFiltersAge,
  } = props;

  const handleApplyFilters = newValues => {
    // TODO: merge into one setter
    setFiltersContent(newValues.content);
    setFiltersLocation(newValues.location);
    setFiltersStars(newValues.stars);
    setFiltersAge(newValues.age);
  };

  return (
    <>
      <ActionableDropdown
        id="actionable-dropdown-filters"
        title="Filters"
        values={values}
        onApply={handleApplyFilters}
      >
        <Row>
          <Col xs={6}>
            <ActionableDropdown.EditableItem itemKey="content">
              <ContentFilter />
            </ActionableDropdown.EditableItem>
          </Col>

          <Col xs={6}>
            <ActionableDropdown.EditableItem itemKey="location">
              <LocationFilter />
            </ActionableDropdown.EditableItem>
          </Col>
        </Row>

        <ActionableDropdown.EditableItem itemKey="age">
          <AgeFilter />
        </ActionableDropdown.EditableItem>

        <Row>
          <Col xs={6} xsOffset={6}>
            <ActionableDropdown.EditableItem itemKey="stars">
              <StarsFilter />
            </ActionableDropdown.EditableItem>
          </Col>
        </Row>
      </ActionableDropdown>

      <hr />

      <AppliedFiltersBar />
    </>
  );
};

const mapStateToProps = state => ({
  values: state.filters,
});

const mapDispatchToProps = {
  setFiltersContent,
  setFiltersStars,
  setFiltersLocation,
  setFiltersAge,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Example);
