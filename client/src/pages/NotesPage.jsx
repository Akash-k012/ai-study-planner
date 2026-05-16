import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Trash2, Pencil, X } from "lucide-react";

export default function NotesPage() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [notes, setNotes] = useState([]);
  const [editId, setEditId] = useState(null);


  useEffect(() => {
    const saved = localStorage.getItem("notes");
    if (saved) {
      setNotes(JSON.parse(saved));
    }
  }, []);

  
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  
  const handleSave = () => {
    if (!title || !text) return;

    if (editId) {
      const updated = notes.map((n) =>
        n.id === editId ? { ...n, title, text } : n
      );
      setNotes(updated);
      setEditId(null);
    } else {
      const newNote = {
        id: Date.now(),
        title,
        text,
      };
      setNotes([newNote, ...notes]);
    }

    setTitle("");
    setText("");
  };

  
  const cancelEdit = () => {
    setEditId(null);
    setTitle("");
    setText("");
  };

  
  const deleteNote = (id) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  
  const editNote = (note) => {
    setTitle(note.title);
    setText(note.text);
    setEditId(note.id);
  };

  return (
    <div className="flex min-h-screen bg-black text-white relative overflow-hidden">

      
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 opacity-80"></div>

      <Sidebar />

      <div className="ml-64 flex-1 p-8">

        
        <h1 className="text-3xl font-bold mb-6">Notes 📝</h1>

        
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/10 shadow-lg mb-8">

          <h2 className="font-semibold mb-4">
            {editId ? "Update Note" : "Add New Note"}
          </h2>

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title..."
            className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-purple-400 mb-3"
          />

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write your note..."
            rows={4}
            className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-purple-400 mb-3"
          />

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="bg-white text-black px-5 py-2 rounded-xl font-semibold hover:scale-105 transition"
            >
              {editId ? "Update" : "Add"}
            </button>

            {editId && (
              <button
                onClick={cancelEdit}
                className="px-4 py-2 rounded-xl bg-red-500 text-white flex items-center gap-1"
              >
                <X size={16} /> Cancel
              </button>
            )}
          </div>

        </div>

       
        {notes.length === 0 && (
          <p className="text-gray-400 text-center">
            No notes yet. Start writing ✨
          </p>
        )}

        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {notes.map((note) => (
            <div
              key={note.id}
              className="relative bg-white/10 backdrop-blur-lg p-5 rounded-2xl border border-white/10 shadow-lg hover:scale-105 transition"
            >
              
              <div className="absolute top-3 right-3 flex gap-2">

                <button
                  onClick={() => editNote(note)}
                  className="p-1 rounded hover:bg-white/20"
                >
                  <Pencil size={16} />
                </button>

                <button
                  onClick={() => deleteNote(note.id)}
                  className="p-1 rounded hover:bg-red-500/30 text-red-400"
                >
                  <Trash2 size={16} />
                </button>

              </div>


              <h3 className="font-bold text-lg mb-2 pr-10">
                {note.title}
              </h3>

              <p className="text-gray-300 text-sm whitespace-pre-line">
                {note.text}
              </p>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}