import React, { useEffect } from 'react';

import ReactDOM from 'react-dom';
import styles from  './modal-overlay.module.css'


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}


const ModalOverlay: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {

  const onpress = (ev:KeyboardEvent) => {
    if(ev.key === "Escape"){
      onClose()
    }
  }
  useEffect(() => {
    document.addEventListener("keydown", onpress)
    return () => {
      document.removeEventListener("keydown", onpress)
    }
  }, [])

  if (!isOpen) return null;

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;

  const modalOverlayElement = (
    <div className={styles.modal_overlay} onClick={onClose}>
        {children}
    </div>
  );

  return ReactDOM.createPortal(modalOverlayElement, modalRoot);
};

export default ModalOverlay;