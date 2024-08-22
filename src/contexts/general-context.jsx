import { createContext, useState, useEffect } from 'react';
import axios from 'src/utils/axios';

export const GeneralContext = createContext();

export const GeneralContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('/api/auth/profile');
        setUser(response.data.user); // Store user data in state if authenticated
      } catch (error) {
        setUser(null); // Clear user state if not authenticated
      }
    };
    checkAuth();
  }, []);

  const value = { user, setUser };
  return <GeneralContext.Provider value={value}>{children}</GeneralContext.Provider>;
};
