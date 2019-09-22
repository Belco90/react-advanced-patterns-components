import React from 'react';
import Button from 'react-bootstrap/es/Button';
import Col from 'react-bootstrap/es/Col';
import Grid from 'react-bootstrap/es/Grid';
import ButtonToolbar from 'react-bootstrap/es/ButtonToolbar';
import Row from 'react-bootstrap/es/Row';
import Label from 'react-bootstrap/es/Label';
import Glyphicon from 'react-bootstrap/es/Glyphicon';
import { connect } from 'react-redux';
import { isEqual } from 'lodash/lang';
import { capitalize } from 'lodash/string';
import { Facebook } from 'react-content-loader';

import 'bootstrap/dist/css/bootstrap.min.css';

import {
  initialState,
  clearAllFilters,
  setFiltersContent,
  setFiltersStars,
  setFiltersLocation,
  setFiltersAge,
} from 'ducks/filters';
import ApplyDropdown from './ApplyDropdown/ApplyDropdown';
import ContentFilter from './ContentFilter';
import LocationFilter from './LocationFilter';
import StarsFilter from './StarsFilter';
import AgeFilter from './AgeFilter';

class App extends React.PureComponent {
  handleClearClick = () => {
    this.props.clearAllFilters();
  };

  handleTagClick = event => {
    const { value: filterName } = event.currentTarget;
    const setMethodName = `setFilters${capitalize(filterName)}`;

    this.props[setMethodName](initialState[filterName]);
  };

  renderFilterTags() {
    const { filters } = this.props;
    const filterTags = [];

    for (let filterName of Object.keys(filters)) {
      let filterValue = filters[filterName];
      if (!isEqual(filterValue, initialState[filterName])) {
        filterTags.push({ name: filterName, value: filterValue });
      }
    }

    if (filterTags.length > 0) {
      return (
        <React.Fragment>
          <Button
            bsStyle="link"
            onClick={this.handleClearClick}
            className="App-clear-all-button"
          >
            Clear all
          </Button>
          {filterTags.map(filter => (
            <Label bsStyle="info" key={filter.name}>
              {filter.name}
              {': '}
              {filter.value.toString()}{' '}
              <button
                className="remove-tag-button"
                onClick={this.handleTagClick}
                value={filter.name}
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
    const { filters } = this.props;

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">React: advanced patterns components</h1>
        </header>

        <Grid className="App-body">
          <Row>
            <Col md={8}>
              <ButtonToolbar>
                <ApplyDropdown
                  id="dropdown-filters-group-1"
                  title="Filters Group 1"
                >
                  <Row>
                    <Col xs={6}>
                      <ApplyDropdown.FilterItem
                        value={filters.content}
                        onApply={this.props.setFiltersContent}
                      >
                        <ContentFilter />
                      </ApplyDropdown.FilterItem>
                    </Col>

                    <Col xs={6}>
                      <ApplyDropdown.FilterItem
                        value={filters.location}
                        onApply={this.props.setFiltersLocation}
                      >
                        <LocationFilter />
                      </ApplyDropdown.FilterItem>
                    </Col>
                  </Row>
                </ApplyDropdown>

                <ApplyDropdown
                  id="dropdown-filters-group-2"
                  title="Filters Group 2"
                >
                  <ApplyDropdown.FilterItem
                    value={filters.stars}
                    onApply={this.props.setFiltersStars}
                  >
                    <StarsFilter />
                  </ApplyDropdown.FilterItem>
                  <ApplyDropdown.FilterItem
                    value={filters.age}
                    onApply={this.props.setFiltersAge}
                  >
                    <AgeFilter />
                  </ApplyDropdown.FilterItem>
                </ApplyDropdown>
              </ButtonToolbar>

              <hr />

              <ButtonToolbar className="App-applied-filters">
                <strong className="pull-left">Applied filters:</strong>
                {this.renderFilterTags()}
              </ButtonToolbar>

              <hr />

              <Facebook />
            </Col>

            <Col md={4} className="App-col-separator">
              <h4>Current Filters State:</h4>
              <pre>{JSON.stringify(filters, null, 2)}</pre>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  filters: state.filters,
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
)(App);
