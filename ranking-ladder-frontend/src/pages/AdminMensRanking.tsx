import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "../components/ui/PageTitle";
import Layout from "../components/ui/Layout";
import AdminButton from "../components/ui/AdminButton";
import AddPlayerPop from "../components/layout/AddPlayerPop";
import EditPlayerPop from "../components/layout/EditPlayerPop";
import userService from "../services/userService";
import API_BASE_URL from "../services/api";



type Player = {
  id: number;
  rank: number;
  firstName: string;
  lastName: string;
};

type RankingResponse = {
  userId: number;
  name: string;
  rank: number;
  category: string;
};

type UserFromAPI = {
  id: number;
  ucfid: number;
  name: string;
  email: string;
  gender: string;
};

type PopupPlayer = {
  id: number;
  name: string;
};


export default function MensRanking() {
  const navigate = useNavigate();

  const [players, setPlayers] = useState<Player[]>([]);
  const [allPlayers, setAllPlayers] = useState<PopupPlayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddPop, setShowAddPop] = useState(false);
  const [showEditPop, setShowEditPop] = useState(false);

  const sortPlayers = (players: Player[]) =>
    [...players].sort((a, b) => a.rank - b.rank);

  
  useEffect(() => {
    const loadData = async () => {
      try {
        // GET rankings
        const res = await fetch(`${API_BASE_URL}/rankings`);
        const json = await res.json();

        const rankings: RankingResponse[] = json.content || [];

        const menRankings = rankings.filter((r) => r.category === "MEN");

        const formatted: Player[] = menRankings.map((r) => {
          const [firstName, lastName] = r.name.split(" ");
          return {
            id: r.userId,
            rank: r.rank,
            firstName,
            lastName: lastName || "",
          };
        });

        setPlayers(sortPlayers(formatted));

        // GET users
        const users: UserFromAPI[] = await userService.getAllUsers();

        const menUsers = users.filter((u) => u.gender === "MALE");

        const formattedUsers: PopupPlayer[] = menUsers.map((u) => ({
          id: u.id,
          name: u.name,
        }));

        setAllPlayers(formattedUsers);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleAddPlayer = async (player: PopupPlayer, desiredRank?: number) => {
    try {
      const rank = desiredRank || players.length + 1;

      const response = await fetch(`${API_BASE_URL}/rankings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: player.id,
          rank,
          category: "MEN",
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        console.error("Backend error:", err);
        return;
      }

      const [firstName, lastName] = player.name.split(" ");

      const newPlayer: Player = {
        id: player.id,
        rank,
        firstName,
        lastName: lastName || "",
      };

      // rank system 
      const updatedPlayers = players.map((p) =>
        p.rank >= rank ? { ...p, rank: p.rank + 1 } : p
      );

      setPlayers(sortPlayers([...updatedPlayers, newPlayer]));
    } catch (error) {
      console.error("Error adding player:", error);
    }
  };

  
  const handleSavePlayer = (updatedPlayer: Player) => {
    const oldPlayer = players.find((p) => p.id === updatedPlayer.id);
    if (!oldPlayer) return;

    let updatedList = players.filter((p) => p.id !== updatedPlayer.id); 

    if (updatedPlayer.rank < oldPlayer.rank) {
      updatedList = updatedList.map((p) =>
        p.rank >= updatedPlayer.rank && p.rank < oldPlayer.rank
          ? { ...p, rank: p.rank + 1 }
          : p
      );
    } else if (updatedPlayer.rank > oldPlayer.rank) {
      updatedList = updatedList.map((p) =>
        p.rank <= updatedPlayer.rank && p.rank > oldPlayer.rank
          ? { ...p, rank: p.rank - 1 }
          : p
      );
    }

    updatedList.push(updatedPlayer);
    setPlayers(sortPlayers(updatedList));
    setShowEditPop(false);
  };

  
  const handleDeletePlayer = (playerId: number) => {
    const deletedPlayer = players.find((p) => p.id === playerId);
    if (!deletedPlayer) return;

    const updatedList = players
      .filter((p) => p.id !== playerId)
      .map((p) =>
        p.rank > deletedPlayer.rank ? { ...p, rank: p.rank - 1 } : p
      );

    setPlayers(sortPlayers(updatedList));
    setShowEditPop(false);
  };

  
  return (
    <Layout>
      <div className="relative mb-4 flex items-center justify-center">
        <button
          onClick={() => navigate("/AdminWelcome")}
          className="shrink-0 px-3 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm md:px-5 md:py-2 md:text-base rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold"
        >
          ←
        </button>

        <div className="flex-1 text-center">
          <PageTitle title="Men's Ranking" />
        </div>

        <div className="flex shrink-0 gap-2">
          <AdminButton onClick={() => setShowAddPop(true)}>Add</AdminButton>
          <AdminButton onClick={() => setShowEditPop(true)}>Edit</AdminButton>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-5">
        {loading ? (
          <p className="text-center py-6 font-semibold text-gray-500">
            Loading ranking...
          </p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-500 text-white text-left">
                <th className="p-3 rounded-l-xl">Rank</th>
                <th className="p-3">Player</th>
              </tr>
            </thead>
            <tbody>
              {players.length === 0 ? (
                <tr>
                  <td
                    colSpan={2}
                    className="text-center py-6 text-gray-500 font-medium"
                  >
                    No players added yet
                  </td>
                </tr>
              ) : (
                players.map((player) => (
                  <tr
                    key={player.id}
                    className="border-b hover:bg-gray-100 transition"
                  >
                    <td className="p-3 font-semibold">{player.rank}</td>
                    <td className="p-3">
                      {player.firstName} {player.lastName}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {showAddPop && (
        <AddPlayerPop
          players={allPlayers}
          onClose={() => setShowAddPop(false)}
          onSelect={handleAddPlayer}
        />
      )}

      {showEditPop && (
        <EditPlayerPop
          players={players}
          onClose={() => setShowEditPop(false)}
          onSave={handleSavePlayer}
          onDelete={handleDeletePlayer}
        />
      )}
    </Layout>
  );
}