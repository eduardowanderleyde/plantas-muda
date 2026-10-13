import type { Plant, User } from '@/types';

export const ME = 'me';

export const seedUsers: Record<string, User> = {
  ana: { id: 'ana', name: 'Ana', avatar: '👩‍🌾', city: 'Pinheiros', distanceKm: 2, likesMe: true },
  bruno: { id: 'bruno', name: 'Bruno', avatar: '🧔', city: 'Vila Madalena', distanceKm: 3, likesMe: false },
  carla: { id: 'carla', name: 'Carla', avatar: '👩‍🦱', city: 'Butantã', distanceKm: 6, likesMe: true },
  diego: { id: 'diego', name: 'Diego', avatar: '👨‍🦰', city: 'Mooca', distanceKm: 11, likesMe: false },
  elis: { id: 'elis', name: 'Elis', avatar: '👩‍🦳', city: 'Lapa', distanceKm: 5, likesMe: true },
  fabio: { id: 'fabio', name: 'Fábio', avatar: '🧑‍🎨', city: 'Santana', distanceKm: 14, likesMe: false },
};

export const seedPlants: Plant[] = [
  {
    id: 'p1', ownerId: 'ana', name: 'Costela-de-adão', species: 'Monstera deliciosa', emoji: '🌿',
    color: '#CFE8D5', kind: 'Muda', light: 'Meia-sombra', water: 'Moderada',
    description: 'Muda enraizada na água, já com 3 folhas. Mãe tem mais de 2 m!',
    wants: 'Suculentas ou jiboia variegada',
  },
  {
    id: 'p2', ownerId: 'bruno', name: 'Jiboia neon', species: 'Epipremnum aureum', emoji: '🍃',
    color: '#E4F2C2', kind: 'Estaca', light: 'Meia-sombra', water: 'Moderada',
    description: 'Estacas de jiboia neon, verde-limão bem vivo. Pego rápido.',
    wants: 'Qualquer samambaia',
  },
  {
    id: 'p3', ownerId: 'carla', name: 'Echeveria', species: 'Echeveria elegans', emoji: '🪴',
    color: '#DCE8EE', kind: 'Muda', light: 'Sol pleno', water: 'Pouca',
    description: 'Filhotes de echeveria, perfeitos pra quem esquece de regar.',
    wants: 'Cactos ou temperos',
  },
  {
    id: 'p4', ownerId: 'diego', name: 'Manjericão', species: 'Ocimum basilicum', emoji: '🌱',
    color: '#D7EFCF', kind: 'Sementes', light: 'Sol pleno', water: 'Muita',
    description: 'Sementes colhidas da minha horta de varanda. Cheiro incrível.',
    wants: 'Pimenteiras',
  },
  {
    id: 'p5', ownerId: 'elis', name: 'Lírio-da-paz', species: 'Spathiphyllum wallisii', emoji: '🌼',
    color: '#F1EEDB', kind: 'Planta adulta', light: 'Sombra', water: 'Moderada',
    description: 'Já floresce! Estou mudando e não cabe no apê novo.',
    wants: 'Algo pequeno pra mesa',
  },
  {
    id: 'p6', ownerId: 'fabio', name: 'Cacto-orelha', species: 'Opuntia microdasys', emoji: '🌵',
    color: '#F2E3CF', kind: 'Muda', light: 'Sol pleno', water: 'Pouca',
    description: 'Raquetes enraizadas. Cuidado com os espinhos fofinhos 😅',
    wants: 'Suculentas',
  },
  {
    id: 'p7', ownerId: 'ana', name: 'Samambaia', species: 'Nephrolepis exaltata', emoji: '🌿',
    color: '#D4EDE1', kind: 'Muda', light: 'Meia-sombra', water: 'Muita',
    description: 'Divisão de touceira, vai bem em banheiro com janela.',
  },
  {
    id: 'p8', ownerId: 'carla', name: 'Pimenta biquinho', species: 'Capsicum chinense', emoji: '🌶️',
    color: '#F6DCD6', kind: 'Muda', light: 'Sol pleno', water: 'Moderada',
    description: 'Mudinhas de 15 cm, já começando a dar flor.',
    wants: 'Ervas aromáticas',
  },
  {
    id: 'p9', ownerId: 'elis', name: 'Orquídea', species: 'Phalaenopsis', emoji: '🌸',
    color: '#EEDDF0', kind: 'Planta adulta', light: 'Meia-sombra', water: 'Pouca',
    description: 'Keiki (filhote) que nasceu da haste. Já tem raízes.',
    wants: 'Bromélias',
  },
  {
    id: 'p10', ownerId: 'bruno', name: 'Zamioculca', species: 'Zamioculcas zamiifolia', emoji: '🌾',
    color: '#DDE9D0', kind: 'Muda', light: 'Sombra', water: 'Pouca',
    description: 'Praticamente indestrutível. Ideal pra escritório.',
  },
  {
    id: 'm1', ownerId: ME, name: 'Espada-de-são-jorge', species: 'Dracaena trifasciata', emoji: '🗡️',
    color: '#DCEBD6', kind: 'Muda', light: 'Meia-sombra', water: 'Pouca',
    description: 'Mudas tiradas do vaso grande da sala.',
    wants: 'Costela-de-adão',
  },
  {
    id: 'm2', ownerId: ME, name: 'Hortelã', species: 'Mentha spicata', emoji: '🌱',
    color: '#D5F0E0', kind: 'Estaca', light: 'Meia-sombra', water: 'Muita',
    description: 'Estacas de hortelã, enraíza em uma semana na água.',
  },
];

export const autoReplies = [
  'Oii! Que bom que deu match 🌱',
  'Topa trocar esse fim de semana?',
  'Posso te mandar mais fotos se quiser!',
  'Fica bom pra você perto do metrô?',
  'Combinado! Vou separar a muda 😊',
];
