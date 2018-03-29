import React from 'react';
import { Row, Column, Card } from '../m-components'

const AllJokes = props => {


  return (
    <React.Fragment>
      <Row>
        <Column styles={'s12'}>
          {props.allJokes}
        </Column>
      </Row>
    </React.Fragment>
)};

export default AllJokes;
