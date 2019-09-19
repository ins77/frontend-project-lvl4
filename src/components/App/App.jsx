import React, { Component } from 'react';
import Chat from '../Chat';
import Channels from '../Channels';
import UserContext from '../../UserContext';
import { Row, Col } from 'react-bootstrap';

export default class App extends Component {
  static contextType = UserContext;

  render() {
    return (
      <Row className="my-4">
        <Col xs="4">
          <h6 className="mb-4 mt-2">
            Пользователь: {this.context}
          </h6>
          <Channels/>
        </Col>
        <Col xs="8">
          <Chat/>
        </Col>
      </Row>
    );
  }
};
