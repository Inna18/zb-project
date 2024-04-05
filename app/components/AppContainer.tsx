import React from 'react';
import { getUsers } from '@/app/service/useUserApi';

const AppContainer = async () => {
  const users = await getUsers();
  console.log(users);

  return <div></div>;
};

export default AppContainer;
