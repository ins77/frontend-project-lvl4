import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect, reduxForm } from '../decorators';

const mapStateToProps = ({ channelRemoveModal, channelRemovingState }) => (
  {
    modal: channelRemoveModal,
    channelRemovingState,
  }
);

@connect(mapStateToProps)
@reduxForm('channelRemoveForm')
class ChannelRemoveModal extends Component {
  onModalClose = (id, name) => () => {
    const { channelRemoveModal } = this.props;

    channelRemoveModal({ id, name, show: false });
  }

  onButtonConfirmClick = (id, name) => async () => {
    const { removeChannel, changeChannel } = this.props;

    await removeChannel({ id });
    changeChannel({ currentChannelId: 1 });
    this.onModalClose(id, name)();
  }

  render() {
    const { modal: { show, id, name }, channelRemovingState } = this.props;
    const isRemovingFailed = channelRemovingState === 'failed';
    const isRemovingRequested = channelRemovingState === 'requested';

    return (
      <Modal show={show} onHide={this.onModalClose(id, name)}>
        <Modal.Header closeButton>
          <Modal.Title>Удаление канала</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Вы точно хотите удалить канал &ldquo;{name}&rdquo;?
          {isRemovingFailed && <div className="text-alert mt-2">Произошла ошибка. Попробуйте еще раз.</div>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.onModalClose(id, name)}>
            Нет
          </Button>
          <Button variant="primary"
                  onClick={this.onButtonConfirmClick(id, name)}
                  type="submit"
                  disabled={isRemovingRequested}>
            Да
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ChannelRemoveModal;
