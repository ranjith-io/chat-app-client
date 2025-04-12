import { Navigate, Route, Routes, } from "react-router-dom";


import NavBar from "./components/NavBar";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import AddContactPage from "./pages/AddContactPage";

import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";

import { Toaster } from "react-hot-toast";
import { Loader } from "lucide-react";

const app = ()=>{
  
  const {authUser,checkAuth,isCheckingAuth}=useAuthStore();
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);
  
  useEffect(()=>{
    checkAuth();
  }
  ,[checkAuth]); 

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  
  
  return (
    <div  className="flex flex-col h-screen">
      <NavBar />
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login"/>} />
        <Route path="/signup" element={!authUser ? <SignUpPage />:<Navigate to="/"/>}/>
        <Route path="/login" element={!authUser ? <LoginPage />:<Navigate to="/"/>} />
        <Route path="/profile" element={authUser ? <ProfilePage />:<Navigate to="/login"/>} />
        <Route path="/add-contact" element={authUser ? <AddContactPage />:<Navigate to="/login"/>} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default app;