'use client';
import styles from './organisms.module.css';

import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import User from '@/app/service/useUserApi';
import { useUserByEmail } from '@/app/queries/queryHooks/user/useUserByEmail';
import { useUserUpdate } from '@/app/queries/queryHooks/user/useUserUpdate';
import { useSession } from 'next-auth/react';
import emptyUser from '../../../public/icons/user-empty.svg';
import Image from 'next/image';
import Button from '../atoms/button/Button';
import Input from '../atoms/input/Input';
import { limit } from '@/app/utils/text';
import Spinner from '../atoms/spinner/Spinner';

const Profile = () => {
  const session = useSession();
  const queryClient = useQueryClient();
  const [show, setShow] = useState<string>('view');
  const [updatedUser, setUpdatedUser] = useState<User>({
    _id: '',
    email: '',
    password: '',
    name: '',
    role: '',
    address: '',
    phoneNumber: '',
  });
  const [imgName, setImgName] = useState<string | undefined>('');
  const userProperties = [
    [updatedUser?.email, 'email'],
    [updatedUser?.role, 'role'],
    [updatedUser?.password, 'password'],
    [updatedUser?.name, 'name'],
    [updatedUser?.address, 'address'],
    [updatedUser?.phoneNumber, 'phoneNumber'],
  ];
  const {
    isPending,
    isError,
    data: user,
  } = useUserByEmail(session?.data?.user?.email);
  const mutation = useUserUpdate(updatedUser?._id, updatedUser);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  const handleUserUpdate = () => {
    setImgName(user?.profileImg);
    setShow('update');
    setUpdatedUser({ ...user, profileImg: '' });
  };
  const handleUserCancel = () => setShow('view');

  const handleUserSave = () => {
    // const result = await updateUser(updatedUser._id, updatedUser);

    // const mutation = useMutation({ mutationFn: async () => await updateUser(updatedUser._id, updatedUser) })
    mutation.mutate();
  };

  const handleCheckDisabled = (name: string | undefined) =>
    name === 'role' || name === 'email';

  const handleCheckType = (name: string) =>
    name === 'password' ? 'password' : 'string';

  const handleHidePassword = (password: string) => '*'.repeat(password.length);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedUser({ ...user, profileImg: e.currentTarget.files?.[0] });
    setImgName(e.currentTarget.files?.[0]?.name);
  };

  return (
    <>
      {isPending && <Spinner />}
      {!isPending && (
        <>
          <div className={styles['profile-section']}>
            <div className={styles['image-section']}>
              {user?.profileImg && show === 'view' && (
                <Image
                  src={user.profileImg}
                  alt={'user-profile'}
                  width={100}
                  height={100}
                />
              )}
              {!user?.profileImg && show === 'view' && (
                <Image
                  src={emptyUser}
                  alt={'user-empty'}
                  width={100}
                  height={100}
                />
              )}
              {show === 'update' && (
                <div className={styles.space}>
                  <span>{limit(imgName, 30)}</span>
                  <Input
                    type='file'
                    id='profile-img'
                    className='image'
                    labelText='Update image'
                    hasLabel={true}
                    name='profileImg'
                    changeFunc={handleImageUpload}
                  />
                </div>
              )}
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
              {user && show === 'view' && (
                <div className={styles.values}>
                  <div>{user.email}</div>
                  <div>{user.role}</div>
                  <div>{handleHidePassword(user.password)}</div>
                  <div>{user.name}</div>
                  {user.address && <div>{user.address}</div>}
                  {!user.address && (
                    <div className={styles['grid-empty']}>empty</div>
                  )}
                  <div>{user.phoneNumber}</div>
                </div>
              )}
              {user && show === 'update' && (
                <div className={styles.updates}>
                  {userProperties?.map((property) => (
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
              )}
            </div>
          </div>
          <div className={styles['button-section']}>
            {show === 'view' && (
              <Button value={'Update'} onClick={handleUserUpdate} />
            )}
            {show === 'update' && (
              <>
                <Button value={'Save'} onClick={handleUserSave} />
                <Button
                  value={'Cancel'}
                  onClick={handleUserCancel}
                  className='button2'
                />
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
