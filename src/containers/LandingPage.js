import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class LandingPage extends Component {
  
  componentWillMount() {
    if (window.localStorage.user) {
      this.props.history.push("/roster");
    }
  }
  
  render() {
    return (
      <div className="text-center p-6">
        <div className="my-4 font-bold text-2xl">
          ROCK AND ROLL<br />IS THE DEVIL'S MUSIC.
        </div>
        <div className="mt-2 font-bold text-xl">
          THANK GOD.
        </div>
        <div className="mt-5 font-semibold">
          CREATE A CUSTOM LIST OF MUSICIANS TO PULL FROM FOR YOUR NEXT BAND.
        </div>
        <div className="my-8">
          <Link to='/login' className="bg-red-700 text-white font-semibold py-2 px-3 rounded uppercase">Login</Link>
        </div>
        <div className="my-8">
          <Link to='/register' className="bg-black text-white font-semibold py-2 px-3 rounded uppercase">Register</Link>
        </div>
      </div>
    )
  }
}
