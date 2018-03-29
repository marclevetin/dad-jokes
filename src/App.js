import React, {Component} from 'react';
import { Container, Row, Column, Nav, Switch, Card } from './m-components'

import RandomJokeContainer from './components/RandomJokeContainer';
import SearchJokeContainer from './components/SearchJokeContainer';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      combo: [{
                id: 1,
                joke: 'Fetching a dad joke'
              }],
      toggle: true
    }

    this.combinedJoke = this.combinedJoke.bind(this);
  }

  componentDidMount() {
    this.combinedJoke();
  }

  combinedJoke = (term) => {
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
        const allJokes = (jokes.results) ? jokes.results : [{ id: 1, joke: jokes.joke }];

        this.setState({
          combo: allJokes
        });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
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
                            searchTerm={''}
                          />
                        : <SearchJokeContainer
                            handleSubmit={this.handleSubmit}
                            combinedJoke={this.combinedJoke}
                          />

    return (
      <Container>
        <Nav title="Dad Jokes"></Nav>
        <Row>
          <Column styles={'s12 center-align'}>
            <Switch
              on='Random'
              off='Search'
              value={this.state.toggle}
              onChange={this.toggleSwitch}
            />
          </Column>
        </Row>
        <Row>
          <Column styles={'s12 center-align'}>
            {jokeForm}
          </Column>
        </Row>
        <Row>
          <Column styles={'s12'}>
            {allJokes}
          </Column>
        </Row>
      </Container>
    );
  }
}

export default App;
