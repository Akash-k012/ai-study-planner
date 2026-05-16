import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Study from "./pages/Study";
import TimerPage from "./pages/TimerPage";
import NotesPage from "./pages/NotesPage";
import Profile from "./pages/Profile";
import Resources from "./pages/Resources";
import Landing from "./pages/Landing";


function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
  <Route path="/" element={<Landing />} />
  <Route path="/login" element={<Login setToken={setToken} />} />
  <Route path="/register" element={<Register />} />

  <Route path="/dashboard" element={token ? <Dashboard /> : <Login />} />
  <Route path="/chat" element={token ? <Chat /> : <Login />} />
  <Route path="/study" element={token ? <Study /> : <Login />} />
  <Route path="/timer" element={token ? <TimerPage /> : <Login />} />
  <Route path="/notes" element={token ? <NotesPage /> : <Login />} />
  <Route path="/profile" element={token ? <Profile /> : <Login />} />
  <Route path="/pdf" element={token ? <Resources /> : <Login />} />
</Routes>
    </BrowserRouter>
  );
}

export default App;
