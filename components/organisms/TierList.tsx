import { useRef, useCallback } from 'react';
import {
    DndContext,
    closestCenter,
    useSensor,
    useSensors,
    MouseSensor,
    TouchSensor,
    DragEndEvent,
} from '@dnd-kit/core';
import { GameItem, RankConfig, RankBlockHandlers } from '../../lib/types';
import { POOL_ID } from '../../lib/constants';
import RankBlock from './RankBlock';


interface TierListProps extends RankBlockHandlers {
    ranksConfig: RankConfig[];
    rankState: { [key: string]: number[] };
    gamesMap: Map<number, GameItem>;
    currentSteamId: string | null;
    steamIdInput: string;
    gamesCount: number;
    handleDragEnd: (event: DragEndEvent) => void;
    handleAddRank: () => void;
}

export default function TierList({
    ranksConfig,
    rankState,
    gamesMap,
    handleDragEnd,
    currentSteamId,
    steamIdInput,
    gamesCount,
    onRename,
    onRemove,
    onColorChange,
    handleAddRank,
}: TierListProps) {
    const tierlistRef = useRef<HTMLDivElement>(null);

    // D&D Kit sensors for mouse and touch
    const sensors = useSensors(
        useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
        useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })
    );

    const handleExport = useCallback(() => {
        console.error("Export image functionality is currently disabled");
    }, []);

    return (
        <div>
            {/* Display resolved ID and export button */}
            {currentSteamId && (
                <div className="flex justify-between items-center mb-6 export-hide">
                    <p className="text-sm text-gray-500">
                        Loaded profile: <span className="font-mono bg-gray-200 px-1 py-0.5 rounded-md text-gray-700">{steamIdInput}</span> ({gamesCount} games found)
                    </p>
                    <button
                        onClick={handleExport}
                        className="bg-gray-400 text-white p-2 rounded-lg font-semibold cursor-not-allowed flex items-center gap-2"
                        title="Export is currently disabled"
                        disabled
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                        Export to PNG
                    </button>
                </div>
            )}

            {/* Tier List Container (Export Area) */}
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <div ref={tierlistRef} className="space-y-2 p-4 border border-gray-300 rounded-xl bg-gray-50 shadow-inner">
                    <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">Tier List</h2>

                    {/* Editable Ranks */}
                    {ranksConfig.map((rank) => (
                        <RankBlock
                            key={rank.id}
                            rank={rank}
                            gameIds={rankState[rank.id] || []}
                            gamesMap={gamesMap}
                            onRename={onRename}
                            onRemove={onRemove}
                            onColorChange={onColorChange}
                        />
                    ))}

                    <div className="flex justify-center pt-4 export-hide">
                        <button
                            onClick={handleAddRank}
                            className="bg-gray-800 text-white p-2 px-4 rounded-lg font-semibold hover:bg-gray-700 transition duration-200 shadow-md flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                            Add a Rank
                        </button>
                    </div>

                    {/* Unranked Games Pool */}
                    <h2 className="text-xl font-bold text-gray-800 border-t pt-4 mt-6 pb-2">
                        Unranked Games Pool ({rankState[POOL_ID]?.length || 0})
                    </h2>
                    <RankBlock
                        key={POOL_ID}
                        rank={{ id: POOL_ID, name: 'Pool', color: '#CCCCCC' }}
                        gameIds={rankState[POOL_ID] || []}
                        gamesMap={gamesMap}
                        onRename={onRename}
                        onRemove={onRemove}
                        onColorChange={onColorChange}
                    />
                </div>
            </DndContext>
        </div>
    );
}
