import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import { Form, Field, SubmissionError } from 'redux-form';
import { connect, reduxForm } from '../decorators';
import Validators from '../common/Validators';

const mapStateToProps = ({ channelCreateModal, channels }) => ({
  modal: channelCreateModal,
  channels: channels.allIds.map(id => channels.byId[id]),
});

@withTranslation()
@connect(mapStateToProps)
@reduxForm('channelCreateForm')
class ChannelCreateModal extends Component {
  onModalClose = () => {
    const { showChannelCreateModal } = this.props;

    showChannelCreateModal({ show: false });
  }

  onSubmit = async (values) => {
    const {
      addChannel,
      reset,
      channels,
      t,
    } = this.props;

    if (Validators.isChannelNameValid(channels, values.name)) {
      throw new SubmissionError({ _error: t('existingChannelName') });
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
      modal,
      handleSubmit,
      submitting,
      error,
      pristine,
      t,
    } = this.props;

    return (
      <Modal show={modal} onHide={this.onModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t('modal.create.title')}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit(this.onSubmit)}>
          <Modal.Body>
            <label className="d-flex flex-column">
              <div className="mb-2">{t('modal.create.label')}</div>
              <Field name="name" className="form-control" component="input" required/>
              {error && <div className="text-danger mt-2">{error}</div>}
            </label>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.onModalClose}>
              {t('button.cancel')}
            </Button>
            <Button variant="primary"
                    type="submit"
                    disabled={submitting || pristine}>
              {t('button.create')}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}

export default ChannelCreateModal;
