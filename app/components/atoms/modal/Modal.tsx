import styles from '../atoms.module.css';

import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Button from '../button/Button';

interface ModalProps {
  selector: string;
  show?: boolean;
  title?: string;
  content?: string;
  type?: string;
  onOk?: () => void;
  onClose?: () => void;
}

const Modal = (modalProps: ModalProps) => {
  const { selector, show, title, content, type, onOk, onClose } = modalProps;

  const portalRef = useRef<Element | null>(null);

  useEffect(() => {
    portalRef.current = document.getElementById(selector);
  }, [selector]);

  return show && portalRef.current
    ? createPortal(
        <div className={styles['modal-overlay']}>
          <div className={styles['modal-wrapper']}>
            <div className={styles.modal}>
              <div className={styles['modal-header']}>
                {title && <div>{title}</div>}
              </div>
              <div className={styles['modal-body']}>
                {content && <div>{content}</div>}
              </div>
              <div className={styles['modal-btn']}>
                {type === 'confirm' && <Button value='Ok' onClick={onOk} />}
                <Button
                  value={'Cancel'}
                  onClick={onClose}
                  className='button2'
                />
              </div>
            </div>
          </div>
        </div>,
        portalRef.current
      )
    : null;
};

export default Modal;
