import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Roster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
    };
  }
  
  componentDidMount() {
    this.getPlayers();
  }

  getPlayers = () => {
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
    const { players } = this.state;
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
      this.getPlayers();
    });
  }

  render() {
    return (
      <div>
        <h1 className="title">Roster</h1>
        <table className="table">
          <thead>
            <tr>
              <td>First Name</td>
              <td>Last Name</td>
              <td>Rating</td>
              <td>Handedness</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {this.state.players.map( (player, index) => (
              <tr>
                <td key={player.id}>{player.first_name}</td>
                <td>{player.last_name}</td>
                <td>{player.rating}</td>
                <td>{player.handedness}</td>
                <td>
                  <button 
                    className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded" 
                    onClick={() => this.handleDelete(player.id, index)}
                  >DELETE</button>
                </td>
              </tr>
              ))}
          </tbody>   
        </table>
        <div className="my-8">
            <Link to='/player/new' className="bg-teal-500 hover:bg-teal-700 text-white py-2 px-3 rounded">Add Player</Link>
        </div>
      </div>
    )
  }
}
