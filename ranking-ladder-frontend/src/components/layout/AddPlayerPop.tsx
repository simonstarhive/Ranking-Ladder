import { useRef } from "react";
import { X } from "lucide-react";

/* Match what AdminMensRanking sends */
interface Player {
  id: number;
  name: string;
}

interface AddPlayerPopProps {
  players: Player[];
  onClose: () => void;
  onSelect: (player: Player) => void;
}

export default function AddPlayerPop({
  players,
  onClose,
  onSelect,
}: AddPlayerPopProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const handleBackdropClick = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    if (ref.current === e.target) {
      onClose();
    }
  };

  return (
    <div
      ref={ref}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
    >
      <div
        className="relative w-[90%] max-w-md bg-white rounded-xl shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
        >
          <X size={22} />
        </button>

        {/* Header */}
        <div className="bg-blue-500 text-white text-center py-3 rounded-t-xl font-bold">
          Add Player
        </div>

        {/* Player List */}
        <div className="max-h-80 overflow-y-auto divide-y">
          {players.length === 0 ? (
            <p className="p-4 text-center text-gray-500">
              No players available
            </p>
          ) : (
            players.map((player) => (
              <button
                key={player.id}
                onClick={() => onSelect(player)}
                className="w-full text-left px-5 py-3 hover:bg-gray-100 transition"
              >
                {player.name}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}