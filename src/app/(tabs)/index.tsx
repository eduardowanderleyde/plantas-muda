import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { MatchModal } from '@/components/MatchModal';
import { SwipeDeck } from '@/components/SwipeDeck';
import { useStore } from '@/store';
import { colors, radius } from '@/theme';
import type { Match } from '@/types';

export default function DiscoverScreen() {
  const { deck, users, plants, swipe, resetPassed } = useStore();
  const [match, setMatch] = useState<Match | null>(null);

  const openChat = () => {
    if (!match) return;
    const userId = match.userId;
    setMatch(null);
    router.push({ pathname: '/chat/[id]', params: { id: userId } });
  };

  return (
    <View style={styles.container}>
      {deck.length > 0 ? (
        <SwipeDeck
          plants={deck}
          users={users}
          onSwipe={(plant, dir) => {
            const created = swipe(plant, dir);
            if (created) setMatch(created);
          }}
        />
      ) : (
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>🌾</Text>
          <Text style={styles.emptyTitle}>Você viu todas as mudas por perto</Text>
          <Text style={styles.emptyText}>Volte mais tarde ou reveja as que você passou.</Text>
          <Pressable style={styles.button} onPress={resetPassed}>
            <Text style={styles.buttonText}>Rever mudas</Text>
          </Pressable>
        </View>
      )}

      <MatchModal
        visible={!!match}
        user={match ? users[match.userId] : undefined}
        theirPlant={plants.find((p) => p.id === match?.theirPlantId)}
        myPlant={plants.find((p) => p.id === match?.myPlantId)}
        onChat={openChat}
        onClose={() => setMatch(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 24,
  },
  emptyEmoji: {
    fontSize: 64,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 15,
    color: colors.muted,
    textAlign: 'center',
  },
  button: {
    marginTop: 12,
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
});
