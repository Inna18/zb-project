'use client';
import styles from './organisms.module.css';

import React, { useEffect, useState } from 'react'
import User, { createUser, getUserByEmail, updateUser } from '@/app/service/useUserApi';
import { useSession } from 'next-auth/react';
import emptyUser from '../../../public/user-empty.svg';
import Image from 'next/image';
import Button from '../atoms/button/Button';
import Input from '../atoms/input/Input';


const LIST = ['email', 'password', 'role', 'name', 'address', 'phoneNumber', 'profileImg'];

const ProfileOrganism = () => {
  const session = useSession();
  const [show, setShow] = useState<string>('view');

  const [userInfo, setUserInfo] = useState<User>({
    _id: '',
    email: '',
    password: '',
    name: '',
    role: '',
    address: '',
    phoneNumber: ''
  });
  const userProperties = [
    [userInfo?.email, 'email'],
    [userInfo?.role, 'role'],
    [userInfo?.password, 'password'],
    [userInfo?.name, 'name'],
    [userInfo?.address, 'address'],
    [userInfo?.phoneNumber, 'phoneNumber']
  ]

  useEffect(() => {
    _getUserInfo();
  }, [session]);

  const _getUserInfo = async () => {
    const userFromDB = await getUserByEmail(session?.data?.user?.email);
    console.log("userFromDB: ", userFromDB)
    setUserInfo(userFromDB);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  }
  
  const handleUserUpdate = () => setShow('update');

  const handleUserCancel = () => setShow('view')

  const handleUserSave = async() => {
    const result = await updateUser(userInfo._id, userInfo);
  }

  const handleCheckDisabled = (name: string | undefined) => name === 'role' || name === 'email';

  const handleCheckType = (name: string) => name === 'password' ? 'password' : 'string';

  const handleHidePassword = (password: string) => '*'.repeat(password.length);

  return (
    <>
      <div className={styles['profile-section']}>
        <div className={styles['image-section']}>
          {userInfo?.profileImg && 
            <Image src={userInfo.profileImg} alt={'user-profile'} width={100} height={100}/>
          }
          {!userInfo?.profileImg && 
            <Image src={emptyUser} alt={'user-empty'} width={100} height={100} />
          }
        </div>
        <div className={styles['profile-details']}>
          <div className={styles.titles}>
            <div>EMAIL: </div>
            <div>ROLE: </div>
            <div>PASSWORD: </div>
            <div>NAME: </div>
            <div>ADDRESS: </div>
            <div>PHONE NUMBER: </div>
          </div>
          {userInfo && 
            show === 'view' && (
              <div className={styles.values}>
                <div>{ userInfo.email }</div>
                <div>{ userInfo.role }</div>
                <div>{ handleHidePassword(userInfo.password) }</div>
                <div>{ userInfo.name }</div>
                {userInfo.address && <div>{ userInfo.address }</div>}
                {!userInfo.address && <div className={styles['grid-empty']}>empty</div>}
                <div>{ userInfo.phoneNumber }</div>
              </div>
            )
          }
          {userInfo && 
            show === 'update' && (
              <div className={styles.updates}>
                { userProperties?.map(property => (
                  <div key={property[1]}>
                    <Input 
                    type={handleCheckType(property[1]!)}
                    changeFunc={handleInputChange} 
                    hasLabel={false} 
                    value={property[0]} 
                    maxLength={20} 
                    className='input'
                    name={property[1]}
                    disabled={handleCheckDisabled(property[1])}
                  />
                  </div>
                ))}
              </div>
            )
          }
        </div>
      </div>
      <div className={styles['button-section']}>
        {show === 'view' && <Button value={'Update'} handleClick={handleUserUpdate} />}
        {show === 'update' && 
          (
            <>
              <Button value={'Save'} handleClick={handleUserSave}/>
              <Button value={'Cancel'} handleClick={handleUserCancel} className='button2'/>
            </>
          )
        }
        
      </div>
    </>
    
  )
}

export default ProfileOrganism;