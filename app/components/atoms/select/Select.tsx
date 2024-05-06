import styles from '@/app/components/atoms/atoms.module.css';

import React, { ChangeEvent, InputHTMLAttributes } from 'react';

import { toUpper } from '@/app/utils/text';
import { generateUuid } from '@/app/utils/uuid';

interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  type: string;
  optionList: string[];
  changeFunc: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  hasLabel: boolean;
  value?: string;
}

const Select = (selectProps: SelectProps) => {
  const { className, type, optionList, changeFunc, hasLabel, value } =
    selectProps;

  return (
    <div className={styles[`${className}`]}>
      {hasLabel && <label htmlFor={type}>{toUpper(type)}</label>}
      <select
        defaultValue={value ? value : ''}
        name={type}
        onChange={changeFunc}
        required={true}
      >
        <option value='' disabled={true}>
          {`Choose ${type}`}
        </option>
        {optionList.map(option => (
          <option key={generateUuid()} value={option}>
            {toUpper(option)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
