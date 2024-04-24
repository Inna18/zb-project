'use client';
import styles from './organisms.module.css';
import emptyUser from '../../../public/icons/user-empty.svg';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Button from '../atoms/button/Button';
import Input from '../atoms/input/Input';
import Spinner from '../atoms/spinner/Spinner';
import Modal from '../atoms/modal/Modal';

import User from '@/app/service/useUserApi';
import { useUserByEmail } from '@/app/queries/queryHooks/user/useUserByEmail';
import { useUserUpdate } from '@/app/queries/queryHooks/user/useUserUpdate';
import { useSession } from 'next-auth/react';
import { limit } from '@/app/utils/text';
import { passwordValidation } from '@/app/utils/validation';
import { authConstants } from '@/app/constants/auth';

const Profile = () => {
  const session = useSession();
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
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalDetails, setModalDetails] = useState({
    title: '',
    content: '',
    type: '',
  });
  const [passwordValid, setPasswordValid] = useState<boolean>(true);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const { PASSWORD_ERROR } = authConstants();

  const {
    isLoading: loadingGet,
    isError: errorGet,
    data: user,
  } = useUserByEmail(session?.data?.user?.email);
  const {
    mutate,
    isSuccess,
    isLoading: loadingUpdate,
    isError: errorUpdate,
    status,
  } = useUserUpdate(updatedUser?._id, updatedUser);

  useEffect(() => {
    if (isSuccess) {
      setModalDetails((prevState) => {
        return {
          ...prevState,
          type: 'alert',
          title: 'Alert',
          content: 'Profile details updated.',
        };
      });
      setShowModal(true);
    }
    if (errorUpdate) {
      setModalDetails((prevState) => {
        return {
          ...prevState,
          type: 'alert',
          title: 'Alert',
          content: 'Profile details update error.',
        };
      });
      setShowModal(true);
    }
  }, [status]);

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

  const handleUserSave = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    let valid = passwordValidation(updatedUser.password);
    setPasswordValid(valid);
    if (valid) mutate();
    else setPasswordError(PASSWORD_ERROR);
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
    setShowModal(false);
    setShow('view');
  };

  return (
    <>
      {loadingGet && <Spinner />}
      {!loadingGet && (
        <>
          <div className={styles['profile-section']}>
            <div className={styles['profile-details']}>
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
                <div>Email: </div>
                <div>Role: </div>
                <div>Password: </div>
                <div>Name: </div>
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
                  {userProperties?.map((property) => (
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
      <Modal
        selector='portal'
        title={modalDetails.title}
        content={modalDetails.content}
        type={modalDetails.type}
        show={showModal}
        onClose={handleMove}
      />
    </>
  );
};

export default Profile;
