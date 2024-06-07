import PropTypes from 'prop-types';
import overlayStyles from './modal-overlay.module.css';

export const ModalOverlay = ({ children, onClose }) => {
  return (
    <div
      className={`${overlayStyles.modal_overlay}`}
      onClick={() => {
        onClose()
      }}
    >
      {children}
    </div>
  );
};

ModalOverlay.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired
};
