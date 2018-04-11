import './App.css';
import React from 'react';
import Grid from 'react-bootstrap/es/Grid';
import ButtonToolbar from 'react-bootstrap/es/ButtonToolbar';
import DropdownButton from 'react-bootstrap/es/DropdownButton';
import MenuItem from 'react-bootstrap/es/MenuItem';


const App = () => (
  <div className="App">
    <header className="App-header">
      <h1 className="App-title">React Context API example</h1>
    </header>

    <Grid className="App-body">
      <ButtonToolbar>
        <DropdownButton
          title="Filters Group 1"
          id="dropdown-filters-group-1"
        >
          <MenuItem>
            Filter A
          </MenuItem>
          <MenuItem>
            Filter B
          </MenuItem>
        </DropdownButton>
        <DropdownButton
          title="Filters Group 2"
          id="dropdown-filters-group-2"
        >
          <MenuItem>
            Filter C
          </MenuItem>
          <MenuItem>
            Filter D
          </MenuItem>
        </DropdownButton>
        <DropdownButton
          title="Filters Group 3"
          id="dropdown-filters-group-3"
        >
          <MenuItem>
            Filter E
          </MenuItem>
          <MenuItem>
            Filter F
          </MenuItem>
        </DropdownButton>
      </ButtonToolbar>
    </Grid>
  </div>
);

export default App;
