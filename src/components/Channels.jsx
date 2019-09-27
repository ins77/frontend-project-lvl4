import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import EntityContext from '../EntityContext';
import connect from '../decorators/connect';

const mapStateToProps = ({ channels, currentChannelId }) => (
  {
    channels: channels.allIds.map(id => channels.byId[id]),
    currentChannelId,
  }
);

@connect(mapStateToProps)
class Channels extends Component {
  static contextType = EntityContext;

  onChannelClick = id => () => {
    const { changeChannel } = this.props;
    changeChannel({ currentChannelId: id });
  }

  onChannelEdit = (id, name) => (event) => {
    event.stopPropagation();

    const { showChannelRenameModal } = this.props;

    showChannelRenameModal({ id, name, show: true });
  }

  onChannelRemove = ({ id, name }) => (event) => {
    event.stopPropagation();

    const { showChannelRemoveModal } = this.props;

    showChannelRemoveModal({ id, name, show: true });
  }

  render() {
    const { channels, currentChannelId } = this.props;

    return (
      <ListGroup>
        {channels.map(({ id, name, removable }) => (
          <ListGroup.Item action
                          variant="primary"
                          key={id}
                          className="d-flex align-items-baseline text-truncate"
                          active={currentChannelId === id}
                          onClick={this.onChannelClick(id)}>
            {name}
            {removable && <div className="ml-auto">
              <a className="py-1 px-2">
                <FontAwesomeIcon icon={faEdit} onClick={this.onChannelEdit(id, name)}/>
              </a>
              <a className="py-1 px-2">
                <FontAwesomeIcon icon={faTrashAlt} onClick={this.onChannelRemove({ id, name })}/>
              </a>
            </div>}
          </ListGroup.Item>
        ))}
      </ListGroup>
    );
  }
}

export default Channels;
