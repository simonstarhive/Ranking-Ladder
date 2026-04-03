import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PageTitle from "../components/ui/PageTitle";
import Layout from "../components/ui/Layout";
import API_BASE_URL from "../services/api";


type Score = {
  id: number;
  playerA: string;
  playerB: string;
  score: string;
  gender: string;
};


export default function Scores() {
  const navigate = useNavigate();

  const [scores, setScores] = useState<Score[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadScores = async () => {
      try {
        // use local backend
        const res = await fetch(
          `${API_BASE_URL}/scores?gender=MALE`);
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

  return (
    <Layout>
      {/* HEADER */}
      <div className="mb-4 flex items-center gap-3">
        <button
          onClick={() => navigate("/Welcome")}
          className="shrink-0 px-3 py-1 text-xs
            sm:px-4 sm:py-2 sm:text-sm
            md:px-5 md:py-2 md:text-base
            rounded-lg bg-yellow-400 hover:bg-yellow-500
            text-white font-semibold"
        >
          ←
        </button>

        <div className="flex-1 text-center">
          <PageTitle title="Scores" />
        </div>
        
        {/* Spacer to keep title centered now that Report button is gone */}
        <div className="w-[42px] sm:w-[68px] md:w-[85px]"></div>
      </div>

      {/*  SCORES LIST */}
      <div className="bg-white rounded-2xl shadow-lg p-5 space-y-3">
        {loading ? (
          <p className="text-center text-gray-500">
            Loading scores...
          </p>
        ) : scores.length === 0 ? (
          <p className="text-center text-gray-500">
            No scores yet
          </p>
        ) : (
          scores.map((match) => (
            <div
              key={match.id}
              className="border-b last:border-0 pb-3 rounded-lg px-2"
            >
              <p className="text-gray-800">
                <span className="font-semibold">
                  {match.playerA}
                </span>{" "}
                defeated{" "}
                <span className="font-semibold">
                  {match.playerB}
                </span>{" "}
                <span className="text-gray-600">
                  ({match.score})
                </span>
              </p>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
}