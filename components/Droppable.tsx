import { useDroppable } from '@dnd-kit/core';

export default function Droppable({droppableId, children}: {droppableId: string, children: React.ReactNode}) {
    const { isOver, setNodeRef } = useDroppable({
        id: droppableId,
    });
    
    const style = {
        color: isOver ? 'green' : undefined,
    };

    return (
        <div ref={setNodeRef} style={style}>
            {children}
        </div>
    );
}