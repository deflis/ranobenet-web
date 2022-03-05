import { Container } from '~/components/atoms/common/Container';
import { GlobalFooter } from '~/components/organism/footer/GlobalFooter';
import { GlobalHeader } from '~/components/organism/header/GlobalHeader';

export const GlobalContainer: React.FC = ({ children }) => {
  return (
    <>
      <GlobalHeader />
      <Container>{children}</Container>
      <GlobalFooter />
    </>
  );
};
