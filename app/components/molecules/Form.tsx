import styles from './molecules.module.css';

import React from 'react';
import Input from '@/app/components/atoms/Input';
import { capitalize } from '@/app/utils/text';

interface FormProps {
  required?: boolean;
  list: string[];
  userProps: (string | undefined)[];
  changeFunc: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Form = (formProps: FormProps) => {
  const { required, list, userProps, changeFunc } = formProps;

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
    </div>
  );
};

export default Form;
