import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    joke: 'Finding a dad joke',
    jokes: '',
    searchTerm: ''
  }

  searchForJokes = () => {
    const searchTerm = this.state.searchTerm
    fetch(`https://icanhazdadjoke.com/search?term=${searchTerm}`, { headers: { 'Accept': 'application/json' } })
      .then(response => {
                          if (response.ok) {
                            return response;
                          } else {
                            let errorMessage = `${response.status} (${response.statusText})`,
                              error = new Error(errorMessage);
                            throw (error);
                          }
                        })
      .then(response => response.text())
      .then(body => {
                      const jokes = JSON.parse(body)
                      this.setState({ jokes: jokes.results })
                    })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  fetchSingleJoke = () => {
    fetch('https://icanhazdadjoke.com/', { headers: { 'Accept': 'application/json' } })
      .then(response => {
                          if (response.ok) {
                            return response;
                          } else {
                            let errorMessage = `${response.status} (${response.statusText})`,
                              error = new Error(errorMessage);
                            throw (error);
                          }
                        })
      .then(response => response.text())
      .then(body => {
                      const joke = JSON.parse(body)
                      this.setState({ joke: joke.joke })
                    })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  componentDidMount() {
    this.fetchSingleJoke();
  }

  handleChange = (event) => {
    this.setState({searchTerm: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.searchForJokes();
    this.setState({
      searchTerm: ''
    })
  }

  refreshPage = () => {
    window.location.reload()
  }

  render() {
    const jokesArray = (this.state.jokes) ? this.state.jokes.map(joke => <p key={joke.id} >{joke.joke}</p>) : <p>{this.state.joke}</p>;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Dad Joke Engine</h1>
        </header>

        <h1>Jokes!</h1>
        <button onClick={this.refreshPage}>Get a random joke</button>
        {jokesArray}
        <h2>Search for a joke</h2>
        <form onSubmit={this.handleSubmit}>
          <input type='text' onChange={this.handleChange} value={this.state.searchTerm}/>
          <button type='submit'>Search</button>
        </form>
      </div>
    );
  }
}

export default App;
