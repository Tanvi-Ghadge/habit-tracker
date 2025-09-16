import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";

const HamburgerMenu = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="fixed left-5 z-50" ref={menuRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="p-2 rounded-lg bg-white/80 shadow-md hover:shadow-lg transition"
      >
        <Menu className="text-emerald-700" size={24} />
      </button>

      {open && (
        <div className="mt-3 backdrop-blur-md bg-white/90 border border-emerald-100 rounded-xl shadow-2xl p-5 w-64 space-y-4 animate-fadeIn">
          <h3 className="text-emerald-800 font-semibold text-lg mb-2">
            🌱 Explore Habit Tracker
          </h3>

          <div className="space-y-2 text-sm">
            
            <Link
              to="/"
              className="flex items-center gap-2 hover:bg-emerald-50 p-2 rounded-md transition text-emerald-700"
            >
              📋 My Habits
            </Link>
            <Link
              to="/social"
              className="flex items-center gap-2 hover:bg-emerald-50 p-2 rounded-md transition text-emerald-700"
            >
              🌐 Social
            </Link>
            
            <Link
                to="/leaderboard"
                className="flex items-center gap-2 hover:bg-emerald-50 p-2 rounded-md transition text-emerald-700"
>
            🥇 Leaderboard
            </Link>
            
            

          </div>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
