'use client';
import styles from './templates.module.css';

import React, { useEffect, useState } from 'react';
import Profile from '@/app/components/organisms/Profile';
import Orders from '@/app/components/organisms/Orders';
import Link from 'next/link';
import Organization from '@/app/components/organisms/Organization';
import Categories from '@/app/components/organisms/Categories';
import withAuth from '@/app/components/withAuth';

import { capitalize } from '@/app/utils/text';
import { useSession } from 'next-auth/react';

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

  useEffect(() => {
    handleCurrentUser();
  }, [session]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>My Page</div>
      <div className={styles['link-section']}>
        {list.map((tab) => (
          <Link
            key={tab}
            onClick={() => handleActiveTab(tab)}
            href={''}
            className={activeTab === tab ? styles.active : ''}
          >
            {capitalize(tab)}
          </Link>
        ))}
      </div>
      <div className={styles['mypage-tabs']}>
        {activeTab === 'profile' && <Profile />}
        {activeTab === 'orders' && <Orders />}
        {activeTab === 'organization' && <Organization />}
        {activeTab === 'categories' && <Categories />}
      </div>
    </div>
  );
};

export default withAuth(UserPageTemplate);
