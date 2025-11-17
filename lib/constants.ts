import { RankConfig } from './types';

export const POOL_ID = 'Pool';

export const defaultTiers: RankConfig[] = [
  { id: 'S', name: 'S', color: '#EF4444' }, // Red
  { id: 'A', name: 'A', color: '#F97316' }, // Orange
  { id: 'B', name: 'B', color: '#FACC15' }, // Yellow
  { id: 'C', name: 'C', color: '#84CC16' }, // Lime Green
  { id: 'D', name: 'D', color: '#3B82F6' }, // Blue
];
