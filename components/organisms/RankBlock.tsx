import { useDroppable } from '@dnd-kit/core';
import { RankConfig, RankBlockHandlers, GameItem } from '../../lib/types';
import { POOL_ID } from '../../lib/constants';
import GameIcon from '../atoms/GameIcon'; 
import RankControls from '../molecules/RankControls';

interface RankBlockProps extends RankBlockHandlers { 
    rank: RankConfig;
    gameIds: number[];
    gamesMap: Map<number, GameItem>;
}

export default function RankBlock({ rank, gameIds, gamesMap, onRename, onRemove, onColorChange }: RankBlockProps) {
    const isPool = rank.id === POOL_ID;
    const { isOver, setNodeRef } = useDroppable({
        id: rank.id,
        data: {
            type: 'RankBlock',
            rankId: rank.id,
        }
    });

    const backgroundColor = isPool ? 'transparent' : rank.color + (isOver ? 'AA' : 'FF'); 
    const poolClasses = isPool ? "border-dashed border-2 border-gray-400 bg-gray-100" : "border border-gray-300 shadow-lg";

    return (
        <div 
            className={`flex mb-2 rounded-xl transition duration-150 ${poolClasses}`}
        >
            {/* Controls block */}
            {!isPool && (
                <div className="shrink-0 w-32 rounded-l-xl export-hide">
                    <RankControls 
                        rank={rank}
                        onRename={onRename}
                        onRemove={onRemove}
                        onColorChange={onColorChange}
                    />
                </div>
            )}

            {/* Body block */}
            <div 
                ref={setNodeRef} // Drop zone is here
                style={{ backgroundColor }}
                className={`grow p-2 md:p-3 flex flex-wrap content-start gap-1 md:gap-2 transition duration-150 ${isOver ? 'ring-4 ring-offset-0 ring-opacity-50 ring-yellow-500' : ''}`}
            >
                {gameIds.length === 0 && (
                    <p className="text-sm text-gray-500 italic p-2 self-center">
                        {isPool ? 
                            "Your unranked Steam games will appear here. Drag them into the ranking blocks!" : 
                            `Drop games into the ${rank.name} category.`
                        }
                    </p>
                )}

                {/* Mapping GameIcon Atoms */}
                {gameIds.map((gameId) => {
                    const game = gamesMap.get(gameId);
                    if (!game) return null;
                    
                    return <GameIcon key={game.id} game={game} />;
                })}
            </div>
        </div>
    );
}
