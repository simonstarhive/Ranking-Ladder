import { useState } from "react";
import { X } from "lucide-react";

/* Match AdminMensRanking Player type */
type Player = {
  id: number;
  rank: number;
  firstName: string;
  lastName: string;
};

interface Props {
  players: Player[];
  onClose: () => void;
  onSave: (player: Player) => void;
  onDelete: (id: number) => void;
}

export default function EditPlayerPop({
  players,
  onClose,
  onSave,
  onDelete,
}: Props) {
  const [selected, setSelected] = useState<Player | null>(null);

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative w-[95%] max-w-lg bg-white rounded-xl shadow-xl p-6">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
        >
          <X />
        </button>

        <h2 className="text-xl font-bold mb-4">Edit Player</h2>

        {/* Player List */}
        {!selected && (
          <div className="max-h-64 overflow-y-auto divide-y mb-4">
            {players.length === 0 ? (
              <p className="p-4 text-center text-gray-500">
                No players available
              </p>
            ) : (
              players.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelected(p)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  {p.rank}. {p.firstName} {p.lastName}
                </button>
              ))
            )}
          </div>
        )}

        {/* Edit Form */}
        {selected && (
          <div className="flex flex-col gap-3">
            <input
              value={selected.firstName}
              onChange={(e) =>
                setSelected({
                  ...selected,
                  firstName: e.target.value,
                })
              }
              className="border p-2 rounded"
              placeholder="First Name"
            />

            <input
              value={selected.lastName}
              onChange={(e) =>
                setSelected({
                  ...selected,
                  lastName: e.target.value,
                })
              }
              className="border p-2 rounded"
              placeholder="Last Name"
            />

            <input
              type="number"
              value={selected.rank}
              onChange={(e) =>
                setSelected({
                  ...selected,
                  rank: Number(e.target.value),
                })
              }
              className="border p-2 rounded"
              placeholder="Rank"
            />

            {/* Actions */}
            <div className="flex justify-between mt-4">
              <button
                onClick={() => onDelete(selected.id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => setSelected(null)}
                  className="px-4 py-2 bg-gray-200 rounded"
                >
                  Back
                </button>

                <button
                  onClick={() => onSave(selected)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}