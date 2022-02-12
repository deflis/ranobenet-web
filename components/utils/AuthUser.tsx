import React from 'react';
import { FirebaseUser } from '~/data/firebaseAuth';
import { useUserMe } from '~/data/users';

export const AuthUser: React.FC<{ firebaseUser: FirebaseUser }> = ({ firebaseUser }) => {
  const { user } = useUserMe(firebaseUser);

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
