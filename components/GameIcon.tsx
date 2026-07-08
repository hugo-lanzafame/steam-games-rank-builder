'use client';

import { useState } from 'react';
import { useTierlistStore } from '@/stores/useTierlistStore';
import { DRAGGABLE_GAME_ID_PREFIX } from '@/lib/constants';
import Draggable from './Draggable';

export default function GameIcon({ gameId }: { gameId: number }) {
    const getGameById = useTierlistStore((state) => state.getGameById);
    const game = getGameById(gameId);

    if (!game) {
        return null;
    }

    const draggableId = DRAGGABLE_GAME_ID_PREFIX + game.id;
    const [imgError, setImgError] = useState(false);

    return (
        <Draggable draggableId={draggableId}>
            <div className="game-icon">
                {!imgError ? (
                    <img
                        src={game.iconUrl}
                        alt={game.name}
                        onError={() => setImgError(true)}
                        loading="lazy"
                    />
                ) : (
                    <div className='game-placeholder'>
                        <span>{game.name}</span>
                    </div>
                )}
            </div>
        </Draggable>
    );
}