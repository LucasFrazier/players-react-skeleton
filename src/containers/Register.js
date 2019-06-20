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
      ErrorFirstName: false,
      ErrorLastName: false,
      ErrorEmail: false,
      ErrorVerifyEmail: false,
      ErrorPassword: false,
      ErrorVerifyPassword: false,
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
      .catch(error => console.error('Error:', error))
      // .then(response => console.log('Success:', JSON.stringify(response)));
      .then(response => {
        response.success === true && 
        window.localStorage.setItem("user", JSON.stringify(response.user));
        window.localStorage.setItem("jwt", response.token);
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
    // console.log(this.state.firstName.length !== 0)
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
    // console.log(this.state.lastName.length !== 0)
    return this.state.lastName.length !== 0;
  }

  confirmEmail() {
    if (this.state.email.length === 0) {
      this.setState({
        ErrorEmail: true,
      });
    } else {
      this.setState({
        ErrorEmail: false,
      });
    }
    // console.log(this.state.email.length !== 0)
    return this.state.email.length !== 0;
  }

  verifyEmail() {
    if (this.state.confirmEmail && this.state.email) {if (this.state.confirmEmail.length === 0 || this.state.email !== this.state.confirmEmail) {
      this.setState({
        ErrorVerifyEmail: true,
      });
    }}
     else {
      this.setState({
        ErrorVerifyEmail: false,
      });
    }
    // console.log(this.state.email === this.state.confirmEmail)
    return this.state.email === this.state.confirmEmail;
  }

  confirmPassword() {
    if (this.state.password.length === 0) {
      this.setState({
        ErrorPassword: true,
      });
    } else {
      this.setState({
        ErrorPassword: false,
      });
    }
    // console.log(this.state.password.length !== 0)
    return this.state.password.length !== 0;
  }

  verifyPassword() {
    if (this.state.password && this.state.confirmPassword) {if (this.state.confirmPassword.length === 0
      || this.state.password !== this.state.confirmPassword) {
      this.setState({
        ErrorVerifyPassword: true,
      });
    }}
     else {
      this.setState({
        ErrorVerifyPassword: false,
      });
    }
    // console.log(this.state.password === this.state.confirmPassword)
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
            <label className="text-base font-bold block m-0 leading-normal">First Name</label>
            {this.state.ErrorFirstName && <p className="">Please Enter First Name!</p>}
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
          {this.state.ErrorLastName && <p className="help is-danger is-marginless">Please Enter Last Name!</p>}
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
          
          <div className="mt-3">
            <label className="text-base font-bold block m-0 leading-normal">Email</label>
            <p className="">
              <input
                id="email"
                className="pr-8 pl-8 rounded shadow-inner w-full h-8 border border-gray-400"
                type="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleChange}
              />
              {/* <span className="icon is-small is-left">
                <i className="fas fa-envelope" />
              </span>
              {this.state.ErrorEmail && (
                <span className="icon is-small is-right">
                  <i className="fas fa-exclamation-triangle" />
                </span>
              )} */}
            </p>
          </div>
          
          <div className="mt-3">
            <label className="text-base font-bold block m-0 leading-normal">Confirm Email</label>
            {this.state.ErrorVerifyEmail && <p className="help is-danger is-marginless">Email and Confirmation Email Do Not Match!</p>}
            <p className="">
              <input
                id="confirmEmail"
                className="pr-8 pl-8 rounded shadow-inner w-full h-8 border border-gray-400"
                type="email"
                placeholder="Confirm Email"
                value={this.state.verifyEmail}
                onChange={this.handleChange}
              />
              {/* <span className="icon is-small is-left">
                <i className="fas fa-envelope" />
              </span>

              {this.state.ErrorVerifyEmail && (
                <span className="icon is-small is-right">
                  <i className="fas fa-exclamation-triangle" />
                </span>
              )} */}
            </p>
          </div>
          
          <div className="mt-3">
            <label className="text-base font-bold block m-0 leading-normal">Password</label>
            {this.state.ErrorPassword && <p className="help is-danger is-marginless">Please Enter Password!</p>}
            <p className="">
              <input
                id="password"
                className="pr-8 pl-8 rounded shadow-inner w-full h-8 border border-gray-400"
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}
              />
              {/* <span className="icon is-small is-left">
                <i className="fas fa-lock" />
              </span>
              {this.state.ErrorPassword && (
                <span className="icon is-small is-right">
                  <i className="fas fa-exclamation-triangle" />
                </span>
              )} */}
            </p>
          </div>
          
          <div className="mt-3">
            <label className="text-base font-bold block m-0 leading-normal">Confirm Password</label>
            {this.state.ErrorVerifyPassword && <p className="help is-danger is-marginless">Password and Confirmation Password Do Not Match!</p>}
            <p className="">
              <input
                id="confirmPassword"
                className="pr-8 pl-8 rounded shadow-inner w-full h-8 border border-gray-400"
                type="password"
                placeholder="Confirm Password"
                value={this.state.confirmPassword}
                onChange={this.handleChange}
              />
              {/* <span className="icon is-small is-left">
                <i className="fas fa-lock" />
              </span>
              {this.state.ErrorVerifyPassword && (
                <span className="icon is-small is-right">
                  <i className="fas fa-exclamation-triangle" />
                </span>
              )} */}
            </p>
          </div>
          
          <div className="mt-3">
            <p className="">
              <button id="register" className="bg-teal-500 hover:bg-teal-700 text-white py-2 px-3 rounded" type="submit">
                  Register
              </button>
            </p>
          </div>

        </form>
      </div>
      // <div className="container">
      //   <form onSubmit={this.handleSubmit}>
          
      //     <div className="field">
      //       <label className="label is-marginless">First Name</label>
      //       {this.state.ErrorFirstName && <p className="help is-danger is-marginless">Please Enter First Name!</p>}
      //       <p className="control has-icons-left has-icons-right">
      //         <input 
      //           id="firstName" 
      //           className={this.state.ErrorFirstName ? 'input is-danger is-marginless' : 'input'} 
      //           type="text" 
      //           placeholder="First Name"
      //           value={this.state.firstName}
      //           onChange={this.handleChange}
      //         />
      //         <span className="icon is-small is-left">
      //           <i className="fas fa-user"></i>
      //         </span>
      //         {this.state.ErrorFirstName && (
      //         <span className="icon is-small is-right">
      //           <i className="fas fa-exclamation-triangle" />
      //         </span>
      //         )}
      //       </p>
      //     </div>
          
      //     <div className="field">
      //     <label className="label is-marginless">Last Name</label>
      //     {this.state.ErrorLastName && <p className="help is-danger is-marginless">Please Enter Last Name!</p>}
      //       <p className="control has-icons-left has-icons-right">
      //         <input
      //           id="lastName"
      //           className={this.state.ErrorLastName ? 'input is-danger' : 'input'}
      //           type="text"
      //           placeholder="Last Name"
      //           value={this.state.lastName}
      //           onChange={this.handleChange}
      //         />
      //         <span className="icon is-small is-left">
      //           <i className="fas fa-user"></i>
      //         </span>
      //         {this.state.ErrorLastName && (
      //         <span className="icon is-small is-right">
      //           <i className="fas fa-exclamation-triangle" />
      //         </span>
      //         )}
      //       </p>
      //     </div>
          
      //     <div className="field">
      //       <label className="label is-marginless">Email</label>
      //       <p className="control has-icons-left has-icons-right">
      //         <input
      //           id="email"
      //           className={this.state.ErrorEmail ? 'input is-danger' : 'input'}
      //           type="email"
      //           placeholder="Email"
      //           value={this.state.email}
      //           onChange={this.handleChange}
      //         />
      //         <span className="icon is-small is-left">
      //           <i className="fas fa-envelope" />
      //         </span>
      //         {this.state.ErrorEmail && (
      //           <span className="icon is-small is-right">
      //             <i className="fas fa-exclamation-triangle" />
      //           </span>
      //         )}
      //       </p>
      //     </div>
          
      //     <div className="field">
      //       <label className="label is-marginless">Confirm Email</label>
      //       {this.state.ErrorVerifyEmail && <p className="help is-danger is-marginless">Email and Confirmation Email Do Not Match!</p>}
      //       <p className="control has-icons-left has-icons-right">
      //         <input
      //           id="confirmEmail"
      //           className={this.state.ErrorVerifyEmail ? 'input is-danger' : 'input'}
      //           type="email"
      //           placeholder="Confirm Email"
      //           value={this.state.verifyEmail}
      //           onChange={this.handleChange}
      //         />
      //         <span className="icon is-small is-left">
      //           <i className="fas fa-envelope" />
      //         </span>

      //         {this.state.ErrorVerifyEmail && (
      //           <span className="icon is-small is-right">
      //             <i className="fas fa-exclamation-triangle" />
      //           </span>
      //         )}
      //       </p>
      //     </div>
          
      //     <div className="field">
      //       <label className="label is-marginless">Password</label>
      //       {this.state.ErrorPassword && <p className="help is-danger is-marginless">Please Enter Password!</p>}
      //       <p className="control has-icons-left">
      //         <input
      //           id="password"
      //           className={this.state.ErrorPassword ? 'input is-danger' : 'input'}
      //           type="password"
      //           placeholder="Password"
      //           value={this.state.password}
      //           onChange={this.handleChange}
      //         />
      //         <span className="icon is-small is-left">
      //           <i className="fas fa-lock" />
      //         </span>
      //         {this.state.ErrorPassword && (
      //           <span className="icon is-small is-right">
      //             <i className="fas fa-exclamation-triangle" />
      //           </span>
      //         )}
      //       </p>
      //     </div>
          
      //     <div className="field">
      //       <label className="label is-marginless">Confirm Password</label>
      //       {this.state.ErrorVerifyPassword && <p className="help is-danger is-marginless">Password and Confirmation Password Do Not Match!</p>}
      //       <p className="control has-icons-left">
      //         <input
      //           id="confirmPassword"
      //           className={this.state.ErrorVerifyPassword ? 'input is-danger' : 'input'}
      //           type="password"
      //           placeholder="Confirm Password"
      //           value={this.state.confirmPassword}
      //           onChange={this.handleChange}
      //         />
      //         <span className="icon is-small is-left">
      //           <i className="fas fa-lock" />
      //         </span>
      //         {this.state.ErrorVerifyPassword && (
      //           <span className="icon is-small is-right">
      //             <i className="fas fa-exclamation-triangle" />
      //           </span>
      //         )}
      //       </p>
      //     </div>
          
      //     <div className="field">
      //       <p className="control">
      //         <button id="register" className="button is-primary" type="submit">
      //             Register
      //         </button>
      //       </p>
      //     </div>

      //   </form>
      // </div>
    )
  }
}