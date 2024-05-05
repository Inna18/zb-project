import { commonConstants } from '@/app/constants/common';
import Input from '../atoms/input/Input';
import styles from './molecules.module.css';
import React from 'react';

interface ColumnProps {
  list: {id: number, value: string[]}[];
  show: string;
  changeFunc: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  checkDisabled: (param: string) => boolean;
}

const Column = (columnProps: ColumnProps) => {
  const { list, show, changeFunc, checkDisabled } = columnProps;
  const { FIELD_EMPTY } = commonConstants();

  return (
    <>
      <div className={styles.titles}>
        {list &&
          list.map((menuElement) => (
            <div key={menuElement.id}>
              {menuElement.value[0] + ' '}
              <span className={styles['required-mark']}>*</span>
            </div>
          ))}
      </div>
      {show === 'view' && (
        <div className={styles.values}>
          {list &&
            list.map((menuElement) => (
              <div key={menuElement.id}>{menuElement.value[1]}</div>
            ))}
        </div>
      )}
      {show === 'update' && (
        <div className={styles.updates}>
          {list &&
            list.map((menuElement) => (
              <div key={menuElement.id} className={styles['input-gap']}>
                <Input
                  type={menuElement.value[3]}
                  changeFunc={changeFunc}
                  hasLabel={false}
                  value={menuElement.value[2]}
                  className='input'
                  name={menuElement.value[3]}
                  disabled={checkDisabled(menuElement.value[3])}
                />
                {menuElement.value[2] === '' && (
                  <span className={styles.error}>{FIELD_EMPTY}</span>
                )}
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default Column;
