import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      joke: ''
    }
  }

  componentDidMount() {
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
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Dad Joke Engine</h1>
        </header>

        <p>
          {this.state.joke}
        </p>
        <form>
          <button type='submit'>Give me another!</button>
        </form>

      </div>
    );
  }
}

export default App;
