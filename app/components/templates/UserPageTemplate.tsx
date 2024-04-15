'use client';
import styles from './templates.module.css';

import React, { useEffect, useState } from 'react';
import withAuth from '../withAuth';
import ProfileOrganism from '../organisms/ProfileOrganism';
import OrdersOrganism from '../organisms/OrdersOrganism';
import { capitalize } from '@/app/utils/text';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import User, { getUserByEmail } from '@/app/service/useUserApi';

const UserPageTemplate = () => {
  const session = useSession();
  const [list, setList] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>('profile');

  const handleActiveTab = (tab: string) => {
    setActiveTab(tab);
  };

  const handleCurrentUser = async() => {
    const user = await getUserByEmail(session?.data?.user?.email);
    if (user?.role === 'ADMIN') setList(['profile', 'products']);
    else setList(['profile', 'orders']);
  }

  useEffect(() => {
    async function getCurrentUser() {
      await handleCurrentUser();
    }
    getCurrentUser();
  }, [session]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>My Page</div>
      <div className={styles['link-section']}>
        {list?.map((tab) => (
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
        {activeTab === 'profile' && <ProfileOrganism />}
        {activeTab === 'orders' && <OrdersOrganism />}
      </div>
    </div>
  );
};

export default withAuth(UserPageTemplate);
