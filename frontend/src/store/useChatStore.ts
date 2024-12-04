import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  text: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

interface User {
  id: string;
  _id: string;
  fullName: string;
  email: string;
  profilePic: string;
}

type ChatState = {
  messages: Message[];
  users: User[];
  selectedUser: User | null;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;
  getUsers: () => void;
  getMessages: (userId: string) => void;
  sendMessage: (messageData: string) => void;
  setSelectedUser: (selectedUser: User) => void;
};

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/message/users");
      set({ users: res.data });
    } catch (error) {
      console.log("Error in getUsers: ", error);
      toast.error("Failed to get users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId: string) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/message/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      console.log("Error in getMessages: ", error);
      toast.error("Failed to get messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData: string) => {
    const { selectedUser, messages } = get();
    if (!selectedUser) {
      return;
    }
    try {
      const res = await axiosInstance.post(
        `/message/send/${selectedUser._id}`,
        messageData
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      console.log("Error in sendMessage: ", error);
      toast.error("Failed to send message");
    }
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
