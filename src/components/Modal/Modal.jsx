import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, Modals, Img } from './Modal.styled';

const modal = document.querySelector('#modal');

function Modal({ modalData, onClose }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    return () => {
      window.removeEventListener('keydown', handleKey);
    }
  });

   const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  const handleKey = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  }

    return createPortal(
      <Overlay onClick={handleBackdropClick}>
        <Modals>        
          <Img src={modalData} alt='' />
        </Modals>
      </Overlay>,
      modal
    );
}

export default Modal;

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  modalData: PropTypes.string.isRequired,
};




