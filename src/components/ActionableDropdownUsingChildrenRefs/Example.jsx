import React from 'react';
import {
  Button,
  Col,
  ButtonToolbar,
  Row,
  Label,
  Glyphicon,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import isEqual from 'lodash.isequal';
import { capitalize } from 'utils';

import {
  initialState,
  clearAllFilters,
  setFiltersContent,
  setFiltersStars,
  setFiltersLocation,
  setFiltersAge,
} from 'ducks/filters';
import ContentFilter from 'components/ContentFilter';
import LocationFilter from 'components/LocationFilter';
import StarsFilter from 'components/StarsFilter';
import AgeFilter from 'components/AgeFilter';

import ActionableDropdown from './ActionableDropdownUsingChildrenRefs';
import styles from 'components/ActionableDropdownExample.module.css';

class Example extends React.Component {
  handleClearClick = () => {
    this.props.clearAllFilters();
  };

  handleTagClick = event => {
    const { value: filterName } = event.currentTarget;
    const setMethodName = `setFilters${capitalize(filterName)}`;

    this.props[setMethodName](initialState[filterName]);
  };

  renderFilterTags() {
    const { values } = this.props;
    const filterTags = [];

    for (let filterName of Object.keys(values)) {
      let filterValue = values[filterName];
      if (!isEqual(filterValue, initialState[filterName])) {
        filterTags.push({ name: filterName, value: filterValue });
      }
    }

    if (filterTags.length > 0) {
      return (
        <React.Fragment>
          <Button bsStyle="link" onClick={this.handleClearClick}>
            Clear all
          </Button>
          {filterTags.map(filter => (
            <Label bsStyle="info" key={filter.name}>
              {filter.name}
              {': '}
              {filter.value.toString()}{' '}
              <button
                className={styles.removeTagButton}
                onClick={this.handleTagClick}
                value={filter.name}
                aria-label={`clear ${filter.name}`}
              >
                <Glyphicon glyph="remove" />
              </button>
            </Label>
          ))}
        </React.Fragment>
      );
    }

    return '';
  }

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

        <ButtonToolbar className={styles.appliedFilters}>
          <strong className="pull-left">Applied filters:</strong>
          {this.renderFilterTags()}
        </ButtonToolbar>
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
