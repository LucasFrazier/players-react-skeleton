import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      rating: '',
      handedness: 'right',
      ErrorFirstName: false,
      ErrorLastName: false,
      ErrorRating: false,
      ErrorHandedness: false,
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.formErrors();
    if (this.validateForm()) {
      fetch('https://players-api.developer.alchemy.codes/api/players', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + window.localStorage.jwt
        },
        body: JSON.stringify({
          "first_name": firstName.value,
          "last_name": lastName.value,
          "rating": rating.value,
          "handedness": handedness.value
        })
      })
      .then(response => response.json())
      .catch(error => console.error('Error:', error))
      // .then(response => console.log('Success:', JSON.stringify(response)));
      .then(response => {
        response.success === true && 
        // window.localStorage.setItem("user", JSON.stringify(response.user));
        // window.localStorage.setItem("jwt", response.token);
        this.props.history.push("/roster");
      });
    }
    else {
      console.log("The form is invalid!");
    }
  }

  confirmFirstName() {
    if (this.state.firstName.length === 0) {
      this.setState({
        ErrorFirstName: true,
      });
    } else {
      this.setState({
        ErrorFirstName: false,
      });
    }
    return this.state.firstName.length !== 0;
  }

  confirmLastName() {
    if (this.state.lastName.length === 0) {
      this.setState({
        ErrorLastName: true,
      });
    } else {
      this.setState({
        ErrorLastName: false,
      });
    }
    return this.state.lastName.length !== 0;
  }

  confirmRating() {
    if (this.state.rating.length === 0 || this.state.rating > 10 || this.state.rating < 0)  {
      this.setState({
        ErrorRating: true,
      });
    } else {
      this.setState({
        ErrorRating: false,
      });
    }
    return this.state.rating.length !== 0;
  }

  confirmHandedness() {
    if (this.state.handedness.length === 0) {
      this.setState({
        ErrorHandedness: true,
      });
    } else {
      this.setState({
        ErrorHandedness: false,
      });
    }
    return this.state.handedness.length !== 0;
  }

  formErrors() {
    this.confirmFirstName();
    this.confirmLastName();
    this.confirmRating();
    this.confirmHandedness();
  }

  validateForm() {
    return (
      this.confirmFirstName()
      && this.confirmLastName()
      && this.confirmRating()
      && this.confirmHandedness()
    );
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>

        <div className="field">
        <label className="label is-marginless">First Name</label>
        {this.state.ErrorFirstName && <p className="help is-danger is-marginless">Please Enter First Name!</p>}
          <p className="control has-icons-left has-icons-right">
            <input 
              id="firstName" 
              className={this.state.ErrorFirstName ? 'input is-danger is-marginless' : 'input'}
              type="text" 
              placeholder="First Name"
              value={this.state.firstName}
              onChange={this.handleChange}
            />
            <span className="icon is-small is-left">
              <i className="fas fa-user"></i>
            </span>
            <span className="icon is-small is-right">
              {/* <i className="fas fa-check"></i> */}
            </span>
          </p>
        </div>
        <div className="field">
        <label className="label is-marginless">Last Name</label>
        {this.state.ErrorLastName && <p className="help is-danger is-marginless">Please Enter Last Name!</p>}
          <p className="control has-icons-left has-icons-right">
            <input
              id="lastName"
              className={this.state.ErrorLastName ? 'input is-danger' : 'input'}
              type="text"
              placeholder="Last Name"
              value={this.state.lastName}
              onChange={this.handleChange}
            />
            <span className="icon is-small is-left">
              <i className="fas fa-user"></i>
            </span>
            <span className="icon is-small is-right">
              {/* <i className="fas fa-check"></i> */}
            </span>
          </p>
        </div>
        <div className="field">
        <label className="label is-marginless">Rating</label>
        {this.state.ErrorRating && <p className="help is-danger is-marginless">Please Enter a Rating from 0 to 10!</p>}
          <p className="control has-icons-left has-icons-right">
            <input 
              id="rating"
              className={this.state.ErrorRating ? 'input is-danger' : 'input'}
              type="text" 
              placeholder="Rating"
              value={this.state.rating}
              onChange={this.handleChange}
            />
            <span className="icon is-small is-left">
              <i className="fas fa-star"></i>
            </span>
            <span className="icon is-small is-right">
              {/* <i className="fas fa-check"></i> */}
            </span>
          </p>
        </div>
        <div className="field">
        <label className="label is-marginless">Handedness</label>
          <div className="control">
            <div className="select is-primary">
              <select 
              id="handedness"
              className={this.state.handedness ? 'input is-danger' : 'input'}
              type="text"
              value={this.state.handedness}
              onChange={this.handleChange}
              >
                <option value="right">Right</option>
                <option value="left">Left</option>
              </select>
            </div>
          </div>
        </div>
        <div className="field">
          <p className="control">
            <button id="create" className="button is-primary" type="submit">
              Create
            </button>
          </p>
        </div>
        </form>
      </div>
    )
  }
}
