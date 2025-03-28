import { Navigate, Route, Routes, } from "react-router-dom";


import NavBar from "./components/NavBar";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";

import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";

import { Toaster } from "react-hot-toast";
import { Loader } from "lucide-react";
import { useThemeStore } from "./store/useThemeStore";

const app = ()=>{
  
  const {authUser,checkAuth,isCheckingAuth}=useAuthStore();
  const {theme}=useThemeStore();
  useEffect(()=>{
    checkAuth();
  }
  ,[checkAuth]); //if checkauth changes then useEffect will run

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  
  
  return (
    <div data-theme={theme} className="flex flex-col h-screen">
      <NavBar />
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login"/>} />
        <Route path="/signup" element={!authUser ? <SignUpPage />:<Navigate to="/"/>}/>
        <Route path="/login" element={!authUser ? <LoginPage />:<Navigate to="/"/>} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage />:<Navigate to="/login"/>} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default app;