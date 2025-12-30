'use client';

import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { useTierlistStore } from '@/stores/useTierlistStore';
import TierListZone from './TierlistZone';
import UnrankedZone from './UnrankedZone';

export default function DndContainer() {
    const tiers = useTierlistStore((state) => state.tiers);

    const moveGame = useTierlistStore((state) => state.moveGame);

    function handleDragEnd(event: DragEndEvent) {
        console.log('Drag ended:', tiers);
        const { active, over } = event;

        if (!over) return;

        const draggableId = active.id as string;
        const droppableId = over.id as string;

        moveGame(draggableId, droppableId);
    }

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className="box">
                <TierListZone />
                <UnrankedZone />
            </div>
        </DndContext >
    );
}