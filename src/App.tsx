import React from 'react';
import { StatusBar } from 'react-native';
import 'react-native-gesture-handler'; // Must be at the top
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'jotai';

// Import navigation
import RootNavigator from './navigation/RootNavigator';
import { ToastRoot } from './lib/toast';
import { useEffect } from 'react';
import { Notifications } from './services/notifications';
import { runNotificationSamples } from './services/notificationSamples';

// Create a client
const queryClient = new QueryClient();

const App: React.FC = () => {
  useEffect(() => {
    Notifications.init();
    // if (__DEV__) {
    //   setTimeout(() => {
    //     runNotificationSamples().catch(() => {});
    //   }, 2000);
    // }
  }, []);

  return (
    <Provider>
      <QueryClientProvider client={queryClient}>
        <StatusBar barStyle="light-content" backgroundColor="#007AFF" />
        <RootNavigator />
        <ToastRoot />
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
