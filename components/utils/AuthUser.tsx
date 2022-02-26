import React from 'react';
import { useUserMe } from '~/modules/data/users';

export const AuthUser: React.FC = () => {
  const { user } = useUserMe();

  return (
    <>
      {user && (
        <div>
          <p>ようこそ {user.name} さん</p>
        </div>
      )}
    </>
  );
};

export default AuthUser;
