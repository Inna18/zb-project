import styles from '@/app/components/atoms/atoms.module.css';

import React, { useEffect, useRef, useState } from 'react';
import Button from '../button/Button';
import Select from '../select/Select';
import Input from '../input/Input';

import { createPortal } from 'react-dom';
import { limit } from '@/app/utils/text';
import Comment from '@/app/service/useCommentApi';

interface PopupProps {
  selector: string;
  show: boolean;
  title: string;
  onSave: (comment: Comment) => void;
  onCancel: () => void;
}

const Popup = (popupProps: PopupProps) => {
  const { selector, show, title, onSave, onCancel } = popupProps;

  const portalRef = useRef<Element | null>(null);
  portalRef.current = document.getElementById(selector);

  const [comment, setComment] = useState<Comment>({ rating: 5, content: '' });
  const [imgName, setImgName] = useState<string | undefined>('');

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setComment({ ...comment, [name]: value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment({ ...comment, commentImage: e.currentTarget.files?.[0] });
    setImgName(e.currentTarget.files?.[0]?.name);
  };

  return show && portalRef.current
    ? createPortal(
        <div className={styles['popup-overlay']}>
          <div className={styles['popup-wrapper']}>
            <div className={styles.popup}>
              <div className={styles['popup-header']}>{title && title}</div>
              <div className={styles['popup-body']}>
                <div>
                  <Select
                    className={'rating-select'}
                    type={'rating'}
                    optionList={[
                      { id: 1, value: '1' },
                      { id: 2, value: '2' },
                      { id: 3, value: '3' },
                      { id: 4, value: '4' },
                      { id: 5, value: '5' },
                    ]}
                    changeFunc={handleInputChange}
                    hasLabel={false}
                  />
                </div>
                <textarea
                  name=''
                  id=''
                  rows='14'
                  cols='36'
                  name='content'
                  onChange={handleInputChange}
                ></textarea>
                <Input
                  type='file'
                  id='product-img'
                  className='image'
                  labelText='Add Image'
                  hasLabel={true}
                  name='productImg'
                  changeFunc={handleImageUpload}
                />
                <span>{limit(imgName, 20)}</span>
              </div>
              <div className={styles['popup-btn']}>
                <Button value='Save' onClick={() => onSave(comment)} />
                <Button value='Close' onClick={onCancel} className='button2' />
              </div>
            </div>
          </div>
        </div>,
        portalRef.current
      )
    : null;
};

export default Popup;
