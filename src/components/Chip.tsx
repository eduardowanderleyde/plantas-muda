import { Pressable, StyleSheet, Text } from 'react-native';

import { colors } from '@/theme';

type Props = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
};

export function Chip({ label, selected, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={[styles.chip, selected && styles.selected]}
      accessibilityRole={onPress ? 'button' : 'text'}
      accessibilityState={onPress ? { selected } : undefined}
    >
      <Text style={[styles.label, selected && styles.selectedLabel]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: colors.chip,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selected: {
    backgroundColor: colors.primary,
    borderColor: colors.primaryDark,
  },
  label: {
    fontSize: 13,
    color: colors.text,
  },
  selectedLabel: {
    color: '#fff',
    fontWeight: '600',
  },
});
