import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      await axios.post(
        "https://ai-study-planner-a182.onrender.com/api/auth/register",
        { name, email, password }
      );

      alert("Registered successfully");
      window.location.href = "/login";
    } catch (err) {
  console.log(err.response.data);
  alert(err.response.data);
}
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden">

      
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 opacity-80"></div>

      
      <div className="absolute w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-30 top-10 left-10 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-30 bottom-10 right-10 animate-pulse"></div>

      
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/10 shadow-xl w-full max-w-md">

        <h2 className="text-2xl font-bold text-center mb-6">
          Create Account 🚀
        </h2>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-purple-400"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-purple-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-purple-400"
          />

          <button
            onClick={register}
            className="w-full bg-white text-black p-3 rounded-xl font-semibold hover:scale-105 transition"
          >
            Sign Up
          </button>

        </div>

        <p className="text-center text-gray-300 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-white underline">
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}