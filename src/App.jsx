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

const app = ()=>{

  const {authUser,checkAuth}=useAuthStore();

  // useEffect(()=>{
  //   checkAuth();
  // }
  // ,[checkAuth]);
  // console.log(authUser);


  
  return (
    <div>
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