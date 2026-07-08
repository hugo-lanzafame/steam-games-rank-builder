'use client';

import { Tier } from '@/lib/types'
import GameIcon from './GameIcon';
import Droppable from './Droppable';
import { DROPPABLE_TIER_ID_PREFIX } from '@/lib/constants';

export default function TierRow({ tier }: { tier: Tier }) {
    const droppableId = DROPPABLE_TIER_ID_PREFIX + tier.name;

    return (
        <Droppable droppableId={droppableId} key={tier.name} >
            <div className="tierlist-row">
                <div className="box tierlist-badge" style={{ backgroundColor: tier.color }}>
                    {tier.name}
                </div>
                <div className="box tierlist-games">
                    {tier.gamesId.map((gameId) => (
                        <GameIcon key={gameId} gameId={gameId} />
                    ))}
                </div>
            </div>
        </Droppable>
    );
}
