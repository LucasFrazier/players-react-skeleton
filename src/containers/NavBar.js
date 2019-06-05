import React, { Component } from 'react'

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showBurger: false,
    };
  }

  // opens or closes burger for mobile
  toggleBurger = () => {
    this.setState(prevState => ({
      showBurger: !prevState.showBurger
    }));
  };

  render() {
    const { showBurger } = this.state;

    return (
      <div>
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <a className="navbar-item" href="https://bulma.io">
              <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
            </a>

            <a role="button" className={showBurger ? 'navbar-burger burger is-active' : 'navbar-burger burger'} onClick={this.toggleBurger} aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div id="navbarBasicExample" className={showBurger ? 'navbar-menu is-active' : 'navbar-menu'}>
            <div className="navbar-start">
              <a href="/" className="navbar-item">
                Home
              </a>

              <a href="/player/new" className="navbar-item">
                Create New
              </a>

              {/* <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">
                  More
                </a>

                <div className="navbar-dropdown">
                  <a className="navbar-item">
                    About
                  </a>
                  <a className="navbar-item">
                    Jobs
                  </a>
                  <a className="navbar-item">
                    Contact
                  </a>
                  <hr className="navbar-divider"/>
                  <a className="navbar-item">
                    Report an issue
                  </a>
                </div>
              </div> */}
            </div>

            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  <a href="/register" className="button is-primary">
                    <strong>Sign up</strong>
                  </a>
                  <a href="/login" className="button is-light">
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}
