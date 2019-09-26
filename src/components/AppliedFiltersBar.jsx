import React from 'react';
import PropTypes from 'prop-types';
import { capitalize } from 'utils';
import isEqual from 'lodash.isequal';
import { Button, ButtonToolbar, Glyphicon, Label } from 'react-bootstrap';

import {
  clearAllFilters,
  initialState,
  setFiltersAge,
  setFiltersContent,
  setFiltersLocation,
  setFiltersStars,
} from 'ducks/filters';
import { connect } from 'react-redux';
import styles from 'components/AppliedFiltersBar.module.css';

const propTypes = {
  appliedValues: PropTypes.object,
  setFiltersContent: PropTypes.func.isRequired,
  setFiltersLocation: PropTypes.func.isRequired,
  setFiltersStars: PropTypes.func.isRequired,
  setFiltersAge: PropTypes.func.isRequired,
};

const defaultProps = {
  appliedValues: {},
};

const AppliedFiltersBar = props => {
  const { appliedValues, clearAllFilters } = props;

  const handleClearAll = () => {
    clearAllFilters();
  };

  const handleTagClear = event => {
    const { value: filterName } = event.currentTarget;
    const methodName = `setFilters${capitalize(filterName)}`;
    props[methodName](initialState[filterName]);
  };

  const appliedFiltersTags = Object.entries(appliedValues).filter(
    ([filterName, filterValue]) =>
      !isEqual(filterValue, initialState[filterName])
  );

  return (
    <ButtonToolbar className={styles.appliedFilters}>
      <strong className="pull-left">Applied filters:</strong>
      {appliedFiltersTags.length > 0 && (
        <Button bsStyle="link" onClick={handleClearAll}>
          Clear all
        </Button>
      )}
      {appliedFiltersTags.map(([name, value]) => (
        <Label bsStyle="info" key={name}>
          {`${name}: ${value.toString()} `}
          <button
            type="button"
            className={styles.removeTagButton}
            onClick={handleTagClear}
            value={name}
            aria-label={`clear ${name}`}
          >
            <Glyphicon glyph="remove" />
          </button>
        </Label>
      ))}
    </ButtonToolbar>
  );
};

AppliedFiltersBar.propTypes = propTypes;
AppliedFiltersBar.defaultProps = defaultProps;

const mapStateToProps = state => ({
  appliedValues: state.filters,
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
)(AppliedFiltersBar);
