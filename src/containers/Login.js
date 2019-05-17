import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Login extends Component {
  render() {
    return (
      <div>
        Here is the Login Page.
        <Link to='/'>Back to Landing Page</Link>
      </div>
    )
  }
}
