import { Link } from "react-router-dom";
import { useAuthStore } from "../store/userauthstore";
import { LogOut } from "lucide-react";
import Logo from "../assets/Logo.png";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <nav className="mx-auto px-6 w-screen py-6 fixed top-0 z-40 bg-white shadow-md">
      <div className="flex items-center justify-between">
        <Link to={"/"}>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center shadow">
              <img
                src={Logo}
                alt="HabitNest Logo"
                className="w-8 h-8 object-contain"
              />
            </div>
            <span className="text-2xl font-bold text-emerald-700">HabitNest</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          {!authUser && (
            <Link to={"/login"}>
              <button className="bg-white text-emerald-600 border border-emerald-300 hover:bg-emerald-50 px-6 py-2 rounded-full font-medium transition-all shadow-sm">
                Login
              </button>
            </Link>
          )}

          {authUser && (
            <button
              className="bg-white text-emerald-600 border border-emerald-300 hover:bg-emerald-50 px-6 py-2 rounded-full font-medium transition-all shadow-sm flex items-center gap-2"
              onClick={logout}
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
