import React, { useEffect, useState } from 'react';
import styles from  './modal.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay, {IModalProps} from './modal-overlay';

interface IProps extends IModalProps {
  headerTitle?: string;
}


const Modal: React.FC<IProps> = ({ isOpen, onClose, children, headerTitle }) => {
  const [iconMouseOver, setIconMouseOver] = useState<boolean>(false)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClick = (ev:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    ev.stopPropagation()
  }

  if (!isOpen) return null;

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;

  return (
      <ModalOverlay {...{onClose, isOpen}}>
        <div onClick={handleClick} className={styles.modal}>
          <h1 
            className={styles.modal_header}
            >
            {headerTitle}
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