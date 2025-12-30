'use client';

import { useDroppable } from '@dnd-kit/core';
import { Tier } from '@/lib/types'
import GameIcon from './GameIcon';

export default function TierRow({ tier }: { tier: Tier }) {
    const { isOver, setNodeRef } = useDroppable({
        id: `tier-${tier.name}`,
    });
    const style = {
        color: isOver ? 'green' : undefined,
    };

    return (
        <div ref={setNodeRef} key={tier.name} className="tierlist-row" style={style}>
            <div className="box tierlist-badge" style={{ backgroundColor: tier.color }}>
                {tier.name}
            </div>
            <div className="box tierlist-games">
                {tier.gamesId.map((gameId) => (
                    <GameIcon key={gameId} gameId={gameId} />
                ))}
            </div>
        </div>
    );
}
