import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
// import { Discovery } from 'aws-sdk/clients/all';

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showBurger: false,
      redirect: false,
    };
  }

  componentWillMount() {
    document.addEventListener('mousedown', this.handleOutsideClick);
  }

  // opens or closes burger for mobile
  toggleBurger = () => {
    this.setState(prevState => ({
      showBurger: !prevState.showBurger
    }));
  };

  handleOutsideClick = e => {
    const { showBurger } = this.state;
    
    if (showBurger) {
      if (document.body.clientWidth <= 1087) {
        if (e.pageY > 150) {
          this.toggleBurger();
          return true;
        }
      }
    }
    return false;
  };

  setRedirect = () => {
    this.setState({
      redirect: true,
      showBurger: false,
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      window.localStorage.clear();
      this.setState({
        redirect: false
      })
      return <Redirect to='/' />
    }
  }

  render() {
    const { showBurger } = this.state;

    return (
      <div>
        {this.renderRedirect()}
        <nav className="flex items-center justify-between flex-wrap bg-red-700 p-6">
          <div className="flex items-center flex-shrink-0 text-white mr-6">
            <img className="h-8 w-8 mr-2" src="https://cdn3.iconfinder.com/data/icons/universal-signs-symbols/128/hand-rock-ol-512.png" />
            <Link to="/" className="font-semibold text-xl tracking-tight">MUSISHUNZZZ</Link>
          </div>
          <div className="block lg:hidden" onClick={this.toggleBurger}>
            <button className="flex items-center px-3 py-2 border rounded text-white">
              <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
            </button>
          </div>
          <div className={showBurger ?  "block w-full flex-grow lg:flex lg:items-center lg:w-auto" : "hidden w-full flex-grow lg:flex lg:items-center lg:w-auto"}>
          {window.localStorage.user ? (
            <div className="text-sm lg:flex-grow">                            
              <a href="/roster" className="block mt-4 lg:inline-block lg:mt-0 text-white font-semibold">
                ROSTER
              </a>
            </div>
          ) : (
            <div className="text-sm lg:flex-grow">              
              <a href="/login" className="block mt-4 lg:inline-block lg:mt-0 text-white font-semibold mr-4">
                LOG IN
              </a>
              <a href="/register" className="block mt-4 lg:inline-block lg:mt-0 text-white font-semibold mr-4">
                REGISTER
              </a>              
            </div>
          )}
            {window.localStorage.user && 
              <div>
                <button onClick={this.setRedirect} className="inline-block text-sm px-4 py-2 leading-none border-2 rounded text-white font-semibold border-white mt-4 lg:mt-0">LOG OUT</button>
              </div>
            }  
          </div>
        </nav>
      </div>
    )
  }
}
