import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import cn from 'classnames';
import connect from '../../decorators/connect';
import MessageForm from '../MessageForm';
import EntityContext from '../../EntityContext';


const mapStateToProps = ({ messages, currentChannelId }) => ({
  messages: messages.allIds
    .map(id => messages.byId[id])
    .filter(({ channelId }) => channelId === currentChannelId),
});

@connect(mapStateToProps)
class Chat extends Component {
  static contextType = EntityContext;

  render() {
    const { messages } = this.props;

    return (
      <div className="d-flex flex-column b-flex-grow b-overflow-hidden">
        <Row className="mt-2 mb-4 flex-column b-flex-grow b-overflow-hidden">
          <Col xs="12" className="d-flex b-overflow-hidden">
            <div className="d-flex flex-column align-items-start b-flex-grow b-scrollbar">
              {
                messages.map(({ id, message, userName }) => {
                  const isMe = userName === this.context.userName;
                  const messageType = isMe ? 'own' : 'other';
                  const classesMap = {
                    own: 'bg-info text-white align-self-end',
                    other: 'bg-light text-dark',
                  };

                  const classes = cn({
                    [classesMap[messageType]]: true,
                    'mb-2 mx-2 p-3 rounded': true,
                  });

                  return (
                    <div key={id} className={classes}>
                      {!isMe && <h6>{userName}:</h6>}
                      {message}
                    </div>
                  );
                })
              }
            </div>
          </Col>
        </Row>
        <Row className="mt-auto">
          <Col xs="12">
            <MessageForm/>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Chat;
