import Ionicons from '@expo/vector-icons/Ionicons';
import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { Animated, PanResponder, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import { PlantCard } from '@/components/PlantCard';
import { colors } from '@/theme';
import type { Plant, SwipeDirection, User } from '@/types';

type Props = {
  plants: Plant[];
  users: Record<string, User>;
  onSwipe: (plant: Plant, dir: SwipeDirection) => void;
};

export function SwipeDeck({ plants, users, onSwipe }: Props) {
  const { width } = useWindowDimensions();
  const threshold = width * 0.25;

  const [position] = useState(() => new Animated.ValueXY());
  const animating = useRef(false);

  const top = plants[0];
  const next = plants[1];

  // Ref para o PanResponder (criado uma vez) sempre enxergar os valores atuais.
  const latest = useRef({ top, onSwipe, width, threshold });
  useLayoutEffect(() => {
    latest.current = { top, onSwipe, width, threshold };
  });

  // Quando o card do topo muda, volta a posição ao centro antes de pintar a tela.
  useLayoutEffect(() => {
    position.setValue({ x: 0, y: 0 });
    animating.current = false;
  }, [top?.id, position]);

  const finish = useCallback(
    (dir: SwipeDirection) => {
      const { top: plant, width: w } = latest.current;
      if (!plant || animating.current) return;
      animating.current = true;
      Animated.timing(position, {
        toValue: { x: (dir === 'right' ? 1 : -1) * w * 1.5, y: 0 },
        duration: 220,
        useNativeDriver: true,
      }).start(() => latest.current.onSwipe(plant, dir));
    },
    [position],
  );

  // Os handlers só leem as refs durante o gesto, nunca na renderização.
  // eslint-disable-next-line react-hooks/refs
  const [panResponder] = useState(() =>
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) => !animating.current && (Math.abs(g.dx) > 5 || Math.abs(g.dy) > 5),
      onPanResponderMove: (_, g) => position.setValue({ x: g.dx, y: g.dy }),
      onPanResponderRelease: (_, g) => {
        const t = latest.current.threshold;
        if (g.dx > t || g.vx > 0.8) finish('right');
        else if (g.dx < -t || g.vx < -0.8) finish('left');
        else Animated.spring(position, { toValue: { x: 0, y: 0 }, friction: 5, useNativeDriver: true }).start();
      },
      onPanResponderTerminate: () =>
        Animated.spring(position, { toValue: { x: 0, y: 0 }, useNativeDriver: true }).start(),
    }),
  );

  const rotate = position.x.interpolate({
    inputRange: [-width / 2, 0, width / 2],
    outputRange: ['-12deg', '0deg', '12deg'],
    extrapolate: 'clamp',
  });
  const likeOpacity = position.x.interpolate({ inputRange: [0, threshold], outputRange: [0, 1], extrapolate: 'clamp' });
  const nopeOpacity = position.x.interpolate({ inputRange: [-threshold, 0], outputRange: [1, 0], extrapolate: 'clamp' });
  const nextScale = position.x.interpolate({
    inputRange: [-width / 2, 0, width / 2],
    outputRange: [1, 0.94, 1],
    extrapolate: 'clamp',
  });

  if (!top) return null;

  return (
    <View style={styles.container}>
      <View style={styles.stack}>
        {next && (
          <Animated.View key={next.id} style={[styles.card, { transform: [{ scale: nextScale }] }]}>
            <PlantCard plant={next} owner={users[next.ownerId]} />
          </Animated.View>
        )}
        <Animated.View
          key={top.id}
          style={[styles.card, { transform: [...position.getTranslateTransform(), { rotate }] }]}
          {...panResponder.panHandlers}
        >
          <PlantCard plant={top} owner={users[top.ownerId]} />
          <Animated.View style={[styles.stamp, styles.likeStamp, { opacity: likeOpacity }]}>
            <Text style={[styles.stampText, { color: colors.like }]}>QUERO</Text>
          </Animated.View>
          <Animated.View style={[styles.stamp, styles.nopeStamp, { opacity: nopeOpacity }]}>
            <Text style={[styles.stampText, { color: colors.nope }]}>PASSO</Text>
          </Animated.View>
        </Animated.View>
      </View>

      <View style={styles.actions}>
        <Pressable
          style={[styles.button, { borderColor: colors.nope }]}
          onPress={() => finish('left')}
          accessibilityLabel="Passar"
        >
          <Ionicons name="close" size={34} color={colors.nope} />
        </Pressable>
        <Pressable
          style={[styles.button, { borderColor: colors.like }]}
          onPress={() => finish('right')}
          accessibilityLabel="Quero trocar"
        >
          <Ionicons name="leaf" size={30} color={colors.like} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stack: {
    flex: 1,
  },
  card: {
    ...StyleSheet.absoluteFill,
  },
  stamp: {
    position: 'absolute',
    top: 28,
    borderWidth: 4,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 2,
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  likeStamp: {
    left: 24,
    borderColor: colors.like,
    transform: [{ rotate: '-15deg' }],
  },
  nopeStamp: {
    right: 24,
    borderColor: colors.nope,
    transform: [{ rotate: '15deg' }],
  },
  stampText: {
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: 2,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 40,
    paddingVertical: 18,
  },
  button: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 2,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 3px 10px rgba(31, 45, 36, 0.12)',
  },
});
