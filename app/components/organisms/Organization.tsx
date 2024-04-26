import styles from './organisms.module.css';

import React, { useState } from 'react';
import Spinner from '@/app/components/atoms/spinner/Spinner';
import Button from '@/app/components/atoms/button/Button';
import OrganizationEntity from '@/app/service/useOrganizationApi';
import Input from '@/app/components/atoms/input/Input';
import Modal from '@/app/components/atoms/modal/Modal';

import { useOrganizationGet } from '@/app/queries/queryHooks/organization/useOrganizationGet';
import { useOrganizationUpdate } from '@/app/queries/queryHooks/organization/useOrganizationUpdate';
import { useQueryClient } from '@tanstack/react-query';
import { useModal } from '@/app/hooks/useModal';
import { modalMsgConstants } from '@/app/constants/modalMsg';
import { commonConstants } from '@/app/constants/common';

const Organization = () => {
  const queryClient = useQueryClient();
  const { isLoading, data: organization } = useOrganizationGet();
  const [show, setShow] = useState<string>('view');
  const [myOrganization, setMyOrganization] = useState<OrganizationEntity>({
    _id: '',
    name: '',
    address: '',
    businessNumber: '',
    ceo: '',
    phoneNumber: '',
    email: '',
    instagramUrl: '',
    youTubeUrl: '',
  });
  const orgProperties = [
    [myOrganization.name, 'name'],
    [myOrganization.address, 'address'],
    [myOrganization.businessNumber, 'businessNumber'],
    [myOrganization.ceo, 'ceo'],
    [myOrganization.phoneNumber, 'phoneNumber'],
    [myOrganization.email, 'email'],
    [myOrganization.instagramUrl, 'instagramUrl'],
    [myOrganization.youTubeUrl, 'youTubeUrl'],
  ];

  const { mutate } = useOrganizationUpdate();

  const { open, close, isOpen } = useModal();
  const { ORGANIZATION_UPDATE_SUCCESS } = modalMsgConstants();
  const { FIELD_EMPTY } = commonConstants();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setMyOrganization({ ...myOrganization, [name]: value });
  };

  const handleOrgUpdate = () => {
    setShow('update');
    setMyOrganization(organization);
  };

  const handleOrgCancel = () => setShow('view');

  const handleOrgSave = () => {
    let check: boolean[] = [];
    orgProperties.map((property) => {
      check.push(property[0] !== '');
    });
    if (!check.includes(false)) {
      mutate(myOrganization, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['organization'] });
          open();
        },
      });
    }
  };

  const handleCheckDisabled = (name: string | undefined) => name === 'name';

  const handleMove = () => {
    close();
    setShow('view');
  };

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
        <>
          <div className={styles['organization-section']}>
            <div className={styles['organization-details']}>
              <div className={styles.titles}>
                <div>
                  Company Name:{' '}
                  <span className={styles['required-mark']}>*</span>
                </div>
                <div>
                  Address: <span className={styles['required-mark']}>*</span>
                </div>
                <div>
                  Business Number:{' '}
                  <span className={styles['required-mark']}>*</span>
                </div>
                <div>
                  CEO: <span className={styles['required-mark']}>*</span>
                </div>
              </div>
              {organization && show === 'view' && (
                <div className={styles.values}>
                  <div>{organization.name}</div>
                  <div>{organization.address}</div>
                  <div>{organization.businessNumber}</div>
                  <div>{organization.ceo}</div>
                </div>
              )}
              {organization && show === 'update' && (
                <div className={styles.updates}>
                  {orgProperties.slice(0, 4).map((property) => (
                    <div key={property[1]} className={styles['input-gap']}>
                      <Input
                        type={property[1]}
                        changeFunc={handleInputChange}
                        hasLabel={false}
                        value={property[0]}
                        className='input'
                        name={property[1]}
                        disabled={handleCheckDisabled(property[1])}
                      />
                      {property[0] === '' && (
                        <span className={styles.error}>{FIELD_EMPTY}</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
              <div className={styles.titles}>
                <div>
                  C/S Number: <span className={styles['required-mark']}>*</span>
                </div>
                <div>
                  Email: <span className={styles['required-mark']}>*</span>
                </div>
                <div>
                  Instagram Link:{' '}
                  <span className={styles['required-mark']}>*</span>
                </div>
                <div>
                  YouTube Link:{' '}
                  <span className={styles['required-mark']}>*</span>
                </div>
              </div>
              {organization && show === 'view' && (
                <div className={styles.values}>
                  <div>{organization.phoneNumber}</div>
                  <div>{organization.email}</div>
                  <div>{organization.instagramUrl}</div>
                  <div>{organization.youTubeUrl}</div>
                </div>
              )}
              {organization && show === 'update' && (
                <div className={styles.updates}>
                  {orgProperties.slice(4, 9).map((property) => (
                    <div key={property[1]} className={styles['input-gap']}>
                      <Input
                        type={property[1]}
                        changeFunc={handleInputChange}
                        hasLabel={false}
                        value={property[0]}
                        className='input'
                        name={property[1]}
                        disabled={handleCheckDisabled(property[1])}
                      />
                      {property[0] === '' && (
                        <span className={styles.error}>{FIELD_EMPTY}</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className={styles['button-section']}>
            {show === 'view' && (
              <Button value={'Update'} onClick={handleOrgUpdate} />
            )}
            {show === 'update' && (
              <>
                <Button value={'Save'} onClick={handleOrgSave} />
                <Button
                  value={'Cancel'}
                  onClick={handleOrgCancel}
                  className='button2'
                />
              </>
            )}
          </div>
          <Modal
            selector={'portal'}
            show={isOpen}
            type={'alert'}
            content={ORGANIZATION_UPDATE_SUCCESS}
            onClose={handleMove}
          />
        </>
      )}
    </>
  );
};

export default Organization;
