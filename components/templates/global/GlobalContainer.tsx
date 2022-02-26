import { Container } from '~/components/atoms/common/Container';
import { GlobalHeader } from '~/components/organism/header/GlobalHeader';
import { ReactQueryDevtools } from 'react-query/devtools';

const DevTools: React.FC = () =>
  process.env.NODE_ENV === 'development' ? (
    <>
      <ReactQueryDevtools />
    </>
  ) : null;

export const GlobalContainer: React.FC = ({ children }) => {
  return (
    <>
      <GlobalHeader />
      <Container>{children}</Container>
      <DevTools />
    </>
  );
};
