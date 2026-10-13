import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radius } from '@/theme';
import type { Plant, User } from '@/types';

type Props = {
  visible: boolean;
  user?: User;
  theirPlant?: Plant;
  myPlant?: Plant;
  onChat: () => void;
  onClose: () => void;
};

export function MatchModal({ visible, user, theirPlant, myPlant, onChat, onClose }: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <Text style={styles.title}>Deu match! 🌱</Text>
          <Text style={styles.subtitle}>
            {user?.name} também quer trocar com você{myPlant ? ` e curtiu sua ${myPlant.name}` : ''}.
          </Text>

          <View style={styles.plants}>
            <View style={[styles.bubble, { backgroundColor: myPlant?.color ?? colors.chip }]}>
              <Text style={styles.bubbleEmoji}>{myPlant?.emoji ?? '🪴'}</Text>
            </View>
            <Text style={styles.swap}>⇄</Text>
            <View style={[styles.bubble, { backgroundColor: theirPlant?.color ?? colors.chip }]}>
              <Text style={styles.bubbleEmoji}>{theirPlant?.emoji}</Text>
            </View>
          </View>

          <Pressable style={styles.primary} onPress={onChat}>
            <Text style={styles.primaryText}>Combinar a troca</Text>
          </Pressable>
          <Pressable style={styles.secondary} onPress={onClose}>
            <Text style={styles.secondaryText}>Continuar descobrindo</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(20, 40, 28, 0.75)',
    justifyContent: 'center',
    padding: 24,
  },
  sheet: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: 24,
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    color: colors.primary,
  },
  subtitle: {
    fontSize: 15,
    color: colors.muted,
    textAlign: 'center',
  },
  plants: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginVertical: 12,
  },
  bubble: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubbleEmoji: {
    fontSize: 48,
  },
  swap: {
    fontSize: 28,
    color: colors.primary,
    fontWeight: '700',
  },
  primary: {
    alignSelf: 'stretch',
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: 14,
    alignItems: 'center',
  },
  primaryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  secondary: {
    paddingVertical: 10,
  },
  secondaryText: {
    color: colors.muted,
    fontSize: 15,
  },
});
