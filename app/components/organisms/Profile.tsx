'use client';
import styles from '@/app/components/organisms/organisms.module.css';
import emptyUser from '@/public/icons/user-empty.svg';

import React, { useState } from 'react';
import Image from 'next/image';
import Button from '@/app/components/atoms/button/Button';
import Input from '@/app/components/atoms/input/Input';
import Spinner from '@/app/components/atoms/spinner/Spinner';
import Modal from '@/app/components/atoms/modal/Modal';

import User from '@/app/service/useUserApi';
import { useUserByEmail } from '@/app/queries/queryHooks/user/useUserByEmail';
import { useUserUpdate } from '@/app/queries/queryHooks/user/useUserUpdate';
import { useSession } from 'next-auth/react';
import { limit } from '@/app/utils/text';
import { passwordValidation } from '@/app/utils/validation';
import { authConstants } from '@/app/constants/auth';
import { useQueryClient } from '@tanstack/react-query';
import { modalMsgConstants } from '@/app/constants/modalMsg';
import { useModal } from '@/app/hooks/useModal';
import { commonConstants } from '@/app/constants/common';

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
    [updatedUser.email, 'email'],
    [updatedUser.role, 'role'],
    [updatedUser.password, 'password'],
    [updatedUser.name, 'name'],
    [updatedUser.address, 'address'],
    [updatedUser.phoneNumber, 'phoneNumber'],
  ];
  const [passwordValid, setPasswordValid] = useState<boolean>(true);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const { PASSWORD_ERROR } = authConstants();

  const { isLoading, data: user } = useUserByEmail(session?.data?.user?.email);
  const { mutate, status } = useUserUpdate();
  const { open, close, isOpen } = useModal();
  const { USER_UPDATE_SUCCESS } = modalMsgConstants();
  const { FIELD_EMPTY } = commonConstants();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  const handleUserUpdate = () => {
    setImgName(user.profileImg);
    setShow('update');
    setUpdatedUser({ ...user, profileImg: '' });
  };
  const handleUserCancel = () => {
    setPasswordValid(true);
    setShow('view');
  };
  const handleUserSave = () => {
    let valid = passwordValidation(updatedUser.password);
    setPasswordValid(valid);
    if (valid && updatedUser.name !== '') {
      mutate(updatedUser, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['users'] });
          open();
        },
      });
      setPasswordValid(true);
    } else setPasswordError(PASSWORD_ERROR);
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

  const handleMove = () => {
    close();
    setShow('view');
  };

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
        <>
          <div className={styles['profile-section']}>
            <div className={styles['profile-details']}>
              <div className={styles['image-section']}>
                {user && user.profileImg && show === 'view' && (
                  <Image
                    src={user.profileImg}
                    alt={'user-profile'}
                    width={100}
                    height={100}
                  />
                )}
                {user && !user.profileImg && show === 'view' && (
                  <Image
                    src={emptyUser}
                    alt={'user-empty'}
                    width={100}
                    height={100}
                  />
                )}
                {show === 'update' && (
                  <div className={styles.space}>
                    <Image
                      src={user.profileImg}
                      alt={'user-profile'}
                      width={100}
                      height={100}
                    />
                    <span>{limit(imgName, 20)}</span>
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
              <div className={styles.titles}>
                <div>
                  Email: <span className={styles['required-mark']}>*</span>
                </div>
                <div>
                  Role: <span className={styles['required-mark']}>*</span>
                </div>
                <div>
                  Password: <span className={styles['required-mark']}>*</span>
                </div>
                {!passwordValid && (
                  <div className={styles['grid-empty']}>empty</div>
                )}
                <div>
                  Name: <span className={styles['required-mark']}>*</span>
                </div>
                <div>Address: </div>
                <div>Phone Number: </div>
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
                  {userProperties.map((property) => (
                    <div key={property[1]}>
                      <Input
                        type={handleCheckType(property[1]!)}
                        changeFunc={handleInputChange}
                        hasLabel={false}
                        value={property[0]}
                        className='input'
                        name={property[1]}
                        disabled={handleCheckDisabled(property[1])}
                      />
                      {property[1] === 'password' && !passwordValid && (
                        <div className={styles.error}>{passwordError}</div>
                      )}
                      {property[0] === '' && property[1] === 'name' && (
                        <div className={styles.error}>{FIELD_EMPTY}</div>
                      )}
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
                <Button type='submit' value={'Save'} onClick={handleUserSave} />
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
      {status === 'success' && (
        <Modal
          selector={'portal'}
          show={isOpen}
          type={'alert'}
          content={USER_UPDATE_SUCCESS}
          onClose={handleMove}
        />
      )}
    </>
  );
};

export default Profile;
