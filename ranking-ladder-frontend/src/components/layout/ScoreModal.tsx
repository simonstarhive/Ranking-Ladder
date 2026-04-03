import { useState } from "react";

/*  TYPES  */
export type Score = {
  id: number;
  playerA: string;
  playerB: string;
  score: string;
};

export type NewScore = {
  playerA: string;
  playerB: string;
  score: string;
};

type ScoreModalProps = {
  score?: {
    id: number;
    playerA: string;
    playerB: string;
    score: string;
  };
  onClose: () => void;
  onSave: (score: {
    id?: number;
    playerA: string;
    playerB: string;
    score: string;
  }) => void;
  onDelete?: (id: number) => void;
};

export default function ScoreModal({
  score,
  onClose,
  onSave,
  onDelete,
}: ScoreModalProps) {
  const [playerA, setPlayerA] = useState(score?.playerA || "");
  const [playerB, setPlayerB] = useState(score?.playerB || "");
  const [matchScore, setMatchScore] = useState(score?.score || "");

  const handleSave = () => {
  if (!playerA || !playerB || !matchScore) {
    alert("Please fill out all fields");
    return;
  }

  if (score) {
    onSave({
      id: score.id,
      playerA,
      playerB,
      score: matchScore,
    });
  } else {
    onSave({
      playerA,
      playerB,
      score: matchScore,
    });
  }
};

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[320px] flex flex-col gap-3">
        <h2 className="text-xl font-bold text-center">
          {score ? "Edit Score" : "Add Score"}
        </h2>

        <input
          value={playerA}
          onChange={(e) => setPlayerA(e.target.value)}
          placeholder="Player A (Winner)"
          className="border p-2 rounded"
        />

        <input
          value={playerB}
          onChange={(e) => setPlayerB(e.target.value)}
          placeholder="Player B (Loser)"
          className="border p-2 rounded"
        />

        <input
          value={matchScore}
          onChange={(e) => setMatchScore(e.target.value)}
          placeholder="Score (e.g. 6-2)"
          className="border p-2 rounded"
        />

        <button
          onClick={handleSave}
          className="bg-blue-500 text-white py-2 rounded"
        >
          Save
        </button>

        {score && onDelete && (
          <button
            onClick={() => onDelete(score.id)}
            className="bg-red-500 text-white py-2 rounded"
          >
            Delete
          </button>
        )}

        <button onClick={onClose} className="text-gray-500">
          Cancel
        </button>
      </div>
    </div>
  );
}