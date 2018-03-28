import React, {Component} from 'react';

// material-ui-beta stuff
import CssBaseline from 'material-ui/CssBaseline';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

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
      <CssBaseline/>
      <header className="App-header">
        <h1 className="App-title">Dad Joke Engine</h1>
      </header>
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <h1>Jokes!</h1>
        </Grid>
        <Grid item xs={12} md={6}>
          <h2>Random hilarity</h2>
          <Button variant="raised" color="primary">
            Get a Random Joke
          </Button>
          <button onClick={() => this.combinedJoke(this.state.searchTerm)}>Get a Random Joke</button>
        </Grid>
        <Grid item xs={12} md={6}>
          <h2>Search for a joke</h2>
          <form onSubmit={this.handleSubmit}>
            <input type='text' onChange={this.handleChange} value={this.state.searchTerm}/>
            <button type='submit'>Search</button>
          </form>
        </Grid>
        <Grid item xs={12}>
          {allJokes}
        </Grid>
      </Grid>
    </div>);
  }
}

export default App;
