import styles from './organisms.module.css';

import React, { useEffect, useState } from 'react';
import Policy from './Policy';
import Spinner from '../atoms/spinner/Spinner';
import Button from '../atoms/button/Button';
import moment from 'moment';

import { usePolicy } from '@/app/queries/queryHooks/policy/usePolicy';
import { commonConstants } from '@/app/constants/common';
import { useShippingPolicyStore } from '@/app/stores/useShippingPolicyStore';

const { LIST_EMPTY } = commonConstants;

const PolicyList = () => {
  const setShippingPolicy = useShippingPolicyStore(
    (state) => state.setShippingPolicy
  );
  const { data: shippingPolicyData, isLoading } =
    usePolicy().useShippingPolicyGet();
  const { mutate: mutateCreate, isSuccess } =
    usePolicy().useShippingPolicyCreate();
  const [render, setRender] = useState<string>('list');

  useEffect(() => {
    if (isSuccess) {
      setRender('details');
    }
  }, [isSuccess]);

  const handleCreatePolicy = () => {
    mutateCreate(undefined);
  };

  const handleUpdate = () => {
    setShippingPolicy(shippingPolicyData);
    setRender('details');
  };

  const rerender = (menu: string) => setRender(menu);

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
        <>
          {render === 'list' && (
            <div className={styles['policy-section']}>
              {!shippingPolicyData ? (
                <>
                  <div className={styles['policy-btn']}>
                    <Button
                      value='Create Policy'
                      className='button-long'
                      onClick={handleCreatePolicy}
                    />
                  </div>
                  <div className={styles.centered}>{LIST_EMPTY}</div>
                </>
              ) : (
                <div className={styles['policy-card']}>
                  <div>Version: 1</div>
                  <div>
                    Created at:{' '}
                    {moment(shippingPolicyData._createdAt).format(
                      'YYYY-MM-DD, HH:mm'
                    )}
                  </div>
                  <div>
                    <Button value='Update' onClick={handleUpdate} />
                  </div>
                </div>
              )}
            </div>
          )}
          {render === 'details' && <Policy rerender={rerender} />}
        </>
      )}
    </>
  );
};

export default PolicyList;
