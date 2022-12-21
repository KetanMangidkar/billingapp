import { Routes, Route } from "react-router-dom";
import { Navbar } from "./Components/Navbar";
import { Signup } from "./Components/Signup";
import { Login } from "./Components/Login";
import Home from "./Components/Home";
import Dashboard from "./Components/AdminDashboard";
import UserDashboard from "./Components/UserDashboard";
import Billingpage from "./Components/Billingpage";
import "./App.css";

function App() {
  let userData = JSON.parse(localStorage.getItem("login")) || [];
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/admindashboard" element={<Dashboard />}></Route>
        <Route path="/dashboard" element={<UserDashboard />}></Route>
        <Route path="/billing" element={<Billingpage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
