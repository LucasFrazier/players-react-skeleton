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
      playerAlreadyExists: false,
      somethingWentWrong: false,
    };
  }

  componentWillMount() {
    if (!window.localStorage.user) {
      this.props.history.push("/");
    }
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
      .then(response => {
        if (response.success) {
          this.props.history.push("/roster")
        } else {
          if (response.error.status_code == 409) {
            this.setState({
              playerAlreadyExists: true,
            });
          } else {
            this.setState({
              somethingWentWrong: true,
            });
          }
        }
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
            <label className="text-base font-bold block m-0 leading-normal uppercase">First Name</label>
            <p className="relative">
              <input 
                id="firstName" 
                className="pr-8 pl-8 rounded shadow-inner w-full h-8 border border-gray-400"
                type="text" 
                placeholder="First Name"
                value={this.state.firstName}
                onChange={this.handleChange}
                />              
              <span className="absolute left-0 pt-2 pl-2">
                <i className="fas fa-user" />
              </span>              
              {this.state.ErrorFirstName && (
                <span className="absolute right-0 pt-2 pr-2">
                  <i className="fas fa-exclamation-triangle text-red-500" />
                </span>
              )}
            </p>
            {this.state.ErrorFirstName && <p className="text-xs text-red-500">Please Enter First Name!</p>}
          </div>

          <div className="mt-3">
          <label className="text-base font-bold block m-0 leading-normal uppercase">Last Name</label>
            <p className="relative">
              <input
                id="lastName"
                className="pr-8 pl-8 rounded shadow-inner w-full h-8 border border-gray-400"
                type="text"
                placeholder="Last Name"
                value={this.state.lastName}
                onChange={this.handleChange}
                />
              <span className="absolute left-0 pt-2 pl-2">
                <i className="fas fa-user" />
              </span>                
              {this.state.ErrorLastName && (
                <span className="absolute right-0 pt-2 pr-2">
                  <i className="fas fa-exclamation-triangle text-red-500" />
                </span>
              )}
            </p>
            {this.state.ErrorLastName && <p className="text-xs text-red-500">Please Enter Last Name!</p>}
          </div>

        <div className="mt-3">
        <label className="text-base font-bold block m-0 leading-normal uppercase">Rating</label>
          <p className="relative">
            <input 
              id="rating"
              className="pr-8 pl-8 rounded shadow-inner w-full h-8 border border-gray-400"
              type="text" 
              placeholder="Rating"
              value={this.state.rating}
              onChange={this.handleChange}
              />
            <span className="absolute left-0 pt-2 pl-2">
              <i className="fas fa-star" />
            </span>
            {this.state.ErrorRating && (
              <span className="absolute right-0 pt-2 pr-2">
                <i className="fas fa-exclamation-triangle text-red-500" />
              </span>
            )}
          </p>
          {this.state.ErrorRating && <p className="text-xs text-red-500">Please Enter a Rating from 0 to 10!</p>}
        </div>

        <div className="mt-3">
        <label className="text-base font-bold block m-0 leading-normal uppercase">Handedness</label>
          <div className="">
            <div className="">
              <select 
              id="handedness"
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
            <button id="create" className="bg-red-700 text-white font-semibold py-2 px-3 rounded" type="submit">
              CREATE
            </button>
          </p>
        </div>
        <div className="mt-6">
            <Link to='/roster' className="bg-black text-white font-semibold py-2 px-3 rounded">CANCEL</Link>
        </div>
        </form>

        {this.state.playerAlreadyExists && <p className="mt-3 text-red-500">Player Already Exists!</p>}
        {this.state.somethingWentWrong && <p className="text-red-500">Something Went Wrong!</p>}

      </div>
    )
  }
}
