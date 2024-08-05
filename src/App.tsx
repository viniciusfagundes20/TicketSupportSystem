import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './navigation/AuthStack';
import AppTabs from './navigation/AppTabs';
import useAuth from './Hooks/useAuth';
import { createTables } from './services/db';

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();

  React.useEffect(() => {
    createTables();
  }, []);

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default App;
