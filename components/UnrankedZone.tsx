'use client';

import { useDroppable } from '@dnd-kit/core';
import { useTierlistStore } from '@/stores/useTierlistStore';
import GameIcon from './GameIcon';

export default function UnrankedZone() {
    const unrankedGamesId = useTierlistStore((state) => state.unrankedGamesId);

    const { isOver, setNodeRef } = useDroppable({
        id: `unranked`,
    });
    const style = {
        color: isOver ? 'green' : undefined,
    };

    return (
        <div className="unranked-zone">
            <h2>UNRANKED GAMES</h2>
            <hr className="separator" />
            <div ref={setNodeRef} className="unranked-games" style={style}>
                {Object.entries(unrankedGamesId).length === 0 && (
                    <p>No unranked games.</p>
                )}
                {unrankedGamesId.map((gameId) => (
                    <GameIcon key={gameId} gameId={gameId} />
                ))}
            </div>
        </div>
    );
}