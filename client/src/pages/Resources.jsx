import { useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import ReactMarkdown from "react-markdown";
import { Trash2 } from "lucide-react";

export default function Resources() {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const [links, setLinks] = useState(
    JSON.parse(localStorage.getItem("links")) || [],
  );

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  // 🔥 FIXED FILE HANDLER
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSummary("");

    const reader = new FileReader();

    reader.onload = () => {
      console.log("File loaded");
    };

    reader.onerror = () => {
      alert("Error reading file");
    };

    reader.readAsText(file); // ✅ FIX
  };

  const analyzePDF = async () => {
    const fileInput = document.getElementById("pdfInput");
    const file = fileInput.files[0];

    if (!file) {
      alert("Upload a PDF first");
      return;
    }

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    try {
      const res = await axios.post("https://ai-study-planner-a182.onrender.com/api/pdf", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSummary(res.data);
    } catch (err) {
      console.log(err);
      alert("Error processing PDF");
    }

    setLoading(false);
  };

  const clearPDF = () => {
    setSummary("");
  };

  const addLink = () => {
    if (!title || !url) return;

    const newLinks = [...links, { title, url }];
    setLinks(newLinks);
    localStorage.setItem("links", JSON.stringify(newLinks));

    setTitle("");
    setUrl("");
  };

  const deleteLink = (index) => {
    const newLinks = links.filter((_, i) => i !== index);
    setLinks(newLinks);
    localStorage.setItem("links", JSON.stringify(newLinks));
  };

  return (
    <div className="flex min-h-screen bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 opacity-80"></div>

      <Sidebar />

      <div className="ml-64 flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Resources</h1>

        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/10 mb-8">
          <h2 className="mb-4 font-semibold">📄 AI PDF Analyzer</h2>

          <input type="file" id="pdfInput" onChange={handleFile} />

          <button
            onClick={analyzePDF}
            disabled={loading}
            className="mt-4 bg-white text-black px-5 py-2 rounded-xl font-semibold"
          >
            {loading ? "Processing..." : "Analyze PDF"}
          </button>

          {summary && (
            <div className="mt-4 bg-white/10 p-4 rounded-xl relative">
              <button
                onClick={clearPDF}
                className="absolute top-2 right-2 bg-red-500 px-2 py-1 text-sm rounded"
              >
                Remove
              </button>

              <ReactMarkdown>{summary}</ReactMarkdown>
            </div>
          )}
        </div>

        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/10">
          <h2 className="mb-4 font-semibold">🔗 Resources</h2>

          <div className="flex gap-3 mb-6">
            <input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-2 rounded bg-white/10 border border-white/20"
            />

            <input
              placeholder="URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="p-2 rounded flex-1 bg-white/10 border border-white/20"
            />

            <button onClick={addLink} className="bg-green-600 px-4 rounded">
              Add
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {links.map((l, i) => (
              <div key={i} className="bg-white/10 p-4 rounded-xl relative">
                <button
                  onClick={() => deleteLink(i)}
                  className="absolute top-3 right-3 text-red-400 hover:text-red-500"
                >
                  <Trash2 size={18} />
                </button>

                <h3 className="font-semibold mb-2">{l.title}</h3>

                <a
                  href={l.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-400 break-all"
                >
                  {l.url}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
