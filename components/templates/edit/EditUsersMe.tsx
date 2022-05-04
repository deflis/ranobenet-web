import Head from 'next/head';
import { useForm } from 'react-hook-form';
import { useAsyncFn } from 'react-use';
import { UserDtoForMe, UserDtoForSave } from '~/ranobe-net-api/@types';
import { Button, SubmitButton } from '~/components/atoms/common/Button';
import { Loading } from '~/components/atoms/common/Loading';
import { TextField } from '~/components/atoms/forms/TextField';
import { NeedLogin } from '~/components/organism/NeedLogin';
import { useEditUser } from '~/modules/data/edit/users';
import { globalTitle } from '~/modules/utils/constants';
import { signOut } from '~/modules/utils/firebase/auth';
import { useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';

export const EditUsersMe: React.FC = () => {
  const { user, update, loggedOut } = useEditUser();
  const [, handleSignOut] = useAsyncFn(async () => {
    signOut();
  });

  const handleClickOk = useCallback(
    (body: UserDtoForSave) => {
      toast.promise(update(body), {
        pending: '更新中',
        success: '更新しました',
        error: '失敗しました',
      });
    },
    [update]
  );

  return (
    <>
      <Head>
        <title>ユーザー情報編集 - {globalTitle}</title>
      </Head>
      ユーザー情報の編集
      {loggedOut && <NeedLogin label='ユーザー情報の編集' />}
      {user && <Editor user={user} onClickOk={handleClickOk} />}
      {user && <Button onClick={handleSignOut}>サインアウト</Button>}
    </>
  );
};

type UserData = {
  name: string;
};

const Editor: React.VFC<{ user: UserDtoForMe; onClickOk: (user: UserDtoForSave) => void }> = ({ user, onClickOk }) => {
  const { register, handleSubmit, reset } = useForm<UserData>({ defaultValues: user });
  useEffect(() => {
    reset(user);
  }, [reset, user]);

  return (
    <form onSubmit={handleSubmit(onClickOk)}>
      <TextField inputProps={register('name')}>表示名</TextField>

      <SubmitButton>Ok</SubmitButton>
    </form>
  );
};
