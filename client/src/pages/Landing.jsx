import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">

      {/* 🔥 Animated Gradient Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 opacity-80"></div>

      {/* Floating blur circles */}
      <div className="absolute w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-30 top-10 left-10 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-30 bottom-10 right-10 animate-pulse"></div>

      {/* 🔥 Navbar */}
      <div className="flex justify-between items-center px-10 py-6 backdrop-blur-md bg-white/10 border-b border-white/10">
        <h1 className="text-2xl font-bold">Mind Mentor</h1>

        <div className="flex gap-4">
          <Link to="/login" className="px-4 py-2 bg-white text-black rounded-lg hover:scale-105 transition">
            Login
          </Link>
          <Link to="/register" className="px-4 py-2 border border-white rounded-lg hover:bg-white hover:text-black transition">
            Sign Up
          </Link>
        </div>
      </div>

      {/* 🔥 Hero */}
      <div className="flex flex-col items-center text-center mt-32 px-6">

        <h1 className="text-6xl font-extrabold leading-tight mb-6">
          Learn Smarter with <br />
          <span className="bg-gradient-to-r from-pink-400 to-yellow-400 bg-clip-text text-transparent">
            AI Power 🚀
          </span>
        </h1>

        <p className="text-lg text-gray-300 max-w-xl mb-8">
          Chat with AI, create study plans, analyze PDFs, and boost your productivity—all in one place.
        </p>

        <div className="flex gap-4">
          <Link
            to="/login"
            className="px-6 py-3 bg-white text-black rounded-xl font-semibold hover:scale-105 transition"
          >
            Get Started
          </Link>

          <Link
            to="/register"
            className="px-6 py-3 border border-white rounded-xl hover:bg-white hover:text-black transition"
          >
            Try Free
          </Link>
        </div>
      </div>

      {/* 🔥 Features */}
      <div className="mt-32 px-10 grid md:grid-cols-3 gap-8">

        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/10 hover:scale-105 transition">
          <h3 className="text-xl font-semibold mb-2">💬 AI Chat</h3>
          <p className="text-gray-300">Ask questions and get instant answers.</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/10 hover:scale-105 transition">
          <h3 className="text-xl font-semibold mb-2">📄 PDF Analyzer</h3>
          <p className="text-gray-300">Upload notes and get AI summaries.</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/10 hover:scale-105 transition">
          <h3 className="text-xl font-semibold mb-2">📅 Planner</h3>
          <p className="text-gray-300">Generate smart study plans.</p>
        </div>

      </div>

     

      
      

    </div>
  );
}