import { useProductStore } from '@/app/stores/useProductStore';
import { PortableText } from '@portabletext/react';

import React from 'react';

const About = () => {
  const { product } = useProductStore((state) => state);

  return (
    <div>
      <PortableText value={product.content} />
    </div>
  );
};

export default About;
