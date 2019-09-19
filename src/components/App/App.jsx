import React, { Component } from 'react';
import Chat from '../Chat';
import Channels from '../Channels';
import UserContext from '../../UserContext';
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

export default class App extends Component {
  static contextType = UserContext;

  onChannelCreate = () => {
    console.log('onChannelCreate');
  }

  render() {
    return (
      <Row className="my-4">
        <Col xs="4">
          <h6 className="mb-4 mt-2">
            Пользователь: {this.context}
          </h6>
          <a className="d-inline-flex mb-4 text-info align-items-center" 
             style={{cursor: "pointer"}} 
             onClick={this.onChannelCreate}>
            <FontAwesomeIcon icon={faPlusCircle} className="mr-1"/> Создать новый канал
          </a>
          <Channels/>
        </Col>
        <Col xs="8">
          <Chat/>
        </Col>
      </Row>
    );
  }
};
