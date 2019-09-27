import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import Chat from './Chat';
import Channels from './Channels';
import EntityContext from '../EntityContext';
import { connect } from '../decorators';

@connect()
class App extends Component {
  static contextType = EntityContext;

  onChannelCreate = () => {
    const { channelCreateModal } = this.props;

    channelCreateModal({ show: true });
  }

  render() {
    const { userName } = this.context;

    return (
      <Row className="vh-100 py-4">
        <Col xs="4" className="d-flex flex-column h-100">
          <h6 className="mb-4 mt-2">
            Пользователь: {userName}
          </h6>
          <Button variant="info" className="d-inline-flex mb-4 align-items-center"
             onClick={this.onChannelCreate}>
            <FontAwesomeIcon icon={faPlusCircle} className="mr-2"/> Создать канал
          </Button>
          <div className="overflow-auto">
            <Channels/>
          </div>
        </Col>
        <Col xs="8" className="d-flex flex-column h-100">
          <Chat/>
        </Col>
      </Row>
    );
  }
}

export default App;
