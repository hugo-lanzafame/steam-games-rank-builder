export interface GameItem {
  id: number;
  name: string;
  iconUrl: string;
  playtimeHours: number;
}

export interface RankConfig {
  id: string;
  name: string;
  color: string;
}

export interface RankBlockHandlers {
  onRename: (id: string, newName: string) => void;
  onRemove: (id: string) => void;
  onColorChange: (id: string, newColor: string) => void;
}
