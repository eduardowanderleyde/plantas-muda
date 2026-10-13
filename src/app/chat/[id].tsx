import Ionicons from '@expo/vector-icons/Ionicons';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useRef, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ME } from '@/data/seed';
import { useStore } from '@/store';
import { colors, radius } from '@/theme';
import type { Message } from '@/types';

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { users, matches, plants, messages, sendMessage } = useStore();
  const [text, setText] = useState('');
  const listRef = useRef<FlatList<Message>>(null);
  const insets = useSafeAreaInsets();

  const user = users[id];
  const match = matches.find((m) => m.userId === id);
  const theirPlant = plants.find((p) => p.id === match?.theirPlantId);
  const myPlant = plants.find((p) => p.id === match?.myPlantId);
  const thread = messages[id] ?? [];

  if (!user || !match) {
    return (
      <View style={styles.missing}>
        <Text style={styles.missingText}>Conversa não encontrada.</Text>
      </View>
    );
  }

  const send = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    sendMessage(id, trimmed);
    setText('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <Stack.Screen options={{ title: `${user.avatar} ${user.name}` }} />

      <View style={styles.deal}>
        <Text style={styles.dealText}>
          {myPlant ? `${myPlant.emoji} ${myPlant.name}` : 'Sua muda'}
          {'  ⇄  '}
          {theirPlant ? `${theirPlant.emoji} ${theirPlant.name}` : ''}
        </Text>
        <Text style={styles.dealMeta}>
          {user.city} · {user.distanceKm} km de você
        </Text>
      </View>

      <FlatList
        ref={listRef}
        data={thread}
        keyExtractor={(m) => m.id}
        contentContainerStyle={styles.thread}
        onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
        ListEmptyComponent={
          <Text style={styles.hint}>Combine local, dia e quais mudas vão trocar. Dica: encontros em lugar público 🌳</Text>
        }
        renderItem={({ item }) => {
          const mine = item.from === ME;
          return (
            <View style={[styles.bubble, mine ? styles.mine : styles.theirs]}>
              <Text style={[styles.bubbleText, mine && styles.mineText]}>{item.text}</Text>
            </View>
          );
        }}
      />

      <View style={[styles.composer, { paddingBottom: Math.max(insets.bottom, 10) }]}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Escreva uma mensagem…"
          placeholderTextColor={colors.muted}
          onSubmitEditing={send}
          returnKeyType="send"
        />
        <Pressable
          style={[styles.send, !text.trim() && styles.sendDisabled]}
          onPress={send}
          disabled={!text.trim()}
          accessibilityLabel="Enviar"
        >
          <Ionicons name="send" size={18} color="#fff" />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  deal: {
    backgroundColor: colors.chip,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    gap: 2,
  },
  dealText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.primaryDark,
  },
  dealMeta: {
    fontSize: 12,
    color: colors.muted,
  },
  thread: {
    padding: 16,
    gap: 8,
    flexGrow: 1,
  },
  hint: {
    textAlign: 'center',
    color: colors.muted,
    fontSize: 14,
    marginTop: 24,
    paddingHorizontal: 24,
  },
  bubble: {
    maxWidth: '78%',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 18,
  },
  mine: {
    alignSelf: 'flex-end',
    backgroundColor: colors.primary,
    borderBottomRightRadius: 4,
  },
  theirs: {
    alignSelf: 'flex-start',
    backgroundColor: colors.surface,
    borderBottomLeftRadius: 4,
  },
  bubbleText: {
    fontSize: 15,
    color: colors.text,
  },
  mineText: {
    color: '#fff',
  },
  composer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingTop: 10,
    backgroundColor: colors.surface,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  input: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: radius.lg,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    color: colors.text,
  },
  send: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendDisabled: {
    opacity: 0.4,
  },
  missing: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  missingText: {
    color: colors.muted,
  },
});
