import React, { Component } from 'react';

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      confirmEmail: '',
      password: '',
      confirmPassword: '',
      errorFirstName: false,
      errorLastName: false,
      errorEmail: false,
      errorVerifyEmail: false,
      errorPassword: false,
      errorVerifyPassword: false,
      userAlreadyExists: false,
      somethingWentWrong: false,
    };
  }

  componentWillMount() {
    if (window.localStorage.user) {
      this.props.history.push("/roster");
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
      fetch('https://players-api.developer.alchemy.codes/api/user', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          "first_name": firstName.value,
          "last_name": lastName.value,
          "email": email.value,
          "password": password.value,
          "confirm_password": confirmPassword.value
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response.success) {
          window.localStorage.setItem("user", JSON.stringify(response.user));
          window.localStorage.setItem("jwt", response.token);
          this.props.history.push("/roster");
        } else {
          if (response.error.status_code == 409) {
            this.setState({
              userAlreadyExists: true,
            });
          } else {
            this.setState({
              somethingWentWrong: true,
            });
          }
        }
      });
    }
  }

  confirmFirstName() {
    if (this.state.firstName.length === 0) {
      this.setState({
        errorFirstName: true,
      });
    } else {
      this.setState({
        errorFirstName: false,
      });
    }
    return this.state.firstName.length !== 0;
  }

  confirmLastName() {
    if (this.state.lastName.length === 0) {
      this.setState({
        errorLastName: true,
      });
    } else {
      this.setState({
        errorLastName: false,
      });
    }
    return this.state.lastName.length !== 0;
  }

  confirmEmail() {
    if (this.state.email.length === 0) {
      this.setState({
        errorEmail: true,
      });
    } else {
      this.setState({
        errorEmail: false,
      });
    }
    return this.state.email.length !== 0;
  }

  verifyEmail() {
    if (this.state.confirmEmail && this.state.email) {if (this.state.confirmEmail.length === 0 || this.state.email !== this.state.confirmEmail) {
      this.setState({
        errorVerifyEmail: true,
      });
    }}
     else {
      this.setState({
        errorVerifyEmail: false,
      });
    }
    return this.state.email === this.state.confirmEmail;
  }

  confirmPassword() {
    const regEx = RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/);
    
    if (!this.state.password.match(regEx)) {
      this.setState({
        errorPassword: true,
      });
    } else {
      this.setState({
        errorPassword: false,
      });
    }
    return this.state.password.match(regEx);
  }

  verifyPassword() {
    if (this.state.password && this.state.confirmPassword) {if (this.state.confirmPassword.length === 0
      || this.state.password !== this.state.confirmPassword) {
      this.setState({
        errorVerifyPassword: true,
      });
    }}
     else {
      this.setState({
        errorVerifyPassword: false,
      });
    }
    return this.state.password === this.state.confirmPassword;
  }

  formErrors() {
    this.confirmFirstName();
    this.confirmLastName();
    this.confirmEmail();
    this.confirmPassword();
    this.verifyEmail();
    this.verifyPassword();
  }

  validateForm() {
    return (
      this.confirmFirstName()
      && this.confirmLastName()
      && this.confirmEmail()
      && this.confirmPassword()
      && this.verifyEmail()
      && this.verifyPassword()
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
                <i className="fas fa-user"></i>
              </span>
              {this.state.errorFirstName && (
                <span className="absolute right-0 pt-2 pr-2">
                  <i className="fas fa-exclamation-triangle text-red-500" />
                </span>
              )}
            </p>
            {this.state.errorFirstName && <p className="text-sm text-red-500">Please Enter First Name!</p>}
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
                <i className="fas fa-user"></i>
              </span>
                {this.state.errorLastName && (
                  <span className="absolute right-0 pt-2 pr-2">
                    <i className="fas fa-exclamation-triangle text-red-500" />
                  </span>
                )}
            </p>
            {this.state.errorLastName && <p className="text-sm text-red-500">Please Enter Last Name!</p>}
          </div>
          
          <div className="mt-3">
            <label className="text-base font-bold block m-0 leading-normal uppercase">Email</label>
            <p className="relative">
              <input
                id="email"
                className="pr-8 pl-8 rounded shadow-inner w-full h-8 border border-gray-400"
                type="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleChange}
              />
              <span className="absolute left-0 pt-2 pl-2">
                <i className="fas fa-envelope" />
              </span>
              {this.state.errorEmail && (
                <span className="absolute right-0 pt-2 pr-2">
                  <i className="fas fa-exclamation-triangle text-red-500" />
                </span>
              )}
            </p>
            {this.state.errorEmail && <p className="text-sm text-red-500">Please Enter Email!</p>}
          </div>
          
          <div className="mt-3">
            <label className="text-base font-bold block m-0 leading-normal">CONFIRM EMAIL</label>
            <p className="relative">
              <input
                id="confirmEmail"
                className="pr-8 pl-8 rounded shadow-inner w-full h-8 border border-gray-400"
                type="email"
                placeholder="Confirm Email"
                value={this.state.verifyEmail}
                onChange={this.handleChange}
                />
              <span className="absolute left-0 pt-2 pl-2">
                <i className="fas fa-envelope" />
              </span>  
              {this.state.errorVerifyEmail && (
                <span className="absolute right-0 pt-2 pr-2">
                  <i className="fas fa-exclamation-triangle text-red-500" />
                </span>
              )}
            </p>
            {this.state.errorVerifyEmail && <p className="text-sm text-red-500">Email and Confirm Email Do Not Match!</p>}
          </div>
          
          <div className="mt-3">
            <label className="text-base font-bold block m-0 leading-normal uppercase">Password</label>
            <p className="relative">
              <input
                id="password"
                className="pr-8 pl-8 rounded shadow-inner w-full h-8 border border-gray-400"
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}
                />
              <span className="absolute left-0 pt-2 pl-2">
                <i className="fas fa-lock" />
              </span>                
              {this.state.errorPassword && (
                <span className="absolute right-0 pt-2 pr-2">
                  <i className="fas fa-exclamation-triangle text-red-500" />
                </span>
              )}
            </p>
            {this.state.errorPassword && <p className="text-sm text-red-500">Password must be 8 characters minimum, at least 1 uppercase letter, 1 lowercase letter, and 1 number!</p>}
          </div>
          
          <div className="mt-3">
            <label className="text-base font-bold block m-0 leading-normal uppercase">Confirm Password</label>
            <p className="relative">
              <input
                id="confirmPassword"
                className="pr-8 pl-8 rounded shadow-inner w-full h-8 border border-gray-400"
                type="password"
                placeholder="Confirm Password"
                value={this.state.confirmPassword}
                onChange={this.handleChange}
                />
              <span className="absolute left-0 pt-2 pl-2">
                <i className="fas fa-lock" />
              </span>
              {this.state.errorVerifyPassword && (
                <span className="absolute right-0 pt-2 pr-2">
                  <i className="fas fa-exclamation-triangle text-red-500" />
                </span>
              )}
            </p>
            {this.state.errorVerifyPassword && <p className="text-sm text-red-500">Password and Confirm Password Do Not Match!</p>}
          </div>
          
          <div className="">
            <p className="my-5">
              <button id="register" className="bg-red-700 text-white font-semibold py-2 px-3 rounded uppercase" type="submit">
                  Register
              </button>
            </p>
          </div>

          {this.state.userAlreadyExists && <p className="text-red-500">User Already Exists!</p>}
          {this.state.somethingWentWrong && <p className="text-red-500">Something Went Wrong!</p>}

        </form>
      </div>
    )
  }
}