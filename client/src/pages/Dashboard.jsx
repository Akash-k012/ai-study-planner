import { useEffect, useState } from "react";
import axios from "axios";
import Chart from "../components/Charts";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  const [stats, setStats] = useState({
    data: [],
    totalChats: 0,
    mostActiveDay: "N/A",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("https://ai-study-planner-a182.onrender.com/api/stats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setStats(res.data);
      } catch (err) {
        console.log("STATS ERROR:", err?.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="flex min-h-screen bg-black text-white relative overflow-hidden">

      
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 opacity-80"></div>

      <div className="absolute w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-30 top-10 left-10 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-30 bottom-10 right-10 animate-pulse"></div>

      <Sidebar />

      <div className="ml-64 flex-1 p-8 min-h-screen">

        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        {loading ? (
          <p className="text-gray-300">Loading...</p>
        ) : (
          <>
            
            <div className="grid grid-cols-3 gap-6 mb-8">

              <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/10 shadow-lg hover:scale-105 transition">
                <p className="text-gray-300">Total Chats</p>
                <h2 className="text-3xl font-bold mt-2">
                  {stats.totalChats}
                </h2>
              </div>

              <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/10 shadow-lg hover:scale-105 transition">
                <p className="text-gray-300">Most Active Day</p>
                <h2 className="text-3xl font-bold mt-2">
                  {stats.mostActiveDay}
                </h2>
              </div>

              <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/10 shadow-lg hover:scale-105 transition">
                <p className="text-gray-300">Consistency</p>
                <h2 className="text-3xl font-bold mt-2 text-green-400">
                  Good
                </h2>
              </div>

            </div>

            
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/10 shadow-lg">
              <h2 className="mb-4 font-semibold text-gray-200">
                Weekly Activity
              </h2>

              <Chart data={stats.data || []} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}