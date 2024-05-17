import styles from './organisms.module.css';

import React from 'react';

import { useProductStore } from '@/app/stores/useProductStore';
import { PortableText } from '@portabletext/react';

const About = () => {
  const { product } = useProductStore((state) => state);

  return (
    <div className={styles.about}>
      <PortableText value={product.content} />
    </div>
  );
};

export default About;
