import React from 'react';
import Button from 'react-bootstrap/es/Button';
import Col from 'react-bootstrap/es/Col';
import Grid from 'react-bootstrap/es/Grid';
import ButtonToolbar from 'react-bootstrap/es/ButtonToolbar';
import Row from 'react-bootstrap/es/Row';
import { connect } from 'react-redux';
import { setContentFilter } from '../ducks/content-filter';
import { setGenderFilter } from '../ducks/gender-filter';
import ApplyDropdown from './ApplyDropdown/ApplyDropdown';
import ContentFilter from './ContentFilter';


class App extends React.PureComponent {
  render() {
    const { reduxState } = this.props;

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
                        value={reduxState.contentFilter}
                        onApply={this.props.setContentFilter}
                      >
                        <ContentFilter />
                      </ApplyDropdown.FilterItem>
                    </Col>

                  </Row>
                </ApplyDropdown>
              </ButtonToolbar>
            </Col>

            <Col md={4} className="App-col-separator">
              <h4>Current Redux State:</h4>
              <div>
                <pre>{JSON.stringify(reduxState, null, 2)}</pre>
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
  reduxState: state,
});

const mapDispatchToProps = {
  setContentFilter,
  setGenderFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
