import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Register extends Component {
  render() {
    return (
      <div className="box">
        <label className="label is-marginless">First Name</label>
        <div className="field">
          <p className="control has-icons-left has-icons-right">
            <input id="firstName" className="input" type="text" placeholder="First Name"/>
            <span className="icon is-small is-left">
              <i className="fas fa-user"></i>
            </span>
            <span className="icon is-small is-right">
              {/* <i className="fas fa-check"></i> */}
            </span>
          </p>
        </div>
        <label className="label is-marginless">Last Name</label>
        <div className="field">
          <p className="control has-icons-left has-icons-right">
            <input id="lastName" className="input" type="text" placeholder="Last Name"/>
            <span className="icon is-small is-left">
              <i className="fas fa-user"></i>
            </span>
            <span className="icon is-small is-right">
              {/* <i className="fas fa-check"></i> */}
            </span>
          </p>
        </div>
        <label className="label is-marginless">Rating</label>
        <div className="field">
          <p className="control has-icons-left has-icons-right">
            <input id="rating" className="input" type="text" placeholder="Rating"/>
            <span className="icon is-small is-left">
              <i className="fas fa-star"></i>
            </span>
            <span className="icon is-small is-right">
              {/* <i className="fas fa-check"></i> */}
            </span>
          </p>
        </div>
        <label className="label is-marginless">Handedness</label>
        <div class="field">
          <div class="control">
            <div class="select is-success">
              <select id="handedness">
                <option>Right</option>
                <option>Left</option>
              </select>
            </div>
          </div>
        </div>
        <div className="field">
          <p className="control">
            {/* <button id="register" className="button is-success" onClick="">
              Register
            </button> */}
            <Link to="/roster" id="create" className="button is-success" type="button">Create</Link>
          </p>
        </div>
        <Link to='/'>Back to Landing Page</Link>
      </div>
    )
  }
}
