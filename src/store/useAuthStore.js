import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { useChatStore } from "./useChatStore";

const BASE_URL = import.meta.env.VITE_API_BASE || "http://localhost:5001";
export const useAuthStore = create((set,get) => ({
    authUser: null,

    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    
    onlineUsers:[],
    socket:null,

    checkAuth:async()=>{
        try {
            const res =await axiosInstance.get("/auth/check-auth");
            set({authUser:res.data,isCheckingAuth:false});
            get().connectSocket();
        } 
        catch (error) {
            console.log(error.message);
            set({isCheckingAuth:false});
            
        }},
    signUp:async(formData)=>{
        set({isSigningUp:true});

        try {
            const res = await axiosInstance.post("/auth/signup",formData);
            set({authUser:res.data,isSigningUp:false});
            console.log(res.data);

            console.log("setauth")
            toast.success("Account created successfully");
            console.log("toast")
            get().connectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error.message);
            set({isSigningUp:false});
        }
        
    },
    login:async(formData)=>{
        set({isLoggingIn:true});
        try {
            const res = await axiosInstance.post("/auth/login",formData);
            set({authUser:res.data,isLoggingIn:false});
            toast.success("Login successfull");
            get().connectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
            set({isLoggingIn:false});
            
        }

    },
    logout:async()=>{
        try {
            await axiosInstance.post("/auth/logout");
            set({authUser:null});
            useChatStore.getState().setSelectedUser(null);
            toast.success("Log out successfull");
            get().disconnectSocket();

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
            toast.success("Profile updated successfully");
        } catch (error) {
            toast.error(error.response.data.message);
            set({isUpdatingProfile:false});
            
        }
    },
    addContact:async(email)=>{
        try {
            const res = await axiosInstance.patch("/auth/add-contact",{email});
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },
    connectSocket:()=>{
        const {authUser} = get();
        if(!authUser ||get().socket?.connected) return;
        
        const socket = io(BASE_URL,{
            query:{
                userId:authUser._id
            }
        })
        socket.connect();

        set({socket:socket});

        socket.on("getOnlineUsers",(onlineUsersIds)=>{
            set({onlineUsers:onlineUsersIds});
    })
},
    disconnectSocket:()=>{
        if (get().socket?.connected) {

        get().socket.disconnect();
        }   
    }
    
}));
