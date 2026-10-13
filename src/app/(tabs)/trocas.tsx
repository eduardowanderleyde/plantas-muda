import { router } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { useStore } from '@/store';
import { colors, radius } from '@/theme';

export default function TradesScreen() {
  const { matches, users, plants, messages } = useStore();

  if (matches.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyEmoji}>🤝</Text>
        <Text style={styles.emptyTitle}>Nenhuma troca ainda</Text>
        <Text style={styles.emptyText}>
          Curta mudas em Descobrir. Quando alguém também curtir uma das suas, aparece aqui.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={matches}
      keyExtractor={(m) => m.userId}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => {
        const user = users[item.userId];
        const plant = plants.find((p) => p.id === item.theirPlantId);
        const last = messages[item.userId]?.at(-1);
        return (
          <Pressable
            style={styles.row}
            onPress={() => router.push({ pathname: '/chat/[id]', params: { id: item.userId } })}
          >
            <View style={[styles.avatar, { backgroundColor: plant?.color ?? colors.chip }]}>
              <Text style={styles.avatarEmoji}>{plant?.emoji ?? '🪴'}</Text>
            </View>
            <View style={styles.rowBody}>
              <Text style={styles.name}>
                {user.avatar} {user.name}
              </Text>
              <Text style={styles.preview} numberOfLines={1}>
                {last ? last.text : `Match pela ${plant?.name ?? 'planta'} · diga oi!`}
              </Text>
            </View>
            {!last && <View style={styles.dot} />}
          </Pressable>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 16,
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarEmoji: {
    fontSize: 28,
  },
  rowBody: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  preview: {
    fontSize: 14,
    color: colors.muted,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.like,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 32,
  },
  emptyEmoji: {
    fontSize: 56,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  emptyText: {
    fontSize: 15,
    color: colors.muted,
    textAlign: 'center',
  },
});
