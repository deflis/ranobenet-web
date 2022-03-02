import type { AppProps } from 'next/app';
import { Provider, useAtomValue } from 'jotai';
import { useAuthStateListener } from '~/modules/utils/firebase/auth';
import { queryClientAtom } from 'jotai/query';
import { Hydrate, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ToastContainer } from 'react-toastify';

import '~/modules/utils/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { darkModeAtom } from '~/modules/theme/dark';
import clsx from 'clsx';
import { useEffect } from 'react';

export type PropsDehydratedState = {
  dehydratedState: unknown;
};

const App = (props: AppProps) => (
  <Provider>
    <InnerApp {...props} />
  </Provider>
);

const InnerApp = ({ Component, pageProps }: AppProps) => {
  useAuthStateListener();
  const queryClient = useAtomValue(queryClientAtom);
  const isDarkMode = useAtomValue(darkModeAtom);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={(pageProps as Partial<PropsDehydratedState>)?.dehydratedState}>
        <Component {...pageProps} />
        <ReactQueryDevtools />
        <ToastContainer
          position='top-center'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={isDarkMode ? 'dark' : 'light'}
        />
      </Hydrate>
    </QueryClientProvider>
  );
};

export default App;
