import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import Sidebar from "../components/Sidebar";

export default function Study() {
  const [topic, setTopic] = useState("");
  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔥 Convert AI text into cards
  const parsePlan = (text) => {
    if (!text) return [];

    const parts = text.split(/Day\s*\d+[:\-]/i).filter(Boolean);

    return parts.map((content, index) => ({
      day: `Day ${index + 1}`,
      content: content.trim(),
    }));
  };

  
  const generatePlan = async () => {
    if (!topic) return;

    const token = localStorage.getItem("token");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://ai-study-planner-a182.onrender.com/api/study",
        { topic },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPlan(res.data);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen bg-black text-white relative overflow-hidden">

      
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 opacity-80"></div>

      <div className="absolute w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-30 top-10 left-10 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-30 bottom-10 right-10 animate-pulse"></div>

      <Sidebar />

      <div className="ml-64 flex-1 min-h-screen p-8">

        
        <div className="p-4 border-b border-white/10 backdrop-blur-md bg-white/10 rounded-xl mb-6">
          <h1 className="text-xl font-semibold">AI Study Planner 📚</h1>
        </div>

        
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/10 shadow-lg mb-6">

          <p className="text-gray-300 mb-2">Enter Topic</p>

          <div className="flex gap-3">
            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. DBMS, Operating System"
              className="flex-1 p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-purple-400"
            />

            <button
              onClick={generatePlan}
              className="bg-white text-black px-5 rounded-xl font-semibold hover:scale-105 transition"
            >
              Generate
            </button>
          </div>
        </div>

        
        {loading && (
          <div className="text-gray-300 animate-pulse">
            Generating your study plan...
          </div>
        )}

       
        {!plan && !loading && (
          <div className="text-gray-400 text-center mt-10">
            Enter a topic to generate your study plan 📚
          </div>
        )}

        
        {plan && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {parsePlan(plan).map((d, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-lg p-5 rounded-2xl border border-white/10 shadow-lg hover:scale-105 transition"
              >
                <h3 className="font-semibold text-purple-300 mb-3">
                  {d.day}
                </h3>

                <div className="text-gray-200 text-sm">
                  <ReactMarkdown>{d.content}</ReactMarkdown>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}