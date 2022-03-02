import type { AppProps } from 'next/app';
import { Provider, useAtomValue } from 'jotai';
import { useAuthStateListener } from '~/modules/utils/firebase/auth';
import { queryClientAtom } from 'jotai/query';
import { Hydrate, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ToastContainer } from 'react-toastify';

import '~/modules/utils/globals.css';
import 'react-toastify/dist/ReactToastify.css';

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
        />
      </Hydrate>
    </QueryClientProvider>
  );
};

export default App;
