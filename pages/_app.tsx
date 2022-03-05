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
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

export type PropsDehydratedState = {
  dehydratedState: unknown;
};

const ErrorFallback: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => (
  <div role='alert'>
    <p>Something went wrong:</p>
    <pre>{error.message}</pre>
    <button onClick={resetErrorBoundary}>Try again</button>
  </div>
);

const App = (props: AppProps) => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <Provider>
      <InnerApp {...props} />
    </Provider>
  </ErrorBoundary>
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
