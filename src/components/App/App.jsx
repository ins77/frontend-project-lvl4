import React, { Component } from 'react';
import Chat from '../Chat';
import Channels from '../Channels';
import UserContext from '../../UserContext';

export default class App extends Component {
  static contextType = UserContext;

  render() {
    return (
      <div className="row my-4">
        <div className="col-4">
          <h6 className="mb-4 mt-2">
            Пользователь: {this.context}
          </h6>
          <Channels/>
        </div>
        <div className="col-8">
          <Chat/>
        </div>
      </div>
    );
  }
};
