import { useContext } from 'react';
import { GeneralContext } from 'src/contexts/general-context';
import { Navigate } from 'react-router-dom';

export default function GuestGuard({ children }) {
  const { user } = useContext(GeneralContext);

  if (!!user) return <Navigate to="/" />;
  return <>{children}</>;
}
