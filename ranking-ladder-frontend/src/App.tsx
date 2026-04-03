import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Welcome from "./pages/Welcome";
import Thankyou from "./pages/Thankyou";
import MensScores from "./pages/MensScores";
import MensRanking from "./pages/MensRanking";
import AdminWelcome from "./pages/AdminWelcome";
import WomensScores from "./pages/WomensScores";
import AdminAddUser from "./pages/AdminAddUser";
import WomensRanking from "./pages/WomensRanking";
import AdminMensScores from "./pages/AdminMensScores";
import AdminMensRanking from "./pages/AdminMensRanking";
import AdminWomensScores from "./pages/AdminWomensScores";
import AdminWomensRanking from "./pages/AdminWomensRanking";


export default function App() {
  return (
    <BrowserRouter basename="/rankingladder">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/thankyou" element={<Thankyou />} />
        <Route path="/MensScores" element={<MensScores />} />
        <Route path="/MensRanking" element={<MensRanking />} />
        <Route path="/AdminAddUser" element={<AdminAddUser />} /> 
        <Route path="/AdminWelcome" element={<AdminWelcome />} />
        <Route path="/WomensScores" element={<WomensScores />} />
        <Route path="/WomensRanking" element={<WomensRanking />} />
        <Route path="/AdminMensScores" element={<AdminMensScores />} />
        <Route path="/AdminMensRanking" element={<AdminMensRanking />} />
        <Route path="/AdminWomensScores" element={<AdminWomensScores />} />
        <Route path="/AdminWomensRanking" element={<AdminWomensRanking />} />
      </Routes>
    </BrowserRouter>
  );
}
