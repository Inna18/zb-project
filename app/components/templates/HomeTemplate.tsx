'use client';
import styles from './templates.module.css';

import React, { useEffect } from 'react';
import Image from 'next/image';
import mainBanner from '@/public/images/main-banner.jpg';
import Link from 'next/link';
import HomeBestItems from '../organisms/HomeBestItems';

const HomeTemplate = () => {
  useEffect(() => {
    if (typeof window !== undefined) window.scrollTo(10, 10);
  }, []);

  return (
    <div>
      <article className={styles.scroller}>
        <section>
          <div className={styles['main-banner']}>
            <div>
              <div>Welcome</div>
              <div className={styles.link}>
                <Link href={'/shop'}>SHOP NOW</Link>
              </div>
            </div>
            <Image src={mainBanner} alt={'main-banner'} />
          </div>
        </section>
        <section>
          <HomeBestItems />
        </section>
      </article>
    </div>
  );
};

export default HomeTemplate;
