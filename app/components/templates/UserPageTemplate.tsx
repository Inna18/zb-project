'use client';
import styles from './templates.module.css';

import React, { useEffect, useState } from 'react';
import Profile from '@/app/components/organisms/Profile';
import Orders from '@/app/components/organisms/Orders';
import Link from 'next/link';
import Organization from '@/app/components/organisms/Organization';
import Categories from '@/app/components/organisms/Categories';
import ProductsAll from '../organisms/ProductsAll';
import withAuth from '@/app/components/withAuth';

import { toUpper } from '@/app/utils/text';
import { useSession } from 'next-auth/react';
import { generateUuid } from '@/app/utils/uuid';

const UserPageTemplate = () => {
  const session = useSession();
  const [list, setList] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>('profile');

  const handleActiveTab = (tab: string) => {
    setActiveTab(tab);
  };

  const handleCurrentUser = async () => {
    const user = session.data?.user;
    if (user && user.role === 'ADMIN')
      setList(['profile', 'organization', 'categories', 'products']);
    else setList(['profile', 'orders']);
  };

  const tabRenderer = (activeTab: string) => {
    switch (activeTab) {
      case 'profile':
        return <Profile />;
      case 'orders':
        return <Orders />;
      case 'organization':
        return <Organization />;
      case 'categories':
        return <Categories />;
      case 'products':
        return <ProductsAll />;
      default:
        return null;
    }
  };

  useEffect(() => {
    handleCurrentUser();
  }, [session]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>My Page</div>
      <div className={styles['link-section']}>
        {list.map(tab => (
          <Link
            key={generateUuid()}
            onClick={() => handleActiveTab(tab)}
            href={''}
            className={activeTab === tab ? styles.active : ''}
          >
            {toUpper(tab)}
          </Link>
        ))}
      </div>
      <div className={styles['mypage-tabs']}>{tabRenderer(activeTab)}</div>
    </div>
  );
};

export default withAuth(UserPageTemplate);
