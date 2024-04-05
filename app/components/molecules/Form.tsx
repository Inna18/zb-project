import styles from './molecules.module.css';

import React from 'react';
import Input from '@/app/components/atoms/Input';
import { capitalize } from '@/app/utils/text';

interface FormProps {
  type?: string;
  required?: boolean;
  list: string[];
  userProps: (string | undefined)[];
  changeFunc: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const Form = (formProps: FormProps) => {
  const { required, list, userProps, changeFunc, type } = formProps;

  return (
    <div className={styles['input-list']}>
      {list.map((input, idx) => (
        <Input
          key={idx}
          type={input == 'email' || input == 'password' ? input : 'string'}
          id={`login-${input}`}
          placeholder={`Insert ${input}`}
          hasLabel={true}
          labelText={capitalize(input)}
          name={input}
          value={userProps[idx]}
          className='input'
          changeFunc={changeFunc}
          required={required}
        />
      ))}
      {type === 'signup' && (
        <div className={styles['role-select']}>
          <label htmlFor=''>ROLE</label>
          <select defaultValue={''} name='role' onChange={changeFunc}>
            {' '}
            {/* dropdownd으로 대체 고민 중, 속성이 조금 다르지만은..*/}
            <option value='' disabled={true}>
              Choose a role
            </option>
            <option value='admin'>ADMIN</option>
            <option value='user'>USER</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default Form;
