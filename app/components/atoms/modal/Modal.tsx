'use client';
import styles from '@/app/components/atoms/atoms.module.css';

import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Button from '@/app/components/atoms/button/Button';
import { capitalize, toUpper } from '@/app/utils/text';

interface ModalProps {
  selector: string;
  show: boolean;
  type: string;
  content: string;
  onOk?: () => void;
  onClose?: () => void;
}

const Modal = (modalProps: ModalProps) => {
  const { selector, show, type, content, onOk, onClose } = modalProps;

  useEffect(() => {
    if (typeof document !== undefined) {
      portalRef.current = document.getElementById(selector);
    }
  }, []);

  const portalRef = useRef<Element | null>(null);

  return show && portalRef.current
    ? createPortal(
        <div className={styles['modal-overlay']}>
          <div className={styles['modal-wrapper']}>
            <div className={styles.modal}>
              <div className={styles['modal-header']}>
                {type && capitalize(type)}
              </div>
              <div className={styles['modal-body']}>{content && content}</div>
              <div className={styles['modal-btn']}>
                {type === 'confirm' && <Button value='Ok' onClick={onOk} />}
                <Button value={'Close'} onClick={onClose} className='button2' />
              </div>
            </div>
          </div>
        </div>,
        portalRef.current
      )
    : null;
};

export default Modal;
