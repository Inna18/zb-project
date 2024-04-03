'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const usePageChangeListener = () => {
  const router = useRouter();
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    console.log('Page changed to: ', router);
    setChanged(true);
  }, [router]);

  return changed;
};
