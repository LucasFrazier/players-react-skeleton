import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './LandingPage';
import Login from './Login';
import NewPlayer from './NewPlayer';
import Register from './Register';
import Roster from './Roster';
import NotFound from './NotFound';

const Routes = () => (
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/player/new" component={NewPlayer} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/roster" component={Roster} />
      <Route component={NotFound} />
    </Switch>
  );
  
  export default Routes;