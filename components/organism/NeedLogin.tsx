import { pageLogin } from '~/utils/path';
import { NextLinkButton } from '../atoms/common/Button';

export const NeedLogin: React.FC<{ label?: string }> = ({ label }) => (
  <>
    <p>{label && <>{label}には</>}ログインが必要です。</p>
    <p>
      <NextLinkButton href={pageLogin()}>Sign up</NextLinkButton>
    </p>
  </>
);
