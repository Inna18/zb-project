'use client';
import React from 'react';
import { useSession } from 'next-auth/react';

const Home = () => {
  const session = useSession();
  console.log(session);

  return <div>Home</div>;
};

export default Home;
