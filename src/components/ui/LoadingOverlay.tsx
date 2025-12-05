import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Modal, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Colors } from '../../constants/colors';

interface LoadingOverlayProps {
  visible: boolean;
  text?: string;
  fullscreen?: boolean; // default true
  blockTouches?: boolean; // default true
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  visible,
  text,
  fullscreen = true,
  blockTouches = true,
  
}) => {
  const [shouldRender, setShouldRender] = useState(false);
  const fade = useRef(new Animated.Value(0)).current;
  const spin = useRef(new Animated.Value(0)).current;
  const loopRef = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
      Animated.timing(fade, {
        toValue: 1,
        duration: 180,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
      loopRef.current = Animated.loop(
        Animated.timing(spin, {
          toValue: 1,
          duration: 900,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      );
      loopRef.current.start();
    } else {
      Animated.timing(fade, {
        toValue: 0,
        duration: 180,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) setShouldRender(false);
      });
      loopRef.current?.stop();
      spin.stopAnimation(() => {
        spin.setValue(0);
      });
    }
  }, [visible, fade]);

  if (!shouldRender) return null;

  const rotate = spin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  const content = (
    <View style={[styles.modalContainer]}>
      <Animated.View style={[styles.overlay, fullscreen && styles.fullscreen, { opacity: fade }] }>
        <View style={styles.card}>
          <Animated.View style={[styles.spinner, { transform: [{ rotate }] }]} />
          {!!text && <Text style={styles.text}>{text}</Text>}
        </View>
      </Animated.View>
    </View>
  );

  if (blockTouches) {
    // Use Modal to block touches underneath
    return (
      <Modal transparent visible>
        {content}
      </Modal>
    );
  }
  return content;
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  fullscreen: {
    zIndex: 9999,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    minWidth: 160,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  spinner: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 3,
    borderColor: Colors.primary,
    borderTopColor: 'transparent',
    marginBottom: 8,
    // simple CSS-like spinner using rotation animation
  },
  text: { color: Colors.text, fontWeight: '600' },
});

export default LoadingOverlay;
