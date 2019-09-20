import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Form, Field, SubmissionError } from 'redux-form';
import { connect, reduxForm } from '../../decorators';

const mapStateToProps = ({ channelRenameModal, channels }) => ({ channelRenameModal, channels });

@connect(mapStateToProps)
@reduxForm('channelRenameForm')
export default class ChannelRenameModal extends Component {
  onModalClose = (id, name) => () => {
    const { showChannelRenameModal } = this.props;

    showChannelRenameModal({ id, name, show: false });
  }

  onSubmit = (id, name) => async (values) => {
    const { renameChannel, reset, channels } = this.props;

    const hasName = Object.values(channels.byId).some(val => val.name === values.name);

    if (hasName) {
      throw new SubmissionError({ _error: 'Такое название канала уже существует' });
    }

    try {
      await renameChannel({ id, ...values  });
    } catch(e) {
      throw new SubmissionError({ _error: e.message });
    }
    
    this.onModalClose(id, name)();
    reset();
  }

  render() {
    const { channelRenameModal, handleSubmit, submitting, error, pristine } = this.props;
    const { id, name, show } = channelRenameModal;

    return (
      <Modal show={show} onHide={this.onModalClose(id, name)}>
        <Modal.Header closeButton>
          <Modal.Title>Переименование канала</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit(this.onSubmit(id, name))}>
          <Modal.Body>
            <label className="d-flex flex-column">
              <div className="mb-2">Введите новое название канала "{name}"</div>
              <Field name="name" className="form-control" component="input" required/>
              {error && <div className="text-danger mt-2">{error}</div>}
            </label>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.onModalClose(id, name)}>
              Отменить
            </Button>
            <Button variant="primary" 
                    type="submit"
                    disabled={submitting || pristine}>
              Переименовать
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
};
