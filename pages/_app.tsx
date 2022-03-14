import type { AppProps } from 'next/app';
import { Provider, useAtomValue } from 'jotai';
import { useAuthStateListener } from '~/modules/utils/firebase/auth';
import { queryClientAtom } from 'jotai/query';
import { Hydrate, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ToastContainer } from 'react-toastify';

import '~/modules/utils/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { ThemeProvider, useTheme } from 'next-themes';

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
  <ThemeProvider attribute='class'>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Provider>
        <InnerApp {...props} />
      </Provider>
    </ErrorBoundary>
  </ThemeProvider>
);

const InnerApp = ({ Component, pageProps }: AppProps) => {
  useAuthStateListener();
  const queryClient = useAtomValue(queryClientAtom);
  const { theme } = useTheme();

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
          theme={theme}
        />
      </Hydrate>
    </QueryClientProvider>
  );
};

export default App;
