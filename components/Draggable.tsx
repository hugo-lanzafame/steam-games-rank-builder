import { useDraggable } from '@dnd-kit/core';

export default function Draggable({draggableId, children}: {draggableId: string, children: React.ReactNode}) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: draggableId,
    });
    
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {children}
        </div>
    );
}