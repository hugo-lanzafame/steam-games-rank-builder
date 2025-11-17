import { useDraggable } from '@dnd-kit/core';
import { GameItem } from '../../lib/types';

interface GameIconProps {
    game: GameItem;
}

export default function GameIcon({ game }: GameIconProps) {
    const idString = String(game.id);

    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: idString,
        data: {
            type: 'Game',
            gameId: game.id,
        }
    });

    const style = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        zIndex: isDragging ? 10 : 1,
        cursor: 'grab',
    };

    return (
        <div
            ref={setNodeRef} // Draggable zone is here
            style={style}
            {...listeners}
            {...attributes}
            className={`relative w-12 h-12 rounded-lg overflow-hidden shadow-md transition transform ${isDragging ? 'opacity-70 scale-110 shadow-lg ring-4 ring-yellow-400' : 'hover:scale-105'}`}
            title={`${game.name} (${game.playtimeHours}h)`}
        >
            <img
                src={game.iconUrl}
                alt={game.name}
                className="w-full h-full object-cover"
                // fallback to placeholder on error
                onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = "https://placehold.co/48x48/CCCCCC/000000?text= ?";
                }}
            />
            {/* playtime overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition duration-150 flex items-center justify-center text-xs text-white p-1 text-center leading-tight">
                {game.playtimeHours}h
            </div>
        </div>
    );
}
