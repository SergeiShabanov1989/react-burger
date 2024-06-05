import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import overlayStyles from './modal-overlay.module.css';
import { setIsModalIngredientOpen } from '../../services/viewable-ingredient/reducer';
import { setIsModalOrderOpen } from '../../services/order-details/reducer';

export const ModalOverlay = ({ children }) => {
  const dispatch = useDispatch();
  return (
    <div
      className={`${overlayStyles.modal_overlay}`}
      onClick={() => {
        dispatch(setIsModalIngredientOpen(false))
        dispatch(setIsModalOrderOpen(false))
      }}
    >
      {children}
    </div>
  );
};

ModalOverlay.propTypes = {
  children: PropTypes.node.isRequired,
};
