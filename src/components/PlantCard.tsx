import { StyleSheet, Text, View } from 'react-native';

import { Chip } from '@/components/Chip';
import { colors, radius } from '@/theme';
import type { Plant, User } from '@/types';

type Props = {
  plant: Plant;
  owner?: User;
};

const lightIcon = { 'Sol pleno': '☀️', 'Meia-sombra': '⛅', Sombra: '🌥️' } as const;
const waterIcon = { Pouca: '💧', Moderada: '💧💧', Muita: '💧💧💧' } as const;

export function PlantCard({ plant, owner }: Props) {
  return (
    <View style={styles.card}>
      <View style={[styles.hero, { backgroundColor: plant.color }]}>
        <Text style={styles.emoji}>{plant.emoji}</Text>
        <View style={styles.kindBadge}>
          <Text style={styles.kindText}>{plant.kind}</Text>
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.name}>{plant.name}</Text>
        <Text style={styles.species}>{plant.species}</Text>

        {owner && (
          <Text style={styles.owner}>
            {owner.avatar} {owner.name} · {owner.city} · {owner.distanceKm} km
          </Text>
        )}

        <View style={styles.chips}>
          <Chip label={`${lightIcon[plant.light]} ${plant.light}`} />
          <Chip label={`${waterIcon[plant.water]} Rega ${plant.water.toLowerCase()}`} />
        </View>

        <Text style={styles.description} numberOfLines={3}>
          {plant.description}
        </Text>

        {plant.wants && (
          <Text style={styles.wants} numberOfLines={2}>
            🔁 Troca por: <Text style={styles.wantsValue}>{plant.wants}</Text>
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    overflow: 'hidden',
    boxShadow: '0 6px 18px rgba(31, 45, 36, 0.15)',
  },
  hero: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 120,
  },
  kindBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(255,255,255,0.85)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  kindText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primaryDark,
  },
  body: {
    padding: 18,
    gap: 6,
  },
  name: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
  },
  species: {
    fontSize: 14,
    fontStyle: 'italic',
    color: colors.muted,
  },
  owner: {
    fontSize: 14,
    color: colors.text,
    marginTop: 2,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 6,
  },
  description: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 21,
    marginTop: 6,
  },
  wants: {
    fontSize: 14,
    color: colors.muted,
  },
  wantsValue: {
    color: colors.primaryDark,
    fontWeight: '600',
  },
});
