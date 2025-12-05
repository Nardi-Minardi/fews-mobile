import React from 'react';
import Toast, { BaseToast } from 'react-native-toast-message';
import { Colors } from '../constants/colors';

export const ToastRoot = () => (
  <Toast
    position="top"
    topOffset={60}
    visibilityTime={2500}
    swipeable={true}
    config={{
      success: (props) => (
        <BaseToast
          {...props}
          style={{
            backgroundColor: Colors.success,   // FULL BACKGROUND COLOR
            borderLeftWidth: 0,
            borderRadius: 10,
            minHeight: 60,
          }}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          text1Style={{
            fontSize: 15,
            fontWeight: '700',
            color: '#fff',
          }}
          text2Style={{
            fontSize: 13,
            color: '#f0f0f0',
          }}
        />
      ),

      error: (props) => (
        <BaseToast
          {...props}
          style={{
            backgroundColor: Colors.error,      // FULL BACKGROUND COLOR
            borderLeftWidth: 0,
            borderRadius: 10,
            minHeight: 60,
          }}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          text1Style={{
            fontSize: 15,
            fontWeight: '700',
            color: '#fff',
          }}
          text2Style={{
            fontSize: 13,
            color: '#f0f0f0',
          }}
        />
      ),

      info: (props) => (
        <BaseToast
          {...props}
          style={{
            backgroundColor: Colors.info,       // FULL BACKGROUND COLOR
            borderLeftWidth: 0,
            borderRadius: 10,
            minHeight: 60,
          }}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          text1Style={{
            fontSize: 15,
            fontWeight: '700',
            color: '#fff',
          }}
          text2Style={{
            fontSize: 13,
            color: '#f0f0f0',
          }}
        />
      ),
    }}
  />
);

export type ToastParams = {
  type?: 'success' | 'error' | 'info';
  text1: string;
  text2?: string;
  position?: 'top' | 'bottom';
  autoHide?: boolean;
  visibilityTime?: number;
};

export const toast = {
  show: (params: ToastParams) => Toast.show(params as any),
  success: (text1: string, text2?: string) =>
    Toast.show({ type: 'success', text1, text2 }),
  error: (text1: string, text2?: string) =>
    Toast.show({ type: 'error', text1, text2 }),
  info: (text1: string, text2?: string) =>
    Toast.show({ type: 'info', text1, text2 }),
  hide: () => Toast.hide(),
};

export default Toast;
