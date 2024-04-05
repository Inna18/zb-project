import React, { InputHTMLAttributes } from 'react';

import styles from './atoms.module.css';

interface ImageProps extends InputHTMLAttributes<HTMLInputElement> {
  uploadImg: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Image = (imageProps: ImageProps) => {
  const { uploadImg } = imageProps;

  return (
    <div className={styles['image-section']}>
      <label className={styles['custom-img-upload']} htmlFor='profile-img'>
        Upload Image
      </label>
      <input
        className={styles['profile-img']}
        type='file'
        name='profileImg'
        id='profile-img'
        accept='img/*'
        onChange={uploadImg}
      />
    </div>
  );
};

export default Image;
