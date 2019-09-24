import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Form, Field, SubmissionError } from 'redux-form';
import { connect, reduxForm } from '../decorators';
import Validators from '../common/Validators';

const mapStateToProps = ({ channelCreateModal, channels }) => ({
  show: channelCreateModal,
  channels: channels.allIds.map(id => channels.byId[id]),
});

@connect(mapStateToProps)
@reduxForm('channelCreateForm')
class ChannelCreateModal extends Component {
  onModalClose = () => {
    const { showChannelCreateModal } = this.props;

    showChannelCreateModal(false);
  }

  onSubmit = async (values) => {
    const { addChannel, reset, channels } = this.props;

    if (Validators.isChannelNameValid(channels, values.name)) {
      throw new SubmissionError({ _error: 'Такое название канала уже существует' });
    }

    try {
      await addChannel({ ...values });
    } catch (e) {
      throw new SubmissionError({ _error: e.message });
    }

    this.onModalClose();
    reset();
  }

  render() {
    const {
      show,
      handleSubmit,
      submitting,
      error,
      pristine,
    } = this.props;

    return (
      <Modal show={show} onHide={this.onModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Создание нового канала</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit(this.onSubmit)}>
          <Modal.Body>
            <label className="d-flex flex-column">
              <div className="mb-2">Введите название нового канала</div>
              <Field name="name" className="form-control" component="input" required/>
              {error && <div className="text-danger mt-2">{error}</div>}
            </label>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.onModalClose}>
              Отменить
            </Button>
            <Button variant="primary"
                    type="submit"
                    disabled={submitting || pristine}>
              Создать
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}

export default ChannelCreateModal;