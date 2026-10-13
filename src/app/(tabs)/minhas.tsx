import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { useStore } from '@/store';
import { colors, radius } from '@/theme';

export default function MyPlantsScreen() {
  const { myPlants, removePlant } = useStore();

  const confirmRemove = (id: string, name: string) =>
    Alert.alert('Remover muda', `Tirar "${name}" das suas trocas?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Remover', style: 'destructive', onPress: () => removePlant(id) },
    ]);

  return (
    <View style={styles.container}>
      <FlatList
        data={myPlants}
        keyExtractor={(p) => p.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <Text style={styles.hint}>Estas são as mudas que outras pessoas veem quando procuram trocas.</Text>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>🪴</Text>
            <Text style={styles.emptyText}>Adicione uma muda para começar a trocar.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={[styles.thumb, { backgroundColor: item.color }]}>
              <Text style={styles.thumbEmoji}>{item.emoji}</Text>
            </View>
            <View style={styles.rowBody}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.meta}>
                {item.kind} · {item.light} · rega {item.water.toLowerCase()}
              </Text>
              {item.wants && <Text style={styles.meta}>🔁 {item.wants}</Text>}
            </View>
            <Pressable
              onPress={() => confirmRemove(item.id, item.name)}
              hitSlop={10}
              accessibilityLabel={`Remover ${item.name}`}
            >
              <Ionicons name="trash-outline" size={22} color={colors.muted} />
            </Pressable>
          </View>
        )}
      />

      <Pressable style={styles.fab} onPress={() => router.push('/nova-planta')}>
        <Ionicons name="add" size={24} color="#fff" />
        <Text style={styles.fabText}>Adicionar muda</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 16,
    gap: 10,
    paddingBottom: 96,
  },
  hint: {
    fontSize: 14,
    color: colors.muted,
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
  },
  thumb: {
    width: 56,
    height: 56,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbEmoji: {
    fontSize: 30,
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
  meta: {
    fontSize: 13,
    color: colors.muted,
  },
  empty: {
    alignItems: 'center',
    gap: 8,
    paddingVertical: 48,
  },
  emptyEmoji: {
    fontSize: 48,
  },
  emptyText: {
    fontSize: 15,
    color: colors.muted,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.primary,
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 999,
    boxShadow: '0 4px 12px rgba(31, 90, 55, 0.35)',
  },
  fabText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
});
