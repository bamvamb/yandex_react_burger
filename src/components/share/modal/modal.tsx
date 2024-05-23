import React, { useEffect, useState } from 'react';
import styles from  './modal.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from './modal-overlay';

interface ModalProps {
  isOpen: boolean;
  header_title?: string;
  onClose: () => void;
  children: React.ReactNode;
}


const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, header_title }) => {
  const [iconMouseOver, setIconMouseOver] = useState(false)

  const handleClose = () => {
    setIconMouseOver(false)
    onClose()
  }

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


  return (
      <ModalOverlay {...{onClose, isOpen}}>
        <div className={styles.modal}>
          <h1 
            className={styles.modal_header}
            >
            {header_title}
            <span
              className={styles.modal_close_icon}
              onClick={handleClose} 
              onMouseEnter={() => setIconMouseOver(true)}
              onMouseLeave={() => setIconMouseOver(false)}
            >
              <CloseIcon 
                type={iconMouseOver ? "secondary" : "primary"}
              />
            </span>
          </h1>
            
          <div className={styles.modal_content}>
            {children}
          </div>
        </div>
      </ModalOverlay>
    )
};

export default Modal;