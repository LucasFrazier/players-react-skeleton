import React, { Component } from 'react';
// import Auth from '@aws-amplify/auth';
// import { withAuthenticator } from 'aws-amplify-react';
// import awsconfig from '../aws-exports';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import NavBar from './NavBar';

// retrieve temporary AWS credentials and sign requests
// Auth.configure(awsconfig);

class App extends Component {

  render() {
    return (
      <Router>
        <div>
            <NavBar />
            <Routes />
        </div>
      </Router>
    );
  }
}

export default App;
// export default withAuthenticator(App);