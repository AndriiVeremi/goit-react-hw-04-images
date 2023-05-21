import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, Modals, Img } from './Modal.styled';

const modal = document.querySelector('#modal');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKey);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKey);
  }

  handleKey = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {

    return createPortal(
      <Overlay onClick={this.handleBackdropClick || this.handleKey}>
        <Modals>        
          <Img src={this.props.modalData} alt='' />
        </Modals>
      </Overlay>,
      modal
    );
  }
}

export default Modal;

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  modalData: PropTypes.string.isRequired,
};
