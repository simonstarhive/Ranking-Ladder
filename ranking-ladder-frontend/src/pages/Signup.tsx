import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Screen from "../components/layout/Screen";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button"; 
import authService from "../services/authService";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    ID: "",
    gender: "",
    password: "",
    confirmPassword: "" 
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    ID: "",
    gender: "",
    password: "",
    confirmPassword: "", 
    server: ""
  });

  const validate = () => {
    const newErrors = {
      name: form.name ? "" : "Name is required",
      email: form.email.toLowerCase().endsWith("@ucf.edu") 
        ? "" 
        : "Email must be a valid @ucf.edu address",
      ID: /^\d{7}$/.test(form.ID) 
        ? "" 
        : "UCF ID must be a 7-digit number",
      gender: form.gender ? "" : "Gender is required",
      password: form.password ? "" : "Password is required",
      confirmPassword: form.password === form.confirmPassword 
        ? "" 
        : "Passwords do not match",
      server: ""
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== "");
  };

  const handleSignup = async () => {
    if (!validate()) return;

    try {
      const data = await authService.signup(
        form.name,
        form.email,    
        form.password,          
        form.ID,
        form.gender
      );

      if (!data.success) {
        setErrors(prev => ({
          ...prev, 
          server: data.error || "Signup failed. Try again."
        }));
        return;
      }

      navigate("/ThankYou");
    } catch {
      setErrors(prev => ({ ...prev, server: "Unexpected server error" }));
    }
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, gender: e.target.value });
  };

  return (
    <Screen>
      <Card>
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h1>

        <Input
          label="First and Last Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          error={errors.name}
        />

        <Input
          label="UCF Email"
          placeholder="example@ucf.edu"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          error={errors.email}
        />

        <Input
          label="UCF ID"
          placeholder="1234567"
          value={form.ID}
          onChange={(e) => setForm({ ...form, ID: e.target.value })}
          error={errors.ID}
        />

        <Input
          label="Password"
          value={form.password}
          type="password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          error={errors.password}
        />

        <Input
          label="Confirm Password"
          value={form.confirmPassword}
          type="password"
          onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
          error={errors.confirmPassword}
        />

        <div className="flex flex-col items-center space-y-3 my-6">
          <label className="text-sm font-medium text-gray-700">Gender</label>
          <div className="flex justify-center space-x-6">
            <div className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={form.gender === "Male"}
                onChange={handleGenderChange}
                className="h-4 w-4"
              />
              <label className="ml-2 text-sm text-gray-900">Male</label>
            </div>

            <div className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={form.gender === "Female"}
                onChange={handleGenderChange}
                className="h-4 w-4"
              />
              <label className="ml-2 text-sm text-gray-900">Female</label>
            </div>
          </div>
          {errors.gender && (
            <p className="text-red-600 text-sm">{errors.gender}</p>
          )}
        </div>

        {errors.server && (
          <p className="text-red-600 text-sm mb-3 text-center">
            {errors.server}
          </p>
        )}

        <Button onClick={handleSignup}>Submit</Button>

        <Button
          className="bg-gray-200 text-black hover:bg-gray-300 mt-3"
          onClick={() => navigate("/Login")}
        >
          Back to Login
        </Button>
      </Card>
    </Screen>
  );
}