import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  type ReactNode,
} from 'react';

import { autoReplies, ME, seedPlants, seedUsers } from '@/data/seed';
import type { Match, Message, Plant, SwipeDirection, User } from '@/types';

type State = {
  users: Record<string, User>;
  plants: Plant[];
  swiped: Record<string, SwipeDirection>;
  matches: Match[];
  messages: Record<string, Message[]>;
};

type Action =
  | { type: 'swipe'; plantId: string; dir: SwipeDirection; match?: Match }
  | { type: 'resetPassed' }
  | { type: 'addPlant'; plant: Plant }
  | { type: 'removePlant'; plantId: string }
  | { type: 'send'; userId: string; message: Message };

const initialState: State = {
  users: seedUsers,
  plants: seedPlants,
  swiped: {},
  matches: [],
  messages: {},
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'swipe':
      return {
        ...state,
        swiped: { ...state.swiped, [action.plantId]: action.dir },
        matches: action.match ? [action.match, ...state.matches] : state.matches,
      };
    case 'resetPassed': {
      const swiped = Object.fromEntries(Object.entries(state.swiped).filter(([, dir]) => dir === 'right'));
      return { ...state, swiped };
    }
    case 'addPlant':
      return { ...state, plants: [...state.plants, action.plant] };
    case 'removePlant':
      return { ...state, plants: state.plants.filter((p) => p.id !== action.plantId) };
    case 'send':
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.userId]: [...(state.messages[action.userId] ?? []), action.message],
        },
      };
  }
}

let idCounter = 0;
export const newId = (prefix: string) => `${prefix}-${Date.now().toString(36)}-${idCounter++}`;

type Store = State & {
  deck: Plant[];
  myPlants: Plant[];
  /** Registra o swipe e retorna o match criado, se houver. */
  swipe: (plant: Plant, dir: SwipeDirection) => Match | null;
  resetPassed: () => void;
  addPlant: (plant: Omit<Plant, 'id' | 'ownerId'>) => void;
  removePlant: (plantId: string) => void;
  sendMessage: (userId: string, text: string) => void;
};

const StoreContext = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const stateRef = useRef(state);
  useLayoutEffect(() => {
    stateRef.current = state;
  }, [state]);

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const deck = useMemo(
    () => state.plants.filter((p) => p.ownerId !== ME && !state.swiped[p.id]),
    [state.plants, state.swiped],
  );
  const myPlants = useMemo(() => state.plants.filter((p) => p.ownerId === ME), [state.plants]);

  const swipe = useCallback((plant: Plant, dir: SwipeDirection) => {
    const { users, matches, plants } = stateRef.current;
    const owner = users[plant.ownerId];
    const alreadyMatched = matches.some((m) => m.userId === plant.ownerId);
    // Simulação: no backend real, o match é decidido no servidor quando as duas curtidas existem.
    const match: Match | undefined =
      dir === 'right' && owner?.likesMe && !alreadyMatched
        ? {
            userId: owner.id,
            theirPlantId: plant.id,
            myPlantId: plants.find((p) => p.ownerId === ME)?.id,
            createdAt: Date.now(),
          }
        : undefined;
    dispatch({ type: 'swipe', plantId: plant.id, dir, match });
    return match ?? null;
  }, []);

  const resetPassed = useCallback(() => dispatch({ type: 'resetPassed' }), []);

  const addPlant = useCallback((plant: Omit<Plant, 'id' | 'ownerId'>) => {
    dispatch({ type: 'addPlant', plant: { ...plant, id: newId('plant'), ownerId: ME } });
  }, []);

  const removePlant = useCallback((plantId: string) => dispatch({ type: 'removePlant', plantId }), []);

  const sendMessage = useCallback((userId: string, text: string) => {
    dispatch({ type: 'send', userId, message: { id: newId('msg'), from: ME, text, at: Date.now() } });
    // Simulação de resposta da outra pessoa.
    const sentByMe = (stateRef.current.messages[userId] ?? []).filter((m) => m.from === ME).length;
    const reply = autoReplies[sentByMe % autoReplies.length];
    timers.current.push(
      setTimeout(() => {
        dispatch({ type: 'send', userId, message: { id: newId('msg'), from: userId, text: reply, at: Date.now() } });
      }, 1200),
    );
  }, []);

  const value = useMemo<Store>(
    () => ({ ...state, deck, myPlants, swipe, resetPassed, addPlant, removePlant, sendMessage }),
    [state, deck, myPlants, swipe, resetPassed, addPlant, removePlant, sendMessage],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const store = useContext(StoreContext);
  if (!store) throw new Error('useStore precisa estar dentro de <StoreProvider>');
  return store;
}
