import React from 'react';
import Button from 'react-bootstrap/es/Button';
import Col from 'react-bootstrap/es/Col';
import Grid from 'react-bootstrap/es/Grid';
import ButtonToolbar from 'react-bootstrap/es/ButtonToolbar';
import Row from 'react-bootstrap/es/Row';
import { connect } from 'react-redux';
import {
  clearAllFilters,
  setFiltersContent,
  setFiltersStars,
  setFiltersLocation,
  setFiltersAge,
} from '../ducks/filters';
import ApplyDropdown from './ApplyDropdown/ApplyDropdown';
import ContentFilter from './ContentFilter';
import LocationFilter from './LocationFilter';
import StarsFilter from './StarsFilter';
import AgeFilter from './AgeFilter';


class App extends React.PureComponent {
  handleClearClick = () => {
    this.props.clearAllFilters();
  };

  render() {
    const { filters } = this.props;

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">React Context API example</h1>
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
            </Col>

            <Col md={4} className="App-col-separator">
              <h4>Current Filters State:</h4>
              <div>
                <pre>{JSON.stringify(filters, null, 2)}</pre>
                <Button bsStyle="link" onClick={this.handleClearClick}>
                  Clear all
                </Button>
              </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
