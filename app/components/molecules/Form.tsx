import React from 'react'
import Input from '../atoms/Input';

import styles from "./molecules.module.css"

interface FormProps {
  list: (string)[],
  formType: string,
  userProps: (string | undefined)[],
  changeFunc: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Form = (formProps: FormProps) => {
  const { list, formType, userProps, changeFunc } = formProps;

  return (
    <div className={styles['input-list']}>
      { list.map((input, idx) => (
        <Input key={idx} 
               type={input=='email'||input=='password'?input:'string'} 
               id={`login-${input}`} 
               className={formType} 
               placeholder={`Insert ${input}`} 
               hasLabel={true} 
               labelText={input} 
               name={input}
               value={userProps[idx]} 
               changeFunc={changeFunc}/> 
      ))}
    </div>
  )
}

export default Form

const LIST = [
  ["email", "login-email", "login", "Insert email", "Email"],
  ["password", "login-password", , "Insert password", "Password"]
]
