import { useState } from "react";
import { RankConfig, RankBlockHandlers } from '../../lib/types';

interface RankControlsProps extends RankBlockHandlers {
    rank: RankConfig;
}

export default function RankControls({ rank, onRename, onColorChange, onRemove }: RankControlsProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(rank.name);

    const handleRename = () => {
        if (newName.trim() && newName.trim() !== rank.name) {
            onRename(rank.id, newName.trim());
        }
        setIsEditing(false);
    };

    return (
        <div
            className="h-full flex flex-col justify-between items-center text-white font-bold text-xl transition duration-150"
            style={{ backgroundColor: rank.color }}
        >
            <div className="text-center w-full">
                {/** Edit Input **/}
                {isEditing ? (
                    <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        onBlur={handleRename}
                        onKeyDown={(e) => { if (e.key === 'Enter') handleRename(); }}
                        className="w-full text-center bg-white text-gray-800 p-1 rounded text-base font-bold"
                        autoFocus
                    />
                ) : (
                    <span className="cursor-pointer hover:underline" onClick={() => setIsEditing(true)}>{rank.name}</span>
                )}

                {/** Color Picker */}
                <input
                    type="color"
                    value={rank.color}
                    onChange={(e) => onColorChange(rank.id, e.target.value)}
                    className="mt-1 w-8 h-8 cursor-pointer rounded-full border-2 border-white"
                    title="Change the color"
                />

                {/** Remove Button */}
                <button
                    onClick={() => onRemove(rank.id)}
                    className="mt-2 text-sm text-white/80 hover:text-white transition duration-150"
                    title="Remove the rank (games will be returned to the Pool)"
                >
                    Remove
                </button>
            </div>
        </div>
    );
}
