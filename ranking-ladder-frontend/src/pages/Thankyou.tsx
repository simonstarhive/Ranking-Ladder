import { useNavigate } from "react-router-dom";
import Screen from "../components/layout/Screen";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import logo from "../assets/logo.png";

export default function ThankYou() {
  const navigate = useNavigate();

  return (
    <Screen>
      <Card>
        <div className="flex flex-col items-center mb-6">
          <img src={logo} className="w-28 mb-3" />
          <h1 className="text-3xl font-bold text-gray-800">Thank You!</h1>
        </div>

        <p className="text-center text-gray-700 mb-6">
          You have been successfully Registered!    
          Please contact the Admin if you have any questions or concerns.
        </p>

        <Button onClick={() => navigate("/Login")}>
          Return to Log In
        </Button>
      </Card>
    </Screen>
  );
}
