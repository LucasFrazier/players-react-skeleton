import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom'

export default class Roster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      redirect: false,
      deleteSuccessful: false,
      somethingWentWrong: false,
    };
  }
  
  componentWillMount() {
    if (!window.localStorage.user) {
      this.props.history.push("/");
    }
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
    .then(response => {
      if (response.success) {
        this.setState({
          deleteSuccessful: true
        })
        this.getPlayers();
      } else {
        this.setState({
          somethingWentWrong: true,
        });
      }
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
      return <Redirect to='/login' />
    }
  }

  render() {
    return (
      <div className="p-6">
      {this.renderRedirect()}
        <h1 className="font-bold text-2xl uppercase">Roster</h1>
        <table className="w-full table-auto">
          <thead>
            <tr className="font-semibold border-b-4 border-red-700">
              <td className="pr-16">NAME</td>
              <td className="pr-4">CHOPS</td>
              <td className="">HANDED</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {this.state.players.map( (player, index) => (
              <tr key={index} className="border-b-2 border-red-700">
                <td key={player.id}>{player.first_name} {player.last_name}</td>
                <td>{player.rating}</td>
                <td className="capitalize">{player.handedness}</td>
                <td>
                  <button 
                    className="delete bg-black text-white py-1 px-2 rounded-full" 
                    onClick={() => this.handleDelete(player.id, index)}
                  >X</button>
                </td>
              </tr>
              ))}
          </tbody>   
        </table>
        <div className="my-8">
            <Link to='/player/new' className="bg-red-700 text-white font-semibold py-2 px-3 rounded">ADD PLAYER</Link>
        </div>

        {this.state.deleteSuccessful && <p className="mt-3 text-red-500">Another Soul Saved!</p>}
        {this.state.somethingWentWrong && <p className="text-red-500">Something Went Wrong!</p>}

      </div>
    )
  }
}
