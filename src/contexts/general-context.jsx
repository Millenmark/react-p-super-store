import { createContext, useState, useEffect } from 'react';
import axios from 'src/utils/axios';

export const GeneralContext = createContext();

export const GeneralContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { user },
        } = await axios.get('/api/auth/profile');
        setUser(user);
      } catch (err) {
        setUser(null);
      }
    })();
  }, []);

  const value = { user, setUser };
  return <GeneralContext.Provider value={value}>{children}</GeneralContext.Provider>;
};
