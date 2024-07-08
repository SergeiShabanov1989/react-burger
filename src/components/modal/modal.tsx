import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalOverlay } from '../modal-overlay/modal-overlay';

import modalStyles from './modal.module.css';

const modalRoot = document.getElementById('react-modals')!;

type TModalProps = {
  children: React.ReactNode;
  onClose: () => void;
};

export const Modal = ({ children, onClose }: TModalProps): JSX.Element => {
  useEffect(() => {
    const closeOnEscModal = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', closeOnEscModal);
    return () => window.removeEventListener('keydown', closeOnEscModal);
    // устанавливаем слушатель только при первом рендере, поэтому убираем проверку eslint
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return createPortal(
    <>
      <ModalOverlay onClose={onClose}>
        <div
          className={modalStyles.modal}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div
            className={modalStyles.close_overlay}
            onClick={() => {
              onClose();
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
