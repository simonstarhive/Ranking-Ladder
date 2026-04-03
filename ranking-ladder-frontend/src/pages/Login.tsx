import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Screen from "../components/layout/Screen";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import logo from "../assets/logo.png";
import authService from "../services/authService";


export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    server: ""
  });

  const handleLogin = async () => {
    const newErrors = {
      email: form.email ? "" : "Email is required",
      password: form.password ? "" : "Password is required",
      server: ""
    };

    setErrors(newErrors);

    if (!form.email || !form.password) return; 
    try {
      const data = await  authService.login(form.email.trim(), form.password); 
      if (!data.success) {
        setErrors(prev => ({ ...prev, server: data.error || "Invalid login" })); // if login fails, update the server error message. 
        return;
      }
      localStorage .setItem("user" , JSON.stringify(data));
        if (data.role === "ADMIN") {
        navigate("/AdminWelcome");
      } else {
        navigate("/Welcome");
      }
    } catch   {
      setErrors(prev => ({ ...prev, server: "Server error, please try again." }));
    }
  };

  return (
    <Screen>
      <Card>
        <div className="text-center mb-6">
          <img src={logo} className="w-28 mx-auto mb-3" />
          <h1 className="text-2xl font-bold text-gray-800">
            UCF Club Tennis
          </h1>
        </div>

        <Input
          label="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          error={errors.email}
        />

        <Input
          label="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          error={errors.password}
        />

        {errors.server && (
          <p className="text-red-600 text-sm mt-1 mb-2">
            {errors.server}
          </p>
        )}

        <Button onClick={handleLogin}>Log In</Button>

        <Button
          className="bg-gray-200 text-black hover:bg-gray-300 mt-3"
          onClick={() => navigate("/Signup")}
        >
          Register
        </Button>
      </Card>
    </Screen>
  );
}
