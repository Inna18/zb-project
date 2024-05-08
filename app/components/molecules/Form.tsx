import styles from '@/app/components/molecules/molecules.module.css';

import React from 'react';
import Input from '@/app/components/atoms/input/Input';
import { toUpper } from '@/app/utils/text';
import Select from '@/app/components/atoms/select/Select';

interface FormProps {
  type?: string;
  required?: boolean;
  list: { id: number; value: string }[];
  userProps: (string | undefined)[];
  changeFunc: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  emailError?: string | null;
  passwordError?: string | null;
}

const Form = (formProps: FormProps) => {
  const {
    required,
    list,
    userProps,
    changeFunc,
    type,
    emailError,
    passwordError,
  } = formProps;

  return (
    <div className={styles['input-list']}>
      {list.map((input, idx) => (
        <div key={input.id}>
          <Input
            type={input.value == 'password' ? input.value : 'text'}
            id={`login-${input.value}`}
            placeholder={`Insert ${input.value}`}
            hasLabel={true}
            labelText={toUpper(input.value)}
            name={input.value}
            value={userProps[idx]}
            className='input'
            changeFunc={changeFunc}
            required={input.value == 'name' ? true : false}
            maxLength={20}
          />
          {input.value === 'email' && (
            <div className={styles.error}>{emailError}</div>
          )}
          {input.value === 'password' && (
            <div className={styles.error}>{passwordError}</div>
          )}
        </div>
      ))}
      {type === 'signup' && (
        <Select
          className={'role-select'}
          type={'role'}
          optionList={[
            { id: 1, value: 'ADMIN' },
            { id: 2, value: 'USER' },
          ]}
          changeFunc={changeFunc}
          hasLabel={true}
        />
      )}
    </div>
  );
};

export default Form;
