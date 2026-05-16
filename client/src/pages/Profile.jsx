import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { Pencil, LogOut, Save, X } from "lucide-react";

export default function Profile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem("userId");

        const res = await axios.get(
          `http://localhost:5000/api/auth/user/${userId}`
        );

        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, []);

  const handleSave = async () => {
    try {
      const userId = localStorage.getItem("userId");

      const res = await axios.put(
        "http://localhost:5000/api/auth/update",
        {
          userId,
          name: user.name,
          email: user.email,
        }
      );

      localStorage.setItem("user", JSON.stringify(res.data));

      setUser(res.data);
      setEditing(false);
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="flex min-h-screen bg-black text-white relative overflow-hidden">

      
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 opacity-80"></div>

      <Sidebar />

      <div className="ml-64 flex-1 flex items-center justify-center p-8">

        {/* Card */}
        <div className="bg-white/10 backdrop-blur-lg w-full max-w-md p-8 rounded-2xl border border-white/10 shadow-xl text-center">

          
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white text-black flex items-center justify-center text-2xl font-bold">
            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>

          
          <h2 className="text-2xl font-bold mb-1">
            {user.name || "Your Name"}
          </h2>

          <p className="text-gray-300 mb-6">
            {user.email || "your@email.com"}
          </p>

          
          {editing && (
            <div className="space-y-3 mb-4">

              <input
                value={user.name}
                onChange={(e) =>
                  setUser({ ...user, name: e.target.value })
                }
                placeholder="Name"
                className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-purple-400"
              />

              <input
                value={user.email}
                onChange={(e) =>
                  setUser({ ...user, email: e.target.value })
                }
                placeholder="Email"
                className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-purple-400"
              />

            </div>
          )}

          
          <div className="flex justify-center gap-3">

            {editing ? (
              <>
                <button
                  onClick={handleSave}
                  className="bg-white text-black px-4 py-2 rounded-xl flex items-center gap-1 hover:scale-105 transition"
                >
                  <Save size={16} /> Save
                </button>

                <button
                  onClick={() => setEditing(false)}
                  className="bg-red-500 px-4 py-2 rounded-xl flex items-center gap-1"
                >
                  <X size={16} /> Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="bg-white text-black px-4 py-2 rounded-xl flex items-center gap-1 hover:scale-105 transition"
              >
                <Pencil size={16} /> Edit
              </button>
            )}

            <button
              onClick={logout}
              className="bg-red-500 px-4 py-2 rounded-xl flex items-center gap-1"
            >
              <LogOut size={16} /> Logout
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}