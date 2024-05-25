import PropTypes from 'prop-types';
import overlayStyles from './modal-overlay.module.css';

export const ModalOverlay = ({ children, setIsOpenModal }) => {
  return (
    <div
      className={`${overlayStyles.modal_overlay}`}
      onClick={() => setIsOpenModal(false)}
    >
      {children}
    </div>
  );
};

ModalOverlay.propTypes = {
  children: PropTypes.node.isRequired,
  setIsOpenModal: PropTypes.func.isRequired,
};
