import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom'

export default class Roster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      redirect: false,
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

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      window.localStorage.clear();
      return <Redirect to='/' />
    }
  }

  render() {
    return (
      <div className="p-6">
      {this.renderRedirect()}
        <h1 className="">Roster</h1>
        <table className="">
          <thead>
            <tr>
              <td>FN</td>
              <td>LN</td>
              <td>Rating</td>
              <td>Handed</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {this.state.players.map( (player, index) => (
              <tr key={index}>
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
        <button 
          className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded" 
          onClick={this.setRedirect}
        >
        Log Out
        </button>
      </div>
    )
  }
}
