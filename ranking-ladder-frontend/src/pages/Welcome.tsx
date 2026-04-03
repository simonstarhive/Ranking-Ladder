import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Screen from "../components/layout/Screen";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

export default function Welcome() {
  const navigate = useNavigate();

  // Initialize state by reading localStorage immediately
  const [userName] = useState(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        return userData.name || ""; 
      } catch (error) {
        console.error("Error parsing user data", error);
        return "";
      }
    }
    return "";
  });

  const handleSignOut = () => {
    localStorage.removeItem("user");
    navigate("/Login");
  };

  return (
    <Screen>
      <Card>
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Welcome, {userName || "Player"}!
        </h1>

        <Button onClick={() => navigate("/MensRanking")}>
          Men's Ranking
        </Button>

        <Button
          onClick={() => navigate("/WomensRanking")}
          className="mt-3"
        >
          Women's Ranking
        </Button>
        <Button
          onClick={() => navigate("/MensScores")}
          className="mt-3"
        >
          Men's Scores
        </Button>
        <Button
          onClick={() => navigate("/WomensScores")}
          className="mt-3"
        >
          Women's Scores
        </Button>
        <Button
          className="bg-gray-200 text-black hover:bg-gray-300 mt-10"
          onClick={handleSignOut}
        >
          Sign Out
        </Button>
      </Card>
    </Screen>
  );
}