import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class LandingPage extends Component {
  render() {
    return (
      <div className="text-center p-6">
        <div className="my-4 font-bold text-2xl">
          ROCK AND ROLL<br />IS THE DEVIL'S MUSIC.
        </div>
        <div className="mt-2 font-bold text-xl">
          THANK GOD.
        </div>
        <div className="my-8">
          <Link to='/login' className="bg-red-700 text-white font-semibold py-2 px-3 rounded">LOG IN</Link>
        </div>
        <div className="my-8">
          <Link to='/register' className="bg-black text-white font-semibold py-2 px-3 rounded">REGISTER</Link>
        </div>
      </div>
    )
  }
}
