import { useEffect } from "react";
import Navbar from "./components/Navbar.tsx";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import SignUpPage from "./pages/SignUpPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import Settingage from "./pages/Settingage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import { useAuthStore } from "./store/useAuthStore.ts";
import { Loader } from "lucide-react";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log("authUser: ", authUser);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route path="/settings" element={<Settingage />} />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
};

export default App;
