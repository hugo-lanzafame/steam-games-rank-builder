import { Tier } from "./types";

export const DEFAULT_TIERLIST_TEMPLATE: Tier[] = [
    { name: 'S', color: '#ff7f7f', gamesId: [] },
    { name: 'A', color: '#ffbf7f', gamesId: [] },
    { name: 'B', color: '#ffff7f', gamesId: [] },
    { name: 'C', color: '#7fff7f', gamesId: [] },
    { name: 'D', color: '#7fbfff', gamesId: [] },
];

export const DRAGGABLE_GAME_ID_PREFIX = 'game-';
export const DROPPABLE_TIER_ID_PREFIX = 'tier-';
export const DROPPABLE_UNRANKED_ID = 'unranked';
