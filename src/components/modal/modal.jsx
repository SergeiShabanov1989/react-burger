import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import modalStyles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
const modalRoot = document.getElementById('react-modals');

export const Modal = ({ children, setIsOpenModal }) => {
  useEffect(() => {
    const closeOnEscModal = (e) => {
      if (e.keyCode === 27) {
        setIsOpenModal(false);
      }
    };
    window.addEventListener('keydown', closeOnEscModal);
    return () => window.removeEventListener('keydown', closeOnEscModal);
  }, []);

  return createPortal(
    <>
      <div
        className={modalStyles.modal}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div
          className={modalStyles.close_overlay}
          onClick={() => setIsOpenModal(false)}
        >
          <CloseIcon type="primary" />
        </div>
        {children}
      </div>
    </>,
    modalRoot
  );
};

Modal.propTypes = {
  children: PropTypes.node,
  setIsOpenModal: PropTypes.func,
};