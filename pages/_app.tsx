import type { AppProps } from 'next/app';
import '~/utils/globals.css';
import { GlobalContainer } from '~/components/templates/global/GlobalContainer';
import { Provider } from 'jotai';
import { useAuth } from '~/utils/firebase/auth';

const App = (props: AppProps) => (
  <Provider>
    <InnerApp {...props} />
  </Provider>
);

const InnerApp = ({ Component, pageProps }: AppProps) => {
  useAuth();

  return (
    <GlobalContainer>
      <Component {...pageProps} />
    </GlobalContainer>
  );
};

export default App;
