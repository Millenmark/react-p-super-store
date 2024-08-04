import { createContext, useState } from 'react';

export const GeneralContext = createContext();

export const GeneralContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const value = { user, setUser };
  return <GeneralContext.Provider value={value}>{children}</GeneralContext.Provider>;
};
