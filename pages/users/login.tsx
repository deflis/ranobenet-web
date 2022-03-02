import Head from 'next/head';
import { useAsyncFn } from 'react-use';
import { signInWithGoogle, useFirebaseUser } from '~/modules/utils/firebase/auth';
import type { NextPage } from 'next';
import { Button } from '~/components/atoms/common/Button';
import { Loading } from '~/components/atoms/common/Loading';
import { useRouter } from 'next/router';
import { GlobalContainer } from '~/components/templates/global/GlobalContainer';
import { globalTitle } from '~/modules/utils/constants';
import { IoLogoGoogle } from 'react-icons/io5';
import { toast } from 'react-toastify';

const Page: NextPage = () => {
  const router = useRouter();
  const user = useFirebaseUser();

  const [signInState, handleSignIn] = useAsyncFn(async () => {
    await toast.promise(signInWithGoogle(), {
      success: 'ログインしました',
      error: 'ログインに失敗しました',
    });
    router.back();
  }, [router]);

  const loading = signInState.loading;

  return (
    <GlobalContainer>
      <Head>
        <title>{globalTitle}</title>
      </Head>

      <Loading enable={loading} />
      {!user && (
        <Button onClick={handleSignIn}>
          <span className='flex'>
            <IoLogoGoogle className='m-auto mr-2 w-5 h-5' />
            <span>Googleでログイン</span>
          </span>
        </Button>
      )}
    </GlobalContainer>
  );
};

export default Page;
