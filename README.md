# plantas-muda

**Brota** — app de troca de mudas no estilo "swipe": você vê mudas de pessoas por perto, desliza para a direita nas que quer, e quando a outra pessoa também curtiu uma das suas, dá match e vocês combinam a troca pelo chat.

Feito com Expo (SDK 57), React Native e Expo Router.

## Rodar

```bash
npm install
npx expo start
```

Abra o app **Expo Go** no iPhone/Android e leia o QR code (mesma rede Wi-Fi; se não conectar, use `npx expo start --tunnel`).

## Estrutura

- `src/app/` — telas (Expo Router): Descobrir, Trocas, Minhas mudas, chat e cadastro de muda
- `src/components/` — card da planta, baralho com swipe, modal de match
- `src/store.tsx` — estado do app e regra de match
- `src/data/seed.ts` — dados de exemplo

## Estado atual

MVP com dados simulados em memória (sem backend, login ou fotos). Próximos passos: fotos com `expo-image-picker`, backend (Supabase) com chat em tempo real e geolocalização.
