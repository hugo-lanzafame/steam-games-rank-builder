import { Tier } from "./types";

export const DEFAULT_TIERLIST_TEMPLATE: Tier[] = [
    { name: 'S', color: '#ED1D25', gamesId: [] },
    { name: 'A', color: '#FF7E01', gamesId: [] },
    { name: 'B', color: '#FFF201', gamesId: [] },
    { name: 'C', color: '#22B04D', gamesId: [] },
    { name: 'D', color: '#4C6DF2', gamesId: [] },
];

export const DRAGGABLE_GAME_ID_PREFIX = 'game-';
export const DROPPABLE_TIER_ID_PREFIX = 'tier-';
export const DROPPABLE_UNRANKED_ID = 'unranked';
