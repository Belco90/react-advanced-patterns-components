import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';

import {
  clearAllFilters,
  setFiltersAge,
  setFiltersContent,
  setFiltersLocation,
  setFiltersStars,
} from 'ducks/filters';
import ContentFilter from 'components/ContentFilter';
import LocationFilter from 'components/LocationFilter';
import StarsFilter from 'components/StarsFilter';
import AgeFilter from 'components/AgeFilter';

import ActionableDropdown from './ActionableDropdownUsingChildrenRefs';
import AppliedFiltersBar from 'components/AppliedFiltersBar';

class Example extends React.Component {
  render() {
    const {
      values,
      setFiltersContent,
      setFiltersLocation,
      setFiltersStars,
      setFiltersAge,
    } = this.props;

    return (
      <>
        <ActionableDropdown id="actionable-dropdown-filters" title="Filters">
          <Row>
            <Col xs={6}>
              <ActionableDropdown.EditableItem
                value={values.content}
                onApply={setFiltersContent}
              >
                <ContentFilter />
              </ActionableDropdown.EditableItem>
            </Col>

            <Col xs={6}>
              <ActionableDropdown.EditableItem
                value={values.location}
                onApply={setFiltersLocation}
              >
                <LocationFilter />
              </ActionableDropdown.EditableItem>
            </Col>
          </Row>

          <ActionableDropdown.EditableItem
            value={values.age}
            onApply={setFiltersAge}
          >
            <AgeFilter />
          </ActionableDropdown.EditableItem>

          <Row>
            <Col xs={6} xsOffset={6}>
              <ActionableDropdown.EditableItem
                value={values.stars}
                onApply={setFiltersStars}
              >
                <StarsFilter />
              </ActionableDropdown.EditableItem>
            </Col>
          </Row>
        </ActionableDropdown>

        <hr />

        <AppliedFiltersBar />
      </>
    );
  }
}

const mapStateToProps = state => ({
  values: state.filters,
});

const mapDispatchToProps = {
  clearAllFilters,
  setFiltersContent,
  setFiltersStars,
  setFiltersLocation,
  setFiltersAge,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Example);
