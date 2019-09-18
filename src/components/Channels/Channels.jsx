import React, { Component } from 'react';
import UserContext from '../../UserContext';
import connect from '../../decorators/connect';
import cn from 'classnames';

const mapStateToProps = ({ channels, currentChannelId }) => (
  { 
    channels: channels.allIds.map(id => channels.byId[id]),
    currentChannelId,
  }
);

@connect(mapStateToProps)
export default class Channels extends Component {
  static contextType = UserContext;

  render() {
    const { channels, currentChannelId } = this.props;

    return (
      <ul className="list-group">
        {
          channels.map(({ id, name }) => {
            const classes = cn({
              'list-group-item': true,
              'active': currentChannelId === id,
            });
            return <li key={id} className={classes}>{name}</li>;
          })
        }
      </ul>
    );
  }
};