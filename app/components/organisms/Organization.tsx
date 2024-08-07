import styles from './organisms.module.css';

import React, { useEffect, useState } from 'react';
import Spinner from '@/app/components/atoms/spinner/Spinner';
import Button from '@/app/components/atoms/button/Button';
import OrganizationEntity from '@/app/service/useOrganizationApi';
import Modal from '@/app/components/atoms/modal/Modal';
import Column from '../molecules/Column';

import { useOrganization } from '@/app/queries/queryHooks/organization/useOrganization';
import { useModal } from '@/app/hooks/useModal';
import { modalMsgConstants } from '@/app/constants/modalMsg';
import { useModalStore } from '@/app/stores/useModalStore';

const { ORGANIZATION_UPDATE_SUCCESS, ORGANIZATION_UPDATE_CANCEL } =
  modalMsgConstants;

const Organization = () => {
  const { modal, setModal } = useModalStore((state) => state);
  const { isLoading, data: organization } =
    useOrganization().useOrganizationGet();
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
  const orgProperties: { id: number; value: string[] }[] = [
    {
      id: 1,
      value: [
        'Company Name: ',
        organization?.name,
        myOrganization.name,
        'name',
      ],
    },
    {
      id: 2,
      value: [
        'Address: ',
        organization?.address,
        myOrganization.address,
        'address',
      ],
    },
    {
      id: 3,
      value: [
        'Business Number: ',
        organization?.businessNumber,
        myOrganization.businessNumber,
        'businessNumber',
      ],
    },
    { id: 4, value: ['CEO: ', organization?.ceo, myOrganization.ceo, 'ceo'] },
    {
      id: 5,
      value: [
        'C/S Number: ',
        organization?.phoneNumber,
        myOrganization.phoneNumber,
        'phoneNumber',
      ],
    },
    {
      id: 6,
      value: ['Email: ', organization?.email, myOrganization.email, 'email'],
    },
    {
      id: 7,
      value: [
        'Instagram Link: ',
        organization?.instagramUrl,
        myOrganization.instagramUrl,
        'instagramUrl',
      ],
    },
    {
      id: 8,
      value: [
        'YouTube Link: ',
        organization?.youTubeUrl,
        myOrganization.youTubeUrl,
        'youTubeUrl',
      ],
    },
  ];

  const { mutate, isSuccess } = useOrganization().useOrganizationUpdate();
  const { open, close, isOpen } = useModal();

  useEffect(() => {
    if (isSuccess) {
      setModal({
        type: 'alert',
        content: ORGANIZATION_UPDATE_SUCCESS,
        onClose: handleMove,
      });
      open();
    }
  }, [isSuccess]);

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

  const handleOrgCancel = () => {
    setModal({
      type: 'confirm',
      content: ORGANIZATION_UPDATE_CANCEL,
      onOk: handleMove,
      onClose: close,
    });
    open();
  };

  const handleOrgSave = () => {
    let check: boolean[] = [];
    orgProperties.map((property) => {
      check.push(property.value[0] !== '');
    });
    if (!check.includes(false)) mutate(myOrganization);
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
              {organization && (
                <Column
                  list={orgProperties.slice(0, 4)}
                  show={show}
                  changeFunc={handleInputChange}
                  checkDisabled={handleCheckDisabled}
                />
              )}
              {organization && (
                <Column
                  list={orgProperties.slice(4, 9)}
                  show={show}
                  changeFunc={handleInputChange}
                  checkDisabled={handleCheckDisabled}
                />
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
            type={modal.type}
            content={modal.content}
            onOk={modal.onOk}
            onClose={modal.onClose}
          />
        </>
      )}
    </>
  );
};

export default Organization;
