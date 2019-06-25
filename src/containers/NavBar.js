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
  
  // closeBurger = () => {
  //   this.setState({
  //     showBurger: false,
  //   });
  // };

  handleOutsideClick = e => {
    const { showBurger } = this.state;
    if (showBurger) {
      // only if mobile
      if (document.body.clientWidth <= 1087) {
        if (e.pageY > 150) {
          this.toggleBurger();
          return true;
        }
      }
    } 
    // else if (toggleDropdown) {
    //   if (e.pageX < 76 || e.pageY < 95 || e.pageY > 387) {
    //     this.closeNav();
    //     return true;
    //   }
    // }
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
            {/* <svg className="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/></svg> */}
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
              {/* <a href="/player/new" className="block mt-4 lg:inline-block lg:mt-0 text-white font-semibold">
                NEW PLAYER
              </a> */}
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
      // <div>
      //   <nav className="navbar" role="navigation" aria-label="main navigation">
      //     <div className="navbar-brand">
      //       <a className="navbar-item" href="https://bulma.io">
      //         {/* <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" /> */}
      //       </a>
      //       <a role="button" className={showBurger ? 'navbar-burger burger is-active' : 'navbar-burger burger'} onClick={this.toggleBurger} aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      //         <span aria-hidden="true"></span>
      //         <span aria-hidden="true"></span>
      //         <span aria-hidden="true"></span>
      //       </a>
      //     </div>
      //     <div id="navbarBasicExample" className={showBurger ? 'navbar-menu is-active' : 'navbar-menu'}>
      //       <div className="navbar-start">
      //         <a href="/" className="navbar-item">
      //           Home
      //         </a>
      //         <a href="/player/new" className="navbar-item">
      //           Create New
      //         </a>
      //       </div>
      //       <div className="navbar-end">
      //         <div className="navbar-item">
      //           <div className="buttons">
      //             <a href="/register" className="button is-primary">
      //               <strong>Sign up</strong>
      //             </a>
      //             <a href="/login" className="button is-light">
      //               Log in
      //             </a>
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //   </nav>
      // </div>
    )
  }
}
