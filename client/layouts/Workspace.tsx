import fetcher from '@utils/fetcher';
import axios from 'axios';
import React from 'react';
import { FC } from 'react';
import { useCallback } from 'react';
import { Redirect } from 'react-router';
import useSWR, { mutate } from 'swr';

const Workspace: FC = ({ children }) => {
  const { data, error, revalidate } = useSWR('http://localhost:3095/api/users', fetcher);

  const onLogout = useCallback(() => {
    axios
      .post('/api/users/logout', null, {
        withCredentials: true,
      })
      .then(() => {
        mutate('http://localhost:3095/api/users', false);
      });
  }, []);

  if (!data) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <button onClick={onLogout}>로그아웃</button>
      {children}
    </div>
  );
};

export default Workspace;
