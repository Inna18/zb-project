import styles from './organisms.module.css';

import React, { useEffect, useState } from 'react';
import Spinner from '@/app/components/atoms/spinner/Spinner';
import Button from '@/app/components/atoms/button/Button';
import OrganizationEntity from '@/app/service/useOrganizationApi';
import Input from '@/app/components/atoms/input/Input';
import Modal from '@/app/components/atoms/modal/Modal';

import { useOrganizationGet } from '@/app/queries/queryHooks/organization/useOrganizationGet';
import { useOrganizationUpdate } from '@/app/queries/queryHooks/organization/useOrganizationUpdate';
import { useQueryClient } from '@tanstack/react-query';

const Organization = () => {
  const queryClient = useQueryClient();
  const {
    isLoading: loadingGet,
    isError,
    data: organization,
  } = useOrganizationGet();
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
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalDetails, setModalDetails] = useState({
    title: '',
    content: '',
    type: '',
  });

  const {
    mutate,
    isSuccess,
    isLoading: loadingUpdate,
    isError: errorUpdate,
    status,
  } = useOrganizationUpdate();

  useEffect(() => {
    if (isSuccess) {
      setModalDetails((prevState) => {
        return {
          ...prevState,
          type: 'alert',
          title: 'Alert',
          content: 'Organization details updated.',
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
          content: 'Organization details update error.',
        };
      });
      setShowModal(true);
    }
  }, [status]);

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
    mutate(myOrganization, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['organization'] });
      }
    });
  }

  const handleCheckDisabled = (name: string | undefined) => name === 'name';

  const handleMove = () => {
    setShowModal(false);
    setShow('view');
  };

  return (
    <>
      {loadingGet && <Spinner />}
      {!loadingGet && (
        <>
          <div className={styles['organization-section']}>
            <div className={styles['organization-details']}>
              <div className={styles.titles}>
                <div>Company Name: </div>
                <div>Address: </div>
                <div>Business Name: </div>
                <div>CEO: </div>
              </div>
              {organization && show === 'view' && (
                <div className={styles.values}>
                  <div>{organization.name}</div>
                  <div>{organization.businessNumber}</div>
                  <div>{organization.address}</div>
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
                    </div>
                  ))}
                </div>
              )}
              <div className={styles.titles}>
                <div>C/S Number: </div>
                <div>Email: </div>
                <div>Instagram Link: </div>
                <div>YouTube Link: </div>
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
            selector='portal'
            title={modalDetails.title}
            content={modalDetails.content}
            type={modalDetails.type}
            show={showModal}
            onClose={handleMove}
          />
        </>
      )}
    </>
  );
};

export default Organization;
