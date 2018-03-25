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
                      debugger;
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
  }

  render() {
    const jokesArray = (this.state.jokes) ? this.state.jokes.map(joke => <p key={joke.id} >{joke.joke}</p>) : '';

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Dad Joke Engine</h1>
        </header>

        <p>
          {this.state.joke}
        </p>
        <form onSubmit={this.handleSubmit}>
          <input type='text' onChange={this.handleChange} value={this.state.searchTerm}/>
          <button type='submit'>Give me another!</button>
        </form>
        <h1>search results</h1>
        {jokesArray}
      </div>
    );
  }
}

export default App;
