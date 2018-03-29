import React, { Component } from 'react';
import { Row, Column, Switch } from '../m-components';

import RandomJokeContainer from './RandomJokeContainer';
import SearchJokeContainer from './SearchJokeContainer';
import AllJokesContainer from './AllJokesContainer';

class SwitchContainer extends Component {
  state = {
    toggle: true,
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
        const allJokes = (jokes.results) ? jokes.results : [{ id: 1, joke: jokes.joke }];

        this.setState({
          allJokes: allJokes
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
    const jokeForm = (this.state.toggle)
                        ? <RandomJokeContainer
                            fetchJokes={this.fetchJokes}
                          />
                        : <SearchJokeContainer
                            fetchJokes={this.fetchJokes}
                          />;

    return(
      <React.Fragment>
        <Row>
          <Column styles={'s12 center-align'}>
            <Switch
              on='Random'
              off='Search'
              value={this.state.toggle}
              onChange={this.toggleSwitch}
            />
            {jokeForm}
          </Column>
        </Row>
        <AllJokesContainer
          allJokes={this.state.allJokes}
        />
      </React.Fragment>
    )
  }
}

export default SwitchContainer;
