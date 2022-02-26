import React from 'react';
import { useUserMe } from '~/modules/data/users';
import { FirebaseUser } from '~/modules/utils/firebase/auth';

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
