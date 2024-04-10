'use client';
import styles from './organisms.module.css';

import React, { useEffect, useState } from 'react'
import User, { getUserByEmail } from '@/app/service/useUserApi';
import { useSession } from 'next-auth/react';
import MyImage from '../atoms/image/MyImage';
import emptyUser from '../../../public/user-empty.svg';
import Image from 'next/image';
import Button from '../atoms/button/Button';


const LIST = ['email', 'password', 'role', 'name', 'address', 'phoneNumber', 'profileImg'];

const ProfileOrganism = () => {
  const session = useSession();

  const [userInfo, setUserInfo] = useState<User>({
    email: '',
    password: '',
    name: '',
    role: '',
    address: '',
    phoneNumber: ''
  });
  // const userProperties = [
  //   userInfo.email,
  //   userInfo.password,
  //   userInfo.name,
  //   userInfo.role,
  //   userInfo.address,
  //   userInfo.phoneNumber
  // ];

  useEffect(() => {
    _getUserInfo();
  }, [session]);

  const _getUserInfo = async () => {
    const userFromDB = await getUserByEmail(session?.data?.user?.email);
    console.log("userFromDB: ", userFromDB)
    setUserInfo(userFromDB);
  }

  return (
    <>
      <div className={styles['image-section']}>
        {userInfo?.profileImg && 
          <Image src={userInfo.profileImg} alt={'user-profile'} width={120} height={120}/>
        }
        {!userInfo?.profileImg && 
          <Image src={emptyUser} alt={'user-empty'} width={120} height={120} />
        }
      </div>
      <div className={styles['profile-section']}>
        <div className={styles['profile-details']}>
          <div className={styles.titles}>
            <div>EMAIL: </div>
            <div>NAME: </div>
            <div>ADDRESS: </div>
            <div>PHONE NUMBER: </div>
          </div>
          <div className={styles.values}>
            {userInfo && (
              <>
                <div>{ userInfo.email }</div>
                <div>{ userInfo.name }</div>
                {userInfo.address && <div>{ userInfo.address }</div>}
                {!userInfo.address && <div className={styles['grid-empty']}>empty</div>}
                <div>{ userInfo.phoneNumber }</div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className={styles['button-section']}>
        <Button value={'Update'}/>
      </div>
    </>
    
  )
}

export default ProfileOrganism;
