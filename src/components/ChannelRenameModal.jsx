import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import { Form, Field, SubmissionError } from 'redux-form';
import { connect, reduxForm } from '../decorators';
import Validators from '../common/Validators';

const mapStateToProps = ({ channelRenameModal, channels }) => ({
  modal: channelRenameModal,
  channels: channels.allIds.map(id => channels.byId[id]),
});

@withTranslation()
@connect(mapStateToProps)
@reduxForm('channelRenameForm')
class ChannelRenameModal extends Component {
  onModalClose = (id, name) => () => {
    const { showChannelRenameModal } = this.props;

    showChannelRenameModal({ id, name, show: false });
  }

  onSubmit = (id, name) => async (values) => {
    const {
      renameChannel,
      reset,
      channels,
      t,
    } = this.props;

    if (Validators.isChannelNameValid(channels, values.name)) {
      throw new SubmissionError({ _error: t('existingChannelName') });
    }

    try {
      await renameChannel({ id, ...values });
    } catch (e) {
      throw new SubmissionError({ _error: e.message });
    }

    this.onModalClose(id, name)();
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
    const { id, name, show } = modal;

    return (
      <Modal show={show} onHide={this.onModalClose(id, name)}>
        <Modal.Header closeButton>
          <Modal.Title>{t('modal.rename.title')}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit(this.onSubmit(id, name))}>
          <Modal.Body>
            <label className="d-flex flex-column">
              <div className="mb-2">{t('modal.rename.label')} &ldquo;{name}&rdquo;</div>
              <Field name="name" className="form-control" component="input" required/>
              {error && <div className="text-danger mt-2">{error}</div>}
            </label>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.onModalClose(id, name)}>
              {t('button.cancel')}
            </Button>
            <Button variant="primary"
                    type="submit"
                    disabled={submitting || pristine}>
              {t('button.rename')}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}

export default ChannelRenameModal;
