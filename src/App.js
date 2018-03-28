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
    const allJokes = this.state.combo.map(joke => <Card key={joke.id}>{joke.joke}</Card>);
    // const allJokes = this.state.combo.map(joke => <p key={joke.id}>{joke.joke}</p>);

    return (
      <div className = "container" >
        <div className="row">
          <nav>
            <div className="nav-wrapper">
              <a className="brand-logo center">Dad Joke Engine</a>
            </div>
          </nav>
      </div>
    <div className="row">
      <div className="col s12 m6">
        <h2>Random hilarity</h2>
        <button className="btn waves-effect waves-light" onClick={() => this.combinedJoke(this.state.searchTerm)}>Get a Random Joke</button>
      </div>
      <div className="col s12 m6">
        <h2>Search for a joke</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="input-field">
          <input id="search" className="input-field" type='text' onChange={this.handleChange} value={this.state.searchTerm}/>
          <label htmlFor="search">Search term</label>
          </div>
          <button className="btn waves-effect waves-light" type='submit'>Search</button>
        </form>
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
      <div className="card blue-grey darken-1">
        <div className="card-content white-text flow-text">
          <i className="material-icons">tag_faces</i> {props.children}
        </div>
      </div>
    )
}

export default App;
