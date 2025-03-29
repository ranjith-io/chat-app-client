import { create } from "zustand";
import toast from "react-hot-toast";
import {axiosInstance} from "../lib/axios";


export const useChatStore = create((set,get) => ({
    messages:[],
    users:[],
    selectedUser:null,
    isUserLoading:false,
    isMessagesLoading:false,

    //todo
    setSelectedUser:(selectedUser) => set({selectedUser}),

    getUsers:async () => {
        set({isUserLoading:true});
        try {
            const res=await axiosInstance.get('/messages/users');
            set({users:res.data,isUserLoading:false});
        }


         catch (error) {
            toast.error(error.response.data.message);  
            set({isUserLoading:false}); 
        }
    },

    getMessages:async (receiverId) => {
        set({isMessagesLoading:true});
        try {
            const res=await axiosInstance.get(`/messages/${receiverId}`);
            set({messages:res.data,isMessagesLoading:false});
        } catch (error) {
            toast.error(error.response.data.message);  
            set({isMessagesLoading:false}); 
        }
    },
    sendMessage:async (messageData) => {
        const {selectedUser,messages}=get();
        try {
            const res=await axiosInstance.post(`/messages/send/${selectedUser._id}`,messageData);
            console.log("here");
            set({messages:[...messages,res.data]});
        } catch (error) {
            console.log(error.response.data.message);
            console.log("error in sendMessage");
            toast.error(error.response.data.message);

        }


    

}}));