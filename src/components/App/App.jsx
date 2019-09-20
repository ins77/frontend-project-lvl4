import React, { Component } from 'react';
import Chat from '../Chat';
import Channels from '../Channels';
import EntityContext from '../../EntityContext';
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { connect } from '../../decorators';

@connect(() => ({}))
export default class App extends Component {
  static contextType = EntityContext;

  onChannelCreate = () => {
    const { showChannelCreateModal } = this.props;

    showChannelCreateModal(true);
  }

  render() {
    const { userName } = this.context;

    return (
      <Row>
        <Col xs="4" className="d-flex flex-column b-app-height">
          <h6 className="mb-4 mt-2">
            Пользователь: {userName}
          </h6>
          <a className="d-inline-flex mb-4 text-info align-items-center b-cursor-pointer"
             onClick={this.onChannelCreate}>
            <FontAwesomeIcon icon={faPlusCircle} className="mr-1"/> Создать новый канал
          </a>
          <div className="b-scrollbar">
            <Channels/>
          </div>
        </Col>
        <Col xs="8" className="d-flex flex-column b-app-height">
          <Chat/>
        </Col>
      </Row>
    );
  }
};
