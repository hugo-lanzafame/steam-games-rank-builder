'use client';

import { useDraggable } from '@dnd-kit/core';
import { useTierlistStore } from '@/stores/useTierlistStore';
import { DRAGGABLE_GAME_ID_PREFIX } from '@/lib/constants';

export default function GameIcon({ gameId }: { gameId: number }) {
    const getGameById = useTierlistStore((state) => state.getGameById);
    const game = getGameById(gameId);

    if (!game) {
        return null;
    }

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: DRAGGABLE_GAME_ID_PREFIX + gameId,
    });
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    return (
        <div key={gameId} ref={setNodeRef} style={style} {...listeners} {...attributes} className='game-icon'>
            <img src={game.iconUrl} alt={game.name} />
        </div>
    );
}