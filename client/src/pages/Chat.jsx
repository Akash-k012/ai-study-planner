import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { Copy } from "lucide-react";
import Sidebar from "../components/Sidebar";

export default function Chat() {
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef();

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:5000/api/chat", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const history = res.data.map((c) => ({
          user: c.message,
          bot: c.response,
        }));
        setChat(history.reverse());
      });
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const sendMessage = async () => {
    if (!msg) return;

    const token = localStorage.getItem("token");
    setLoading(true);

    const res = await axios.post(
      "http://localhost:5000/api/chat",
      { message: msg },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setChat((prev) => [...prev, { user: msg, bot: res.data }]);
    setMsg("");
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen bg-black text-white relative overflow-hidden">

      
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 opacity-80"></div>

      {/* Floating Blobs */}
      <div className="absolute w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-30 top-10 left-10 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-30 bottom-10 right-10 animate-pulse"></div>

      <Sidebar />

      <div className="ml-64 flex-1 h-screen flex flex-col">

        
        <div className="p-4 border-b border-white/10 backdrop-blur-md bg-white/10 font-semibold">
          AI Study Assistant
        </div>

        
        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {chat.map((c, i) => (
            <div key={i} className="space-y-2">

              {/* User Message */}
              <div className="flex justify-end">
                <div className="bg-white text-black px-4 py-2 rounded-2xl max-w-[70%] shadow">
                  {c.user}
                </div>
              </div>

              
              <div className="flex justify-start">
                <div className="bg-white/10 backdrop-blur-lg px-4 py-3 rounded-2xl border border-white/10 max-w-[70%] relative group">

                  <ReactMarkdown>{c.bot}</ReactMarkdown>

                  
                  <button
                    onClick={() => navigator.clipboard.writeText(c.bot)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition"
                  >
                    <Copy size={16} className="text-gray-300 hover:text-white" />
                  </button>

                </div>
              </div>

            </div>
          ))}

          {loading && (
            <div className="text-gray-300 italic">AI is typing...</div>
          )}

          <div ref={bottomRef}></div>
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/10 backdrop-blur-md bg-white/10 flex gap-3">

          <input
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Ask something..."
            className="flex-1 p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-purple-400"
          />

          <button
            onClick={sendMessage}
            className="bg-white text-black px-5 rounded-xl font-semibold hover:scale-105 transition"
          >
            Send
          </button>

        </div>

      </div>
    </div>
  );
}