import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';

import { useStore } from '@/store';
import { colors } from '@/theme';

export default function TabLayout() {
  const { matches } = useStore();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        headerTitleStyle: { color: colors.text, fontWeight: '800' },
        headerStyle: { backgroundColor: colors.background },
        headerShadowVisible: false,
        sceneStyle: { backgroundColor: colors.background },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Descobrir',
          headerTitle: 'Brota 🌱',
          tabBarIcon: ({ color, size }) => <Ionicons name="leaf" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="trocas"
        options={{
          title: 'Trocas',
          tabBarBadge: matches.length > 0 ? matches.length : undefined,
          tabBarBadgeStyle: { backgroundColor: colors.like },
          tabBarIcon: ({ color, size }) => <Ionicons name="chatbubbles" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="minhas"
        options={{
          title: 'Minhas mudas',
          tabBarIcon: ({ color, size }) => <Ionicons name="flower" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
