export interface Game {
  id: number;
  name: string;
  iconUrl: string;
  playtimeHours: number;
}

export interface Tier {
  name: string;
  color: string;
  gamesId: number[];
}

export interface TierlistState {
    steamId: string;
    games: Game[];
    tiers: Tier[];
    unrankedGamesId: number[];
    setTierlist: (steamId: string, games: Game[]) => void;
    getGameById: (id: number) => Game | undefined;
    moveGame: (draggableId: string, droppableId: string) => void;
}
