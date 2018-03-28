import React, {Component} from 'react';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchTerm: '',
      combo: [
        {
          id: 1,
          joke: 'Fetching a dad joke'
        }
      ]
    }

    this.combinedJoke = this.combinedJoke.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.combinedJoke();
  }

  combinedJoke = (term) => {
    const url = (term)
      ? `https://icanhazdadjoke.com/search?term=${term}`
      : 'https://icanhazdadjoke.com/';
    fetch(url, {
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
        throw(error);
      }
    }).then(response => response.text()).then(body => {
      const jokes = JSON.parse(body);
      const allJokes = (jokes.results)
        ? jokes.results
        : [
          {
            id: 1,
            joke: jokes.joke
          }
        ];

      this.setState({combo: allJokes, searchTerm: ''});
    }).catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleChange = (event) => {
    this.setState({searchTerm: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.combinedJoke(this.state.searchTerm);
  }

  render() {
    const allJokes = this.state.combo.map(joke => <p key={joke.id}>{joke.joke}</p>);

    return (<div className="App">
      <header className="App-header">
        <h1 className="App-title">Dad Joke Engine</h1>
      </header>
          <h1>Jokes!</h1>
          <h2>Random hilarity</h2>
          <button onClick={() => this.combinedJoke(this.state.searchTerm)}>Get a Random Joke</button>
          <h2>Search for a joke</h2>
          <form onSubmit={this.handleSubmit}>
            <input type='text' onChange={this.handleChange} value={this.state.searchTerm}/>
            <button type='submit'>Search</button>
          </form>
          {allJokes}
    </div>);
  }
}

export default App;
