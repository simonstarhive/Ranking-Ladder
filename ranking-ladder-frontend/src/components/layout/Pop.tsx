import { useRef } from "react";
import { X } from "lucide-react";

interface PopProps {
  onClose: () => void;
  players?: { rank: number; name: string }[];
  onSelectPlayer?: (name: string) => void;
}

function Pop({ onClose, players = [], onSelectPlayer }: PopProps) {
  const popRef = useRef<HTMLDivElement | null>(null);

  const closePop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (popRef.current === e.target) {
      onClose();
    }
  };

  return (
    <div
      ref={popRef}
      onClick={closePop}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
    >
      <div
        className="relative w-[90%] max-w-md bg-white rounded-xl shadow-xl"
        onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
        >
          <X size={24} />
        </button>

        
        <div className="bg-yellow-400 rounded-t-xl px-6 py-4 text-center">
          <h1 className="text-2xl font-bold text-white">
            Challenge Player
          </h1>
        </div>

        {/* Scrollable Ranking List */}
        <div className="max-h-80 overflow-y-auto divide-y">
          {players.map((player) => (
            <button
              key={player.rank}
              onClick={() => onSelectPlayer?.(player.name)}
              className="w-full text-left px-6 py-3 hover:bg-gray-100 transition"
            >
              <span className="font-semibold">{player.rank}.</span>{" "}
              {player.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Pop;
