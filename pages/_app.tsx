import type { AppProps } from "next/app";
import "~/utils/globals.css";
import { AuthProvider } from "~/utils/firebase/auth";
import { GlobalContainer } from "~/components/templates/global/GlobalContainer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <GlobalContainer>
        <Component {...pageProps} />
      </GlobalContainer>
    </AuthProvider>
  );
}

export default MyApp;
