import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "../components/ui/PageTitle";
import Layout from "../components/ui/Layout";
import AdminButton from "../components/ui/AdminButton";
import ScoreModal from "../components/layout/ScoreModal";
import API_BASE_URL from "../services/api";


export type Score = {
  id: number;
  playerA: string;
  playerB: string;
  score: string;
  gender: string;
};

export type NewScore = {
  playerA: string;
  playerB: string;
  score: string;
  gender: string;
};


export default function AdminMenScore() {
  const navigate = useNavigate();

  const [scores, setScores] = useState<Score[]>([]);
  const [selectedScore, setSelectedScore] = useState<Score | null>(null);
  const [loading, setLoading] = useState(true);

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  
  useEffect(() => {
    const loadScores = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/scores?gender=MALE` //  
        );
        const data = await res.json();
        setScores(data);
      } catch (err) {
        console.error("Error loading scores:", err);
      } finally {
        setLoading(false);
      }
    };

    loadScores();
  }, []);

  
  const handleAddScore = async (newScore: NewScore) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/scores`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...newScore,
            gender: "MALE",
          }),
        }
      );

      if (!response.ok) {
        const err = await response.text();
        console.error("Backend error:", err);
        return;
      }

      const saved = await response.json();
      setScores((prev) => [saved, ...prev]);
      setShowAdd(false);
    } catch (err) {
      console.error("Error adding score:", err);
    }
  };

  
  const handleSaveScore = async (updated: Score) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/scores/${updated.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updated),
        }
      );

      if (!response.ok) {
        const err = await response.text();
        console.error("Backend error:", err);
        return;
      }

      const saved = await response.json();

      setScores((prev) =>
        prev.map((s) => (s.id === saved.id ? saved : s))
      );

      setShowEdit(false);
    } catch (err) {
      console.error("Error updating score:", err);
    }
  };

  
  const handleDeleteScore = async (id: number) => {
    try {
      await fetch(`${API_BASE_URL}/scores/${id}`, {
        method: "DELETE",
      });

      setScores((prev) => prev.filter((s) => s.id !== id));
      setShowEdit(false);
    } catch (err) {
      console.error("Error deleting score:", err);
    }
  };

  
  return (
    <Layout>
      {/* HEADER */}
      <div className="relative mb-4 flex items-center justify-center">
        <button
          onClick={() => navigate("/AdminWelcome")}
          className="absolute left-0 px-3 py-1 text-xs
            sm:px-4 sm:py-2 sm:text-sm
            md:px-5 md:py-2 md:text-base
            rounded-lg bg-blue-500 hover:bg-blue-600
            text-white font-semibold"
        >
          ←
        </button>

        <div className="flex-1 text-center">
          <PageTitle title="Men's Scores" />
        </div>

        <div className="flex shrink-0 gap-2">
          <AdminButton onClick={() => setShowAdd(true)}>
            Add
          </AdminButton>

          <AdminButton
            onClick={() => {
              if (!selectedScore) {
                alert("Select a score first");
                return;
              }
              setShowEdit(true);
            }}
          >
            Edit
          </AdminButton>
        </div>
      </div>

      {/* SCORES LIST */}
      <div className="bg-white rounded-2xl shadow-lg p-5 space-y-3">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : scores.length === 0 ? (
          <p className="text-center text-gray-500">No scores yet</p>
        ) : (
          scores.map((match) => (
            <div
              key={match.id}
              onClick={() => setSelectedScore(match)}
              className={`cursor-pointer border-b pb-3 rounded-lg px-2 transition
                ${
                  selectedScore?.id === match.id
                    ? "bg-blue-100"
                    : "hover:bg-gray-50"
                }`}
            >
              <p>
                <span className="font-semibold">
                  {match.playerA}
                </span>{" "}
                defeated{" "}
                <span className="font-semibold">
                  {match.playerB}
                </span>{" "}
                ({match.score})
              </p>
            </div>
          ))
        )}
      </div>

      {/* ADD MODAL */}
      {showAdd && (
        <ScoreModal
          onClose={() => setShowAdd(false)}
          onSave={(data) =>
            handleAddScore({
              ...(data as NewScore),
              gender: "MALE",
            })
          }
        />
      )}

      {/* EDIT MODAL */}
      {showEdit && selectedScore && (
        <ScoreModal
          key={selectedScore.id}
          score={selectedScore}   
          onClose={() => setShowEdit(false)}
          onSave={(data) =>
            handleSaveScore({
              ...(data as Score),
              gender: "MALE",
            })
          }
          onDelete={handleDeleteScore}
        />
      )}
    </Layout>
  );
}