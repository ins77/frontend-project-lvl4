import React, { Component } from 'react';
import { Field, SubmissionError } from 'redux-form';
import { connect, reduxForm } from '../../decorators';
import UserContext from '../../UserContext';
import { Form, Button } from 'react-bootstrap';

const mapStateToProps = ({ currentChannelId }) => ({ currentChannelId });

@connect(mapStateToProps)
@reduxForm('sendMessage')
export default class MessageForm extends Component {
  static contextType = UserContext;

  onSubmit = async (values) => {
    const { addMessage, currentChannelId, reset } = this.props;
    const message = {
      channelId: currentChannelId,
      userName: this.context,
      ...values, 
    };

    try {
      await addMessage(message);
    } catch (e) {
      throw new SubmissionError({ _error: e.message });
    }

    reset();
  };

  render() {
    const { handleSubmit, pristine, submitting, error } = this.props;

    return (
      <>
        {error && <div className="text-danger mb-2">{error}</div>}
        <Form className="d-flex" onSubmit={handleSubmit(this.onSubmit)}>
          <Field name="message" component="textarea" className="form-control" style={{resize: "none"}}/>
          <Button variant="primary" className="ml-2" type="submit" disabled={submitting || pristine}>Отправить</Button>
        </Form>
      </>
    );
  }
};
