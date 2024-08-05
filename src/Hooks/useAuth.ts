import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = await AsyncStorage.getItem('isAuthenticated');
      if (authStatus === 'true') {
        setIsAuthenticated(true);
      }
    };
    checkAuth();
  }, []);

  const login = async () => {
    await AsyncStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  };

  return { isAuthenticated, login, logout };
};

export default useAuth;
