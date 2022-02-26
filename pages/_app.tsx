import type { AppProps } from 'next/app';
import '~/modules/utils/globals.css';
import { GlobalContainer } from '~/components/templates/global/GlobalContainer';
import { Provider, useAtomValue } from 'jotai';
import { useAuthStateListener } from '~/modules/utils/firebase/auth';
import { queryClientAtom } from 'jotai/query';
import { Hydrate, QueryClientProvider } from 'react-query';

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
        <GlobalContainer>
          <Component {...pageProps} />
        </GlobalContainer>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default App;
