import { Link, useLocation } from "react-router-dom";
import {
  Home,
  User,
  BookOpen,
  FileText,
  Clock,
  StickyNote,
  MessageSquare,
} from "lucide-react";

export default function Sidebar() {
  const location = useLocation();

  const sections = [
    {
      title: "GENERAL",
      items: [
        { name: "Home", path: "/dashboard", icon: Home },
        
        { name: "Profile", path: "/profile", icon: User },
      ],
    },
    {
      title: "STUDY TOOLS",
      items: [
        { name: "Chat", path: "/chat", icon: MessageSquare },
        { name: "Planner", path: "/study", icon: BookOpen },
        { name: "Resources", path: "/pdf", icon: FileText },
      ],
    },
    {
      title: "PRODUCTIVITY",
      items: [
        { name: "Timer", path: "/timer", icon: Clock },
        { name: "Notes", path: "/notes", icon: StickyNote },
      ],
    },
  ];

  return (
    <div className="w-64 h-screen fixed left-0 top-0 bg-white/10 backdrop-blur-lg border-r border-white/10 text-white px-5 py-6">

      {/* Logo */}
      <h2 className="text-2xl font-bold mb-8 tracking-wide">
        Mind Mentor AI
      </h2>

      <div className="flex flex-col gap-8">

        {sections.map((section, i) => (
          <div key={i}>

            <p className="text-xs font-semibold text-gray-400 mb-3 tracking-wider">
              {section.title}
            </p>

            <div className="flex flex-col gap-2">

              {section.items.map((item, j) => {
                const Icon = item.icon;
                const active = location.pathname === item.path;

                return (
                  <Link
                    key={j}
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all duration-200 ${
                      active
                        ? "bg-white text-black shadow-lg scale-[1.03]"
                        : "text-gray-300 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Icon size={18} />
                    {item.name}
                  </Link>
                );
              })}

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}