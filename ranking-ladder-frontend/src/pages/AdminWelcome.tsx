import { useNavigate } from "react-router-dom";
import Screen from "../components/layout/Screen";
import Card from "../components/ui/Card";
import AdminButton from "../components/ui/AdminButton";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <Screen>
      <Card>
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Welcome, Admin!
        </h1>

        <AdminButton onClick={() => navigate("/AdminMensRanking")}>
          Men's Ranking
        </AdminButton>

        <AdminButton
          onClick={() => navigate("/AdminWomensRanking")}
          className="mt-3"
        >
          Women's Ranking
        </AdminButton>

        <AdminButton
          onClick={() => navigate("/AdminMensScores")}
          className="mt-3"
        >
          Men's Scores
        </AdminButton>


        <AdminButton
          onClick={() => navigate("/AdminWomensScores")}
          className="mt-3"
        >
          Women's Scores
        </AdminButton>

        <AdminButton
          onClick={() => navigate("/AdminAddUser")}
          className="mt-3"
        >
          Add User
        </AdminButton>

        <AdminButton
          className="bg-blue-500 text-black hover:bg-blue-600 mt-10"
          onClick={() => navigate("/Login")}
        >
          Sign Out
        </AdminButton>
      </Card>
    </Screen>
  );
}
