import { useContext } from 'react';
import { GeneralContext } from 'src/contexts/general-context';
import LoginPage from 'src/pages/login';

export default function AuthGuard({ children }) {
  const { user } = useContext(GeneralContext);

  if (!user) return <LoginPage />;
  return <>{children}</>;
}
