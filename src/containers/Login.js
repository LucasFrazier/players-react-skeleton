import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loginError: false,
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  // handleSubmit = (event) => {
  //   event.preventDefault();
  //   if (this.validateForm()) {
  //     // this.props.shop.user.logIn(this.state);
  //     // this.props.history.goBack();
  //     console.log("Login handleSubmit firing")
  //   }
  // }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.validateForm()) {
      fetch('https://players-api.developer.alchemy.codes/api/login', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          "email": email.value,
          "password": password.value
        })
      })
      .then(response => response.json())
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', JSON.stringify(response)));
    }
    else {
      console.log("The form is invalid!");
    }
  }

  validateForm() {
    if (this.state.email.length === 0 || this.state.password.length === 0) {
      this.setState({
        loginError: true,
      });
      return false;
    }
    return true;
  }
  
  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <label className="label is-marginless">Email</label>
            <div className="control has-icons-left has-icons-right">
              <input
                id="email"
                className="input"
                type="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleChange}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope" />
              </span>
            </div>
          </div>

          <div className="field">
            <label className="label is-marginless">Password</label>
            <div className="control has-icons-left has-icons-right">
              <input
                id="password"
                className="input"
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-lock" />
              </span>
            </div>
          </div>

          {this.state.loginError && <p className="help is-danger">Please Enter Username & Password</p>}
          <div className="field">
            <p className="control has-text-centered">
              <button id="login" className="button is-primary " type="submit">
                Login
              </button>
            </p>
          </div>
        </form>
        <h5>
          Need an account?
          <Link to="/register"> Register Here!</Link>
        </h5>
      </div>
    );
  }
}