import axio from "axios";

export const axiosInstance = axio.create({
  baseURL: "http://localhost:5001/api",
  withCredentials: true,
});
