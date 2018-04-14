import React, {Component} from 'react';
import { Container, Nav } from './m-components'

import SwitchContainer from './components/SwitchContainer';
import AllJokesContainer from './components/AllJokesContainer';

class App extends Component {
  state = {
      allJokes: [{ id: 1, joke: 'Fetching a dad joke'}]
  }

  componentDidMount() {
    this.fetchJokes();
  }

  fetchJokes = (term) => {
    const url = (term) ? `https://icanhazdadjoke.com/search?term=${term}` : 'https://icanhazdadjoke.com/';

    fetch(url, { headers: { 'Accept': 'application/json' }})
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.text()).then(body => {
        const jokes = JSON.parse(body);
        let allJokes = []
        if (jokes.search_term === undefined) {
          // if undefined, then the fetch must have looked for a random joke
          // when using the search parameter, a blank or empty term returns a response in the search format
          allJokes = [{ id: 1, joke: jokes.joke }];
        } else if (jokes.search_term !== undefined && jokes.results.length === 0) {
          // empty results means an empty message should appear.
          allJokes = [{ id: 1, joke: "No results were found.  Try again." }];
        } else if (jokes.search_term !== undefined && jokes.results.length !== 0) {
          // must have gotten results than can be shown.
          allJokes = jokes.results;
        }

        this.setState({
          allJokes: allJokes
        });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    return (
      <Container>
        <Nav
          title="Dad Jokes"
        />
        <SwitchContainer
          fetchJokes={this.fetchJokes}
        />
        <AllJokesContainer
          allJokes={this.state.allJokes}
        />
      </Container>
    );
  }
}

export default App;
