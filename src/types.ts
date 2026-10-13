export type PlantKind = 'Muda' | 'Estaca' | 'Sementes' | 'Planta adulta';
export type Light = 'Sol pleno' | 'Meia-sombra' | 'Sombra';
export type Water = 'Pouca' | 'Moderada' | 'Muita';

export const PLANT_KINDS: PlantKind[] = ['Muda', 'Estaca', 'Sementes', 'Planta adulta'];
export const LIGHTS: Light[] = ['Sol pleno', 'Meia-sombra', 'Sombra'];
export const WATERS: Water[] = ['Pouca', 'Moderada', 'Muita'];

export type Plant = {
  id: string;
  ownerId: string;
  name: string;
  species: string;
  emoji: string;
  color: string;
  kind: PlantKind;
  light: Light;
  water: Water;
  description: string;
  /** O que o dono aceita em troca. */
  wants?: string;
};

export type User = {
  id: string;
  name: string;
  avatar: string;
  city: string;
  distanceKm: number;
  /** Simulação do backend: este usuário já curtiu uma planta sua. */
  likesMe: boolean;
};

export type Message = {
  id: string;
  from: string;
  text: string;
  at: number;
};

export type Match = {
  userId: string;
  theirPlantId: string;
  myPlantId?: string;
  createdAt: number;
};

export type SwipeDirection = 'left' | 'right';
