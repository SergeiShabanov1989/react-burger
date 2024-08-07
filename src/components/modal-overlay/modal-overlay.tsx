import overlayStyles from './modal-overlay.module.css';

type TModalOverlayProps = {
  children: React.ReactNode
  onClose: () => void
}

export const ModalOverlay = ({ children, onClose }: TModalOverlayProps): JSX.Element => {
  return (
    <div
      data-testid="modal-overlay"
      className={`${overlayStyles.modal_overlay}`}
      onClick={() => {
        onClose()
      }}
    >
      {children}
    </div>
  );
};
