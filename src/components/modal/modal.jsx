import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import { ESC_KEYCODE } from '../utils/constants';
import { setIsModalIngredientOpen } from '../../services/viewable-ingredient/reducer';
import { setIsModalOrderOpen } from '../../services/order-details/reducer';

import modalStyles from './modal.module.css';

const modalRoot = document.getElementById('react-modals');

export const Modal = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const closeOnEscModal = (e) => {
      if (e.keyCode === ESC_KEYCODE) {
        dispatch(setIsModalIngredientOpen(false))
        dispatch(setIsModalOrderOpen(false));
      }
    };
    window.addEventListener('keydown', closeOnEscModal);
    return () => window.removeEventListener('keydown', closeOnEscModal);
    // устанавливаем слушатель только при первом рендере, поэтому убираем проверку eslint
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return createPortal(
    <>
      <ModalOverlay>
        <div
          className={modalStyles.modal}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div
            className={modalStyles.close_overlay}
            onClick={() => {
              dispatch(setIsModalIngredientOpen(false))
              dispatch(setIsModalOrderOpen(false));
            }}
          >
            <CloseIcon type="primary" />
          </div>
          {children}
        </div>
      </ModalOverlay>
    </>,
    modalRoot
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};
