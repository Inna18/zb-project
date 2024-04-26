import styles from '@/app/components/atoms/atoms.module.css';

import React, { ChangeEvent, InputHTMLAttributes } from 'react';

import { capitalize } from '@/app/utils/text';

interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  type: string;
  optionList: string[];
  changeFunc: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  hasLabel: boolean;
}

const Select = (selectProps: SelectProps) => {
  const { className, type, optionList, changeFunc, hasLabel } = selectProps;

  return (
    <div className={styles[`${className}`]}>
      {hasLabel && <label htmlFor={type}>{capitalize(type)}</label>}
      <select
        defaultValue={''}
        name={type}
        onChange={changeFunc}
        required={true}
      >
        {/* dropdownd으로 대체 고민 중, 속성이 조금 다르지만은..*/}
        <option value='' disabled={true}>
          {`Choose ${type}`}
        </option>
        {optionList.map((option) => (
          <option key={option} value={option}>
            {capitalize(option)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
