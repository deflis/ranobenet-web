import type { AppProps } from 'next/app';
import '~/utils/globals.css';
import { GlobalContainer } from '~/components/templates/global/GlobalContainer';
import { Provider } from 'jotai';
import { useAuth } from '~/utils/firebase/auth';

export default function MyApp(props: AppProps) {
  return (
    <Provider>
      <InnerApp {...props} />
    </Provider>
  );
}

function InnerApp({ Component, pageProps }: AppProps) {
  useAuth();

  return (
    <GlobalContainer>
      <Component {...pageProps} />
    </GlobalContainer>
  );
}
