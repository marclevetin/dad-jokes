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
      ],
      toggle: true
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

  toggleSwitch = (event) => {
    const currentState = this.state.toggle;
    this.setState({
      toggle: !currentState
    })
  }

  render() {
    const allJokes = this.state.combo.map(joke => <Card key={joke.id}>{joke.joke}</Card>);
    const jokeForm = (this.state.toggle)
                        ? <RandomJokeContainer
                            combinedJoke={this.combinedJoke}
                            searchTerm={this.state.searchTerm}
                          />
                        : <SearchJokeContainer
                            handleChange={this.handleChange}
                            handleSubmit={this.handleSubmit}
                            searchTerm={this.state.searchTerm}
                          />

    return (
      <div className = "container" >
        <div className="row">
          <nav>
            <div className="nav-wrapper blue">
              <a className="brand-logo center">Dad Joke Engine</a>
            </div>
          </nav>
      </div>
    <div className="row">
      <div className="col s12 center-align">
      <div className="switch">
        <label>
          Random
          <input type="checkbox" value={this.state.toggle} onChange={this.toggleSwitch}/>
            <span className="lever"></span>
            Search
        </label>
        </div>
    </div>
    </div>
    <div className="row">
      <div className="col s12 center-align">
        {jokeForm}
      </div>
    </div>
    <div className="row">
      <div className="col s12">
        {allJokes}
      </div>
    </div>
      </div>
    );
  }
}

const Card = props => {
  return(
      <div className="card blue darken-1">
        <div className="card-content white-text flow-text">
          <i className="material-icons">tag_faces</i> {props.children}
        </div>
      </div>
    )
}

const RandomJokeContainer = props => (
    <React.Fragment>
  <h2>Random hilarity</h2>
  <button className="btn waves-effect waves-light blue darken-3" onClick={() => props.combinedJoke(props.searchTerm)}>Get a Random Joke</button>
</React.Fragment>
)

const SearchJokeContainer = props => (
  <React.Fragment>
  <h2>Search for a joke</h2>
  <form onSubmit={props.handleSubmit}>
    <div className="input-field">
    <input id="search" className="input-field" type='text' onChange={props.handleChange} value={props.searchTerm}/>
    <label htmlFor="search">Search term</label>
    </div>
    <button className="btn waves-effect waves-light blue darken-3" type='submit'>Search</button>
  </form>
</React.Fragment>
)


export default App;
