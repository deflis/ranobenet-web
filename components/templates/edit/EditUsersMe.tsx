import Head from 'next/head';
import { useForm } from 'react-hook-form';
import { useAsyncFn } from 'react-use';
import { UserDtoForMe, UserDtoForSave } from '~/ranobe-net-api';
import { Button, SubmitButton } from '~/components/atoms/common/Button';
import { Loading } from '~/components/atoms/common/Loading';
import { TextField } from '~/components/atoms/forms/TextField';
import { NeedLogin } from '~/components/organism/NeedLogin';
import { useEditUser } from '~/data/edit/users';
import { globalTitle } from '~/utils/constants';
import { signOut } from '~/utils/firebase/auth';

export const EditUsersMe: React.FC = () => {
  const { user, loading, update, loggedOut } = useEditUser();

  const [, handleSignOut] = useAsyncFn(async () => {
    signOut();
  });

  return (
    <>
      <Head>
        <title>ユーザー情報編集 - {globalTitle}</title>
      </Head>
      <Loading enable={loading} />
      ユーザー情報の編集
      {loggedOut && <NeedLogin label='ユーザー情報の編集' />}
      {user && <Editor user={user} onClickOk={update} />}
      {user && <Button onClick={handleSignOut}>サインアウト</Button>}
    </>
  );
};

type UserData = {
  name: string;
};

const Editor: React.VFC<{ user: UserDtoForMe; onClickOk: (user: UserDtoForSave) => void }> = ({ user, onClickOk }) => {
  const { register, handleSubmit } = useForm<UserDtoForSave>({ defaultValues: user });

  return (
    <form onSubmit={handleSubmit(onClickOk)}>
      <TextField inputProps={register('name')}>表示名</TextField>

      <SubmitButton>Ok</SubmitButton>
    </form>
  );
};
