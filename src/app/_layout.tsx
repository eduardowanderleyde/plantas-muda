import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { StoreProvider } from '@/store';
import { colors } from '@/theme';

export default function RootLayout() {
  return (
    <StoreProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerTintColor: colors.primary,
          headerTitleStyle: { color: colors.text },
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="chat/[id]" options={{ title: 'Conversa', headerBackTitle: 'Trocas' }} />
        <Stack.Screen name="nova-planta" options={{ title: 'Nova muda', presentation: 'modal' }} />
      </Stack>
    </StoreProvider>
  );
}
