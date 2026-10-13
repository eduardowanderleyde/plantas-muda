import { router } from 'expo-router';
import { useState, type ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { Chip } from '@/components/Chip';
import { useStore } from '@/store';
import { colors, radius } from '@/theme';
import { LIGHTS, PLANT_KINDS, WATERS, type Light, type PlantKind, type Water } from '@/types';

const EMOJIS = ['🌱', '🌿', '🍃', '🪴', '🌵', '🌸', '🌼', '🌺', '🌻', '🌶️', '🍅', '🌾'];
const COLORS = ['#CFE8D5', '#E4F2C2', '#DCE8EE', '#F1EEDB', '#F2E3CF', '#EEDDF0', '#F6DCD6'];

export default function NewPlantScreen() {
  const { addPlant } = useStore();
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [emoji, setEmoji] = useState(EMOJIS[0]);
  const [kind, setKind] = useState<PlantKind>('Muda');
  const [light, setLight] = useState<Light>('Meia-sombra');
  const [water, setWater] = useState<Water>('Moderada');
  const [description, setDescription] = useState('');
  const [wants, setWants] = useState('');

  const canSave = name.trim().length > 0;

  const save = () => {
    if (!canSave) return;
    addPlant({
      name: name.trim(),
      species: species.trim() || 'Espécie não informada',
      emoji,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      kind,
      light,
      water,
      description: description.trim() || 'Sem descrição.',
      wants: wants.trim() || undefined,
    });
    router.back();
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Field label="Ícone">
        <View style={styles.wrap}>
          {EMOJIS.map((e) => (
            <Pressable key={e} onPress={() => setEmoji(e)} style={[styles.emoji, emoji === e && styles.emojiSelected]}>
              <Text style={styles.emojiText}>{e}</Text>
            </Pressable>
          ))}
        </View>
      </Field>

      <Field label="Nome popular *">
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Ex.: Jiboia" placeholderTextColor={colors.muted} />
      </Field>

      <Field label="Espécie">
        <TextInput
          style={styles.input}
          value={species}
          onChangeText={setSpecies}
          placeholder="Ex.: Epipremnum aureum"
          placeholderTextColor={colors.muted}
        />
      </Field>

      <Field label="O que você oferece">
        <View style={styles.wrap}>
          {PLANT_KINDS.map((k) => (
            <Chip key={k} label={k} selected={kind === k} onPress={() => setKind(k)} />
          ))}
        </View>
      </Field>

      <Field label="Luz">
        <View style={styles.wrap}>
          {LIGHTS.map((l) => (
            <Chip key={l} label={l} selected={light === l} onPress={() => setLight(l)} />
          ))}
        </View>
      </Field>

      <Field label="Rega">
        <View style={styles.wrap}>
          {WATERS.map((w) => (
            <Chip key={w} label={w} selected={water === w} onPress={() => setWater(w)} />
          ))}
        </View>
      </Field>

      <Field label="Descrição">
        <TextInput
          style={[styles.input, styles.multiline]}
          value={description}
          onChangeText={setDescription}
          placeholder="Tamanho, idade, se já está enraizada…"
          placeholderTextColor={colors.muted}
          multiline
        />
      </Field>

      <Field label="Aceita em troca">
        <TextInput
          style={styles.input}
          value={wants}
          onChangeText={setWants}
          placeholder="Ex.: suculentas, ervas"
          placeholderTextColor={colors.muted}
        />
      </Field>

      <Pressable style={[styles.save, !canSave && styles.saveDisabled]} onPress={save} disabled={!canSave}>
        <Text style={styles.saveText}>Publicar muda</Text>
      </Pressable>
    </ScrollView>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 18,
    paddingBottom: 48,
  },
  field: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: colors.text,
  },
  multiline: {
    minHeight: 90,
    textAlignVertical: 'top',
  },
  emoji: {
    width: 48,
    height: 48,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  emojiSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.chip,
  },
  emojiText: {
    fontSize: 26,
  },
  save: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 8,
  },
  saveDisabled: {
    opacity: 0.4,
  },
  saveText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
