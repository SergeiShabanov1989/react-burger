import overlayStyles from './modal-overlay.module.css';

export const ModalOverlay = ({ children }) => {
  return <div className={`${overlayStyles.modal_overlay}`}>
    {children}
  </div>;
};
