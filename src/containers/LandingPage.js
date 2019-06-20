import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class LandingPage extends Component {
  render() {
    return (
      <div className="text-center p-6">
        <div>
        </div>
        <div className="my-8">
          <Link to='/login' className="bg-teal-500 hover:bg-teal-700 text-white py-2 px-3 rounded"> Login </Link>
        </div>
        <div className="my-8">
          <Link to='/register' className="bg-teal-500 hover:bg-teal-700 text-white py-2 px-3 rounded"> Register </Link>
        </div>
      </div>
    )
  }
}
