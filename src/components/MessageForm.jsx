import React, { Component } from 'react';
import { Field, SubmissionError } from 'redux-form';
import { Form, Button } from 'react-bootstrap';
import { connect, reduxForm } from '../decorators';
import EntityContext from '../EntityContext';

const mapStateToProps = ({ currentChannelId }) => ({ currentChannelId });

@connect(mapStateToProps)
@reduxForm('sendMessage')
class MessageForm extends Component {
  static contextType = EntityContext;

  onSubmit = async (values) => {
    const { addMessage, currentChannelId, reset } = this.props;
    const { userName } = this.context;
    const message = {
      channelId: currentChannelId,
      userName,
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
    const {
      handleSubmit,
      pristine,
      submitting,
      error,
    } = this.props;

    return (
      <>
        {error && <div className="text-danger mb-2">{error}</div>}
        <Form className="d-flex" onSubmit={handleSubmit(this.onSubmit)}>
          <Field name="message" component="textarea" className="form-control" style={{ resize: 'none' }}/>
          <Button variant="primary" className="ml-2" type="submit" disabled={submitting || pristine}>Отправить</Button>
        </Form>
      </>
    );
  }
}

export default MessageForm;
