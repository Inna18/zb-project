'use client';
import styles from './templates.module.css';

import React, { useEffect, useState } from 'react';
import Profile from '@/app/components/organisms/Profile';
import Orders from '@/app/components/organisms/Orders';
import Link from 'next/link';
import Organization from '@/app/components/organisms/Organization';
import Categories from '@/app/components/organisms/Categories';
import ProductsAll from '../organisms/ProductsAll';
import PolicyList from '../organisms/PolicyList';
import WithAuth from '@/app/components/withAuth';

import { toUpper } from '@/app/utils/text';
import { useSession } from 'next-auth/react';
import { useTabRenderer } from '@/app/hooks/useTabRenderer';

const UserPageTemplate = () => {
  const session = useSession();
  const [list, setList] = useState<
    { id: number; value: string; component: React.JSX.Element }[]
  >([]);
  const { handleActiveTab, tabRenderer, activeTab } = useTabRenderer(list);

  const handleCurrentUser = async () => {
    const user = session.data?.user;
    if (user && user.role === 'ADMIN')
      setList([
        { id: 1, value: 'profile', component: <Profile /> },
        { id: 2, value: 'organization', component: <Organization /> },
        { id: 3, value: 'categories', component: <Categories /> },
        { id: 4, value: 'products', component: <ProductsAll /> },
        { id: 5, value: 'policy', component: <PolicyList /> },
      ]);
    if (user && user.role === 'USER') {
      setList([
        { id: 1, value: 'profile', component: <Profile /> },
        { id: 2, value: 'orders', component: <Orders /> },
      ]);
    }
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
            key={tab.id}
            onClick={() => handleActiveTab(tab.value)}
            href={''}
            className={activeTab === tab.value ? styles.active : ''}
          >
            {toUpper(tab.value)}
          </Link>
        ))}
      </div>
      <div className={styles['mypage-tabs']}>{list && tabRenderer()}</div>
    </div>
  );
};

export default WithAuth(UserPageTemplate);
