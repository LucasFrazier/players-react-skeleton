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
      <div className="p-6">
        <form className="mb-0" onSubmit={this.handleSubmit}>

        <div className="">
            <label className="text-base font-bold block m-0 leading-normal">First Name</label>
            {this.state.ErrorFirstName && <p className="text-red-500">Please Enter First Name!</p>}
            <p className="">
              <input 
                id="firstName" 
                className="pr-8 pl-8 rounded shadow-inner w-full h-8 border border-gray-400"
                type="text" 
                placeholder="First Name"
                value={this.state.firstName}
                onChange={this.handleChange}
              />
              {/* This icon is supposed to be to the left of "First Name" */}
              {/* <span className="">
                <i className="fas fa-user"></i>
              </span> */}
              {/* This icon is supposed to be on the right of the input field when there is a validation error */}
              {/* {this.state.ErrorFirstName && (
              <span className="icon is-small is-right">
                <i className="fas fa-exclamation-triangle" />
              </span>
              )} */}
            </p>
          </div>

          <div className="mt-3">
          <label className="text-base font-bold block m-0 leading-normal">Last Name</label>
          {this.state.ErrorLastName && <p className="text-red-500">Please Enter Last Name!</p>}
            <p className="">
              <input
                id="lastName"
                className="pr-8 pl-8 rounded shadow-inner w-full h-8 border border-gray-400"
                type="text"
                placeholder="Last Name"
                value={this.state.lastName}
                onChange={this.handleChange}
              />
              {/* <span className="icon is-small is-left">
                <i className="fas fa-user"></i>
              </span>
              {this.state.ErrorLastName && (
              <span className="icon is-small is-right">
                <i className="fas fa-exclamation-triangle" />
              </span>
              )} */}
            </p>
          </div>

        <div className="">
        <label className="text-base font-bold block m-0 leading-normal">Rating</label>
        {this.state.ErrorRating && <p className="text-red-500">Please Enter a Rating from 0 to 10!</p>}
          <p className="">
            <input 
              id="rating"
              // className={this.state.ErrorRating ? 'input is-danger' : 'input'}
              className="pr-8 pl-8 rounded shadow-inner w-full h-8 border border-gray-400"
              type="text" 
              placeholder="Rating"
              value={this.state.rating}
              onChange={this.handleChange}
            />
            {/* <span className="icon is-small is-left">
              <i className="fas fa-star"></i>
            </span> */}
            {/* <span className="icon is-small is-right">
              <i className="fas fa-check"></i>
            </span> */}
          </p>
        </div>

        <div className="mt-3">
        <label className="text-base font-bold block m-0 leading-normal">Handedness</label>
          <div className="">
            <div className="">
              <select 
              id="handedness"
              // className={this.state.handedness ? 'input is-danger' : 'input'}
              className="pr-8 pl-8 rounded shadow-inner h-8 border border-gray-400"
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

        <div className="mt-6">
          <p className="">
            <button id="create" className="bg-teal-500 hover:bg-teal-700 text-white py-2 px-3 rounded" type="submit">
              Create
            </button>
          </p>
        </div>
        <div className="mt-6">
            <Link to='/roster' className="bg-red-500 hover:bg-red-700 text-white py-3 px-3 rounded">Cancel</Link>
        </div>
        </form>
      </div>
    )
  }
}
