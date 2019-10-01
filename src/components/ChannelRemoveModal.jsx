import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Modal, Button } from 'react-bootstrap';
import { connect, reduxForm } from '../decorators';

const mapStateToProps = ({ channelRemoveModal, channelRemovingState }) => (
  {
    modal: channelRemoveModal,
    channelRemovingState,
  }
);

@withTranslation()
@connect(mapStateToProps)
@reduxForm('channelRemoveForm')
class ChannelRemoveModal extends Component {
  onModalClose = (id, name) => () => {
    const { showChannelRemoveModal } = this.props;

    showChannelRemoveModal({ id, name, show: false });
  }

  onButtonConfirmClick = (id, name) => async () => {
    const { removeChannel, changeChannel } = this.props;

    await removeChannel({ id });
    changeChannel({ currentChannelId: 1 });
    this.onModalClose(id, name)();
  }

  render() {
    const { modal: { show, id, name }, channelRemovingState, t } = this.props;
    const isRemovingFailed = channelRemovingState === 'failed';
    const isRemovingRequested = channelRemovingState === 'requested';

    return (
      <Modal show={show} onHide={this.onModalClose(id, name)}>
        <Modal.Header closeButton>
          <Modal.Title>{t('modal.remove.title')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {t('modal.remove.label')} &ldquo;{name}&rdquo;?
          {isRemovingFailed && <div className="text-alert mt-2">{t('modal.remove.error')}</div>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.onModalClose(id, name)}>
            {t('button.no')}
          </Button>
          <Button variant="primary"
                  onClick={this.onButtonConfirmClick(id, name)}
                  type="submit"
                  disabled={isRemovingRequested}>
            {t('button.yes')}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ChannelRemoveModal;
