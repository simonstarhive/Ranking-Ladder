import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "../components/ui/PageTitle";
import Layout from "../components/ui/Layout";
import API_BASE_URL from "../services/api";

/* ================= TYPES ================= */
type Player = {
  rank: number;
  name: string;
};

type RankingResponse = {
  userId: number;
  name: string;
  rank: number;
  category: string;
};

/* ============== COMPONENT ============== */
export default function MensRanking() {
  const navigate = useNavigate();

  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  /* ========== LOAD FROM BACKEND ========== */
  useEffect(() => {
    const loadPlayers = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/rankings`);
        const json = await res.json();

        const rankings: RankingResponse[] = json.content || [];

        
        const menRankings = rankings.filter(
          (r) => r.category === "MEN"
        );

        const sorted = menRankings.sort((a, b) => a.rank - b.rank);

        const formatted: Player[] = sorted.map((r) => ({
          rank: r.rank,
          name: r.name,
        }));

        setPlayers(formatted);
      } catch (err) {
        console.error("Error loading rankings:", err);
      } finally {
        setLoading(false);
      }
    };

    loadPlayers();
  }, []);

  return (
    <Layout>
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
          <PageTitle title="Men's Ranking" />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-5">
        {loading ? (
          <p className="text-center py-6 font-semibold text-gray-500">
            Loading ranking...
          </p>
        ) : players.length === 0 ? (
          <p className="text-center py-6 text-gray-500">
            No rankings available
          </p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-yellow-400 text-white text-left">
                <th className="p-3 rounded-l-xl">Rank</th>
                <th className="p-3">Player</th>
              </tr>
            </thead>

            <tbody>
              {players.map((player) => (
                <tr
                  key={player.rank}
                  className="border-b hover:bg-gray-100 transition"
                >
                  <td className="p-3 font-semibold">
                    {player.rank}
                  </td>
                  <td className="p-3">
                    {player.name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
}