import React, { Component } from 'react'

export default class Roster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
    };
  }

  componentDidMount() {
    fetch('https://players-api.developer.alchemy.codes/api/players', {
        method: 'GET',
        headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + window.localStorage.jwt
        }
      })
      .then(response => response.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        response.success === true &&
        this.setState({
          players: response.players
        })
      });
  }

  handleDelete(id) {
    fetch(`https://players-api.developer.alchemy.codes/api/players/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + window.localStorage.jwt
      }
    })
    .then(response => response.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      response.success === true &&
      this.setState({ state: this.state });
    });
  }

  render() {
    return (
      <div>
        <h1 className="title">Roster</h1>
        <table className="table">
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Rating</th>
          <th>Handedness</th>
          <th></th>
        </tr>
        {this.state.players.map(player => (
          <tr>
            <th key={player.id}>{player.first_name}</th>
            <th>{player.last_name}</th>
            <th>{player.rating}</th>
            <th>{player.handedness}</th>
            <th>
              <button 
                className="delete is-danger" 
                onClick={() => this.handleDelete(player.id)}
              />
            </th>
          </tr>
          ))}
        </table>
      </div>
    )
  }
}
