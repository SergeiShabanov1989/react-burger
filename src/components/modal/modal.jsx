import { createPortal } from 'react-dom';
import modalStyles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
const modalRoot = document.getElementById('react-modals');

export const Modal = ({ children }) => {
  return createPortal(
    <>
      <div className={modalStyles.modal}>
        <div className={modalStyles.close_overlay}>
          <CloseIcon type="primary" />
        </div>
        {children}
      </div>
    </>,
    modalRoot
  );
};
