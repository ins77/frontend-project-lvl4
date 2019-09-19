import React, { Component } from 'react';
import UserContext from '../../UserContext';
import connect from '../../decorators/connect';
import { ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';

const mapStateToProps = ({ channels, currentChannelId }) => (
  { 
    channels: channels.allIds.map(id => channels.byId[id]),
    currentChannelId,
  }
);

@connect(mapStateToProps)
export default class Channels extends Component {
  static contextType = UserContext;

  onChannelClick = (id) => () => {
    const { changeChannel } = this.props;
    changeChannel({ currentChannelId: id });
  }

  onChannelEdit = (id, name) => (event) => {
    event.stopPropagation();
    console.log(1);
  }

  onChannelRemove = (id) => (event) => {
    event.stopPropagation();
    console.log(2);
  }

  render() {
    const { channels, currentChannelId } = this.props;

    return (
      <ListGroup>
        {channels.map(({ id, name }) => {
          return (
            <ListGroup.Item action
                            variant="primary"
                            key={id}
                            className="d-flex align-items-baseline"
                            active={currentChannelId === id}
                            onClick={this.onChannelClick(id)}>
              {name}
              <div className="ml-auto">
                <a className="py-1 px-2">
                  <FontAwesomeIcon icon={faEdit} onClick={this.onChannelEdit(id, name)}/>
                </a>
                <a className="py-1 px-2">
                  <FontAwesomeIcon icon={faTrashAlt} onClick={this.onChannelRemove(id)}/>
                </a>
              </div>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    );
  }
};