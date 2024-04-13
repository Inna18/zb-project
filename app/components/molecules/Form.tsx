import styles from './molecules.module.css';

import React from 'react';
import Input from '@/app/components/atoms/input/Input';
import { capitalize } from '@/app/utils/text';
import Select from '../atoms/select/Select';

interface FormProps {
  type?: string;
  required?: boolean;
  list: string[];
  userProps: (string | undefined)[];
  changeFunc: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  emailError?: string|null;
  passwordError?: string|null;
}

const Form = (formProps: FormProps) => {
  const { required, list, userProps, changeFunc, type, emailError, passwordError } = formProps;
  
  return (
    <div className={styles['input-list']}>
      {list.map((input, idx) => (
        <div key={idx}>
        <Input
          type={input == 'password' ? input : 'text'}
          id={`login-${input}`}
          placeholder={`Insert ${input}`}
          hasLabel={true}
          labelText={capitalize(input)}
          name={input}
          value={userProps[idx]}
          className='input'
          changeFunc={changeFunc}
          required={input=='name'?true:false}
          maxLength={20}
        />
        {input === 'email' && (
          <div className={styles.error}>{ emailError }</div>
        )}
        {input === 'password' && (
          <div className={styles.error}>{ passwordError }</div>
        )} 
        </div>
      ))}
      {type === 'signup' && (
        <Select className={'role-select'} type={'role'} optionList={['ADMIN', 'USER']} changeFunc={changeFunc} hasLabel={true} />
      )}
    </div>
  );
};

export default Form;
