import React, { Component } from 'react';
import connect from '../../decorators/connect';
import MessageForm from '../MessageForm';
import cn from 'classnames';
import UserContext from '../../UserContext';

const mapStateToProps = ({ messages }) => ({
    messages: messages.allIds.map(id => messages.byId[id])
});

@connect(mapStateToProps)
export default class Chat extends Component {
  static contextType = UserContext;

  render() {
    const { messages } = this.props;
  
    return (
      <div className="d-flex flex-column" style={{minHeight: "90vh"}}>
        <div className="row my-2">
          <div className="col-12">
            <ul className="list-unstyled">
              {
                messages.map(({ id, message, userName }) => {
                  const classes = cn({
                    'text-right': userName === this.context,
                    'text-primary': userName !== this.context,
                    'mb-2': true,
                  });

                  return <li key={id} className={classes}>{message}</li>;
                })
              }
            </ul>
          </div>
        </div>
        <div className="row mb-2 mt-auto">
          <div className="col-12">
            <MessageForm/>
          </div>
        </div>
      </div>
    );
  }
};
