import React, {Component} from 'react';
import { Container, Row, Column, Nav, Card } from './m-components'

import SwitchContainer from './components/SwitchContainer';

class App extends Component {
  state = {
      combo: [{ id: 1, joke: 'Fetching a dad joke'}]
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
          combo: allJokes
        });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    const allJokes = this.state.combo.map(joke => <Card key={joke.id}>{joke.joke}</Card>);

    return (
      <Container>
        <Nav title="Dad Jokes"></Nav>
        <SwitchContainer
          fetchJokes={this.fetchJokes}
        />
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
