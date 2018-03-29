import React from 'react';

const RandomJokeContainer = props => (
    <React.Fragment>
      <h2>Random</h2>
      <button className="btn waves-effect waves-light blue darken-3" onClick={() => props.combinedJoke(props.searchTerm)}>Get a Random Joke</button>
    </React.Fragment>
);

export default RandomJokeContainer;
