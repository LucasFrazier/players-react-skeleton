import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class LandingPage extends Component {
  render() {
    return (
      <div>
        Here's the Landing Page.
        <Link to='/login'>Login</Link>
        <Link to='/register'>Register</Link>
      </div>
    )
  }
}
