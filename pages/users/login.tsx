import Head from 'next/head';
import { useAsyncFn } from 'react-use';
import { signInWithGoogle, useFirebaseUser } from '~/modules/utils/firebase/auth';
import type { NextPage } from 'next';
import { Button } from '~/components/atoms/common/Button';
import { Loading } from '~/components/atoms/common/Loading';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const router = useRouter();
  const user = useFirebaseUser();

  const [signInState, handleSignIn] = useAsyncFn(async () => {
    await signInWithGoogle();
    router.back();
  }, [router]);

  const error = signInState.error;
  const loading = signInState.loading;

  return (
    <>
      <Head>
        <title>らのべねっと</title>
      </Head>

      <Loading enable={loading} />
      {error && (
        <div>
          <p>Error: {error.message}</p>
        </div>
      )}
      {!user && <Button onClick={handleSignIn}>Sign In</Button>}
    </>
  );
};

export default Home;
