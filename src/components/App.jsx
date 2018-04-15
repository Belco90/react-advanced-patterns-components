import React from 'react';
import Col from 'react-bootstrap/es/Col';
import Grid from 'react-bootstrap/es/Grid';
import ButtonToolbar from 'react-bootstrap/es/ButtonToolbar';
import MenuItem from 'react-bootstrap/es/MenuItem';
import Row from 'react-bootstrap/es/Row';
import ApplyDropdown from './ApplyDropdown';
import ContentFilter from './ContentFilter';


const App = () => (
  <div className="App">
    <header className="App-header">
      <h1 className="App-title">React Context API example</h1>
    </header>

    <Grid className="App-body">
      <ButtonToolbar>
        <ApplyDropdown id="dropdown-filters-group-1" title="Filters Group 1">
          <Row>
            <Col xs={6}>
              <ApplyDropdown.FilterItem>
                <ContentFilter />
              </ApplyDropdown.FilterItem>
            </Col>
          </Row>
        </ApplyDropdown>

        <ApplyDropdown
          title="Filters Group 2"
          id="dropdown-filters-group-2"
        >
          <MenuItem>
            Filter C
          </MenuItem>
          <MenuItem>
            Filter D
          </MenuItem>
        </ApplyDropdown>

        <ApplyDropdown
          title="Filters Group 3"
          id="dropdown-filters-group-3"
        >
          <MenuItem>
            Filter E
          </MenuItem>
          <MenuItem>
            Filter F
          </MenuItem>
        </ApplyDropdown>

      </ButtonToolbar>
    </Grid>
  </div>
);

export default App;
