'use client';

import { useTierlistStore } from '@/stores/useTierlistStore';
import GameIcon from './GameIcon';
import Droppable from './Droppable';
import { DROPPABLE_UNRANKED_ID } from '@/lib/constants';

export default function UnrankedZone() {
    const unrankedGamesId = useTierlistStore((state) => state.unrankedGamesId);
    const droppableId = DROPPABLE_UNRANKED_ID;

    return (
        <div className="unranked-zone">
            <h2>UNRANKED GAMES</h2>
            <hr className="separator" />
            <Droppable droppableId={droppableId}>
                <div className="unranked-games">
                    {Object.entries(unrankedGamesId).length === 0 && (
                        <p>No unranked games.</p>
                    )}
                    {unrankedGamesId.map((gameId) => (
                        <GameIcon key={gameId} gameId={gameId} />
                    ))}
                </div>
            </Droppable>
        </div>
    );
}