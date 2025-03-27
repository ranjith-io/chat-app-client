import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";


export const useAuthStore = create((set) => ({
    authUser: null,

    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,

    checkAuth:async()=>{
        try {
            const res =await axiosInstance.get("/auth/check-auth");
            set({authUser:res.data,isCheckingAuth:false});

        } catch (error) {
            console.log(error.message);
            set({isCheckingAuth:false});
            
        }},
    signUp:async(formData)=>{
        try {
            set({isSigningUp:true});
            const res = await axiosInstance.post("/auth/signup",formData);
            set({authUser:res.data,isSigningUp:false});
            toast.success("Account created successfully");
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error.message);
            set({isSigningUp:false});
        }
        
    },
    login:async(formData)=>{
        set({isLoggingIn:true});
        try {
            console.log(formData);
            const res = await axiosInstance.post("/auth/login",formData);
            console.log(res.data);
            set({authUser:res.data,isLoggingIn:false});
            toast.success("Login successfull");
            
        } catch (error) {
            toast.error(error.response.data.message);
            set({isLoggingIn:false});
            
        }

    },
    logout:async()=>{
        try {
            await axiosInstance.post("/auth/logout");
            set({authUser:null});
            toast.success("Log out successfull");
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error.message);
        }
    },
    updateProfile:async(formData)=>{
        set({isUpdatingProfile:true});
        try {
            const res=await axiosInstance.put("/auth/update-profile",formData);
            set({authUser:res.data,isUpdatingProfile:false});
            toast.success("Profil updated successfully");
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
            set({isUpdatingProfile:false});
            
        }
    }
}));
