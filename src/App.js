import React from 'react';
import { Container, Nav } from './m-components'

import SwitchContainer from './components/SwitchContainer';

const App = props => (
  <Container>
    <Nav
      title="Dad Jokes"
    />
    <SwitchContainer
      fetchJokes={this.fetchJokes}
    />
  </Container>
);

export default App;
