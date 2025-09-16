import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/userauthstore";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { ToastContainer } from "react-toastify";
import SocialPage from "./pages/SocialPage";


import Leaderboard from "./pages/Leaderboard";


const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={authUser ? <Homepage /> : <LandingPage />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignupPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/social"
          element={ <SocialPage /> }
        />
       
        
        <Route
          path="/leaderboard"
          element={ <Leaderboard /> }
        />
        
      </Routes>

      <ToastContainer />
    </div>
  );
};
export default App;
