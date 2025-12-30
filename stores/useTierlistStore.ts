import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Game, TierlistState } from '@/lib/types';
import { DEFAULT_TIERLIST_TEMPLATE } from '@/lib/constants';

export const useTierlistStore = create<TierlistState>()(
    persist(
        (set, get) => ({
            steamId: '',
            games: [],
            tiers: [],
            unrankedGamesId: [],

            setTierlist: (steamId: string, games: Game[]): void => {
                set({
                    steamId,
                    games,
                    tiers: DEFAULT_TIERLIST_TEMPLATE,
                    unrankedGamesId: games.map((game) => game.id),
                })
            },

            getGameById: (id: number): Game | undefined => {
                return get().games.find((game) => game.id === id);
            },

            moveGame: (draggableId: string, droppableId: string) => set((state) => {
                const gameId = Number(draggableId.toString().replace('game-', ''));
                const tierName = droppableId.toString().replace('tier-', '');

                // Remove the game from its current location
                const newUnranked = state.unrankedGamesId.filter(id => id !== gameId);
                const newTiers = state.tiers.map(tier => ({
                    ...tier,
                    gamesId: tier.gamesId.filter(id => id !== gameId)
                }));

                if (droppableId === 'unranked') {
                    return {
                        unrankedGamesId: [...newUnranked, gameId],
                        tiers: newTiers
                    };
                } else {
                    const updatedTiers = newTiers.map(tier =>
                        tier.name === tierName
                            ? { ...tier, gamesId: [...tier.gamesId, gameId] }
                            : tier
                    );
                    return { unrankedGamesId: newUnranked, tiers: updatedTiers };
                }
            }),
        }),
        { name: 'steam-games-rank-builder-storage' }
    )
);