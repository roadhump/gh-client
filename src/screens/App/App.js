import React from 'react';
import {
  Switch,
  Route,
  withRouter,
} from 'react-router-dom';
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarTitle,
  TextField,
} from 'material-ui';
import {compose, withState, withHandlers} from 'recompose';

import ProfileScreen from 'screens/Profile';

import S from './App.css';

const App = ({onSubmit, searchValue, onSearchValueChange}) => (
  <div className={S.block}>
    <Toolbar>
      <ToolbarGroup>
        <ToolbarTitle text="Just Another GitHub Client" />
        <form onSubmit={onSubmit}>
          <TextField
            hintText="Enter login..."
            fullWidth={true}
            id="search"
            value={searchValue}
            onChange={onSearchValueChange}
          />
        </form>
      </ToolbarGroup>
    </Toolbar>
    <div className={S.inner}>
    <Switch>
      <Route
          exact={true}
          path="/profile"
          component={ProfileScreen}
      />
      <Route
          exact={true}
          path="/profile/:name"
          component={ProfileScreen}
      />
    </Switch>
    </div>
  </div>
);

export default compose(
  withState('searchValue', 'onSearchValueChange', ''),
  withRouter,
  withHandlers({
    onSearchValueChange: ({onSearchValueChange}) => (e, val) =>
      onSearchValueChange(val),
    onSubmit: ({history, searchValue}) => (e) => {

      e.preventDefault();
      history.push(`/profile/${searchValue}`);

    }
  })
)(App);
